
export enum ChatMode {
  QNA = 'QNA',
  DOC_ANALYSIS = 'DOC_ANALYSIS',
  FAMILY_LAW = 'FAMILY_LAW',
  CRIMINAL_LAW = 'CRIMINAL_LAW',
  PROPERTY_LAW = 'PROPERTY_LAW',
  BUSINESS_LAW = 'BUSINESS_LAW',
}

export interface Source {
  uri: string;
  title: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  fileInfo?: {
    name: string;
    type: string;
  };
  sources?: Source[];
}

export interface UploadedFile {
    name: string;
    type: string;
    base64: string;
}

export interface AiResponseChunk {
    text?: string;
    sources?: Source[];
}
