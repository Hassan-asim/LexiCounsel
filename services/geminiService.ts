
import { GoogleGenAI, GenerateContentParameters, Content, Part } from "@google/genai";
import { Message, ChatMode, UploadedFile, AiResponseChunk, Source } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function getSystemInstruction(mode: ChatMode): string {
  const baseInstruction = "You are LexiCounsel, an AI legal advocate. Unless the user specifies a different country, all your answers and analysis must be based on the laws of Pakistan. You must provide clear, structured, and helpful information. Always include a disclaimer that you are an AI and not a substitute for a human lawyer, and your insights are for informational purposes only.";

  switch (mode) {
    case ChatMode.DOC_ANALYSIS:
      return `${baseInstruction} You are a specialist in document analysis. Your sole focus is the provided legal document. Meticulously analyze it, explain clauses in plain English, identify potential risks, ambiguities, or unfair terms. Present your analysis in a clear, structured format using markdown. Start by acknowledging the document provided. If the user asks a general legal question unrelated to the document's content, politely state that your purpose is to analyze the uploaded file and suggest they use the 'Legal Q&A' mode for general questions.`;
    case ChatMode.FAMILY_LAW:
        return `${baseInstruction} You are a specialist in **Family Law only**. Your role is to address topics like divorce, Khula, child custody, guardianship, and domestic violence under Pakistani law. **If the user asks a question outside of Family Law (e.g., about criminal matters, property disputes, or business contracts), you MUST politely decline to answer.** Instead, state that the question is outside your expertise and suggest they switch to the relevant specialty like 'Criminal Law', 'Property Law', or 'Business Law'.`;
    case ChatMode.CRIMINAL_LAW:
        return `${baseInstruction} You are a specialist in **Criminal Law only**. Your role is to explain concepts like FIRs, bail, rights of the accused, and offenses under the Pakistan Penal Code. **If the user asks a question outside of Criminal Law (e.g., about family issues, property transfers, or company registration), you MUST politely decline to answer.** Instead, state that the question is outside your expertise and suggest they switch to the relevant specialty like 'Family Law', 'Property Law', or 'Business Law'.`;
    case ChatMode.PROPERTY_LAW:
        return `${baseInstruction} You are a specialist in **Property Law only**. Your role is to assist with queries about property transactions, inheritance, landlord-tenant disputes, and property registration in Pakistan. **If the user asks a question outside of Property Law (e.g., about criminal charges, divorce, or business contracts), you MUST politely decline to answer.** Instead, state that the question is outside your expertise and suggest they switch to the relevant specialty like 'Criminal Law', 'Family Law', or 'Business Law'.`;
    case ChatMode.BUSINESS_LAW:
        return `${baseInstruction} You are a specialist in **Business & Corporate Law only**. Your role is to provide information on company registration, contract law, intellectual property, and other legal aspects of running a business in Pakistan. **If the user asks a question outside of Business Law (e.g., about family disputes, criminal law, or personal property issues), you MUST politely decline to answer.** Instead, state that the question is outside your expertise and suggest they switch to the relevant specialty like 'Family Law', 'Criminal Law', or 'Property Law'.`;
    case ChatMode.QNA:
    default:
      return "You are LexiCounsel, an AI legal advocate. Answer legal questions using the information found through Google Search. Provide clear, factual, and concise answers based on the search results. Unless the user specifies a different country, all your answers must be based on the laws of Pakistan. ALWAYS cite your sources by providing the URLs. Include a disclaimer that you are an AI and not a substitute for a human lawyer.";
  }
}

function buildRequest(prompt: string, history: Message[], mode: ChatMode, file: UploadedFile | null): GenerateContentParameters {
    const systemInstruction = getSystemInstruction(mode);

    const contents: Content[] = history
        .filter(msg => msg.id !== 'welcome-message')
        .map(msg => {
            const parts: Part[] = [{ text: msg.text }];
            // This logic is simplified; we'll add the file to the last message below
            return {
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: parts
            };
        });

    // Find the last user message in the contents array to add file data
    const lastUserContentIndex = contents.map(c => c.role).lastIndexOf('user');
    
    if (lastUserContentIndex !== -1 && file && mode === ChatMode.DOC_ANALYSIS) {
        const lastUserContent = contents[lastUserContentIndex];
        
        if (file.type.startsWith('image/') || file.type === 'application/pdf' || file.type.startsWith('text/')) {
            lastUserContent.parts.push({
                inlineData: {
                    mimeType: file.type,
                    data: file.base64,
                }
            });
            // If user sent file without text, modify the text part to add a default prompt.
            const textPart = lastUserContent.parts.find(p => 'text' in p) as Part & { text: string } | undefined;
            if (textPart && !textPart.text.trim()) {
                textPart.text = `Please analyze the attached document: ${file.name}`;
            }
        } else {
            console.warn(`Unsupported file type for inlineData: ${file.type}. Appending note to text.`);
            const textPart = lastUserContent.parts.find(p => 'text' in p) as Part & { text: string } | undefined;
            if (textPart) {
                textPart.text += `\n\n[System note: A file named "${file.name}" was uploaded, but its content type (${file.type}) cannot be processed directly. Please analyze based on the user's query about it.]`;
            }
        }
    }

    const request: GenerateContentParameters = {
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
            systemInstruction,
        }
    };
    
    if (mode === ChatMode.QNA) {
        request.config.tools = [{googleSearch: {}}];
    }
    
    return request;
}


export async function* getAiResponseStream(
  prompt: string,
  history: Message[],
  mode: ChatMode,
  file: UploadedFile | null
): AsyncGenerator<AiResponseChunk> {

  const request = buildRequest(prompt, history, mode, file);

  if (mode === ChatMode.QNA) {
    // Use non-streaming for QNA to reliably get all sources from grounding
    const response = await ai.models.generateContent(request);
    
    const text = response.text;
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    
    let sources: Source[] = [];
    if (groundingMetadata?.groundingChunks) {
        sources = groundingMetadata.groundingChunks
            .map(chunk => chunk.web)
            .filter((web): web is { uri: string; title: string; } => !!web?.uri && !!web.title);
    }

    yield { text, sources };

  } else {
    // Use streaming for other modes like Document Analysis
    const stream = await ai.models.generateContentStream(request);
    for await (const chunk of stream) {
      yield { text: chunk.text };
    }
  }
}
