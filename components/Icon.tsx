
import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className = 'h-6 w-6' }) => {
  const icons: { [key: string]: React.ReactNode } = {
    menu: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    ),
    close: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    send: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
      </svg>
    ),
    upload: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    document: (
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    chat: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
     search: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    user: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
     family: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
         <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.226c.668.169 1.37.246 2.09.246m5.208-1.543a.516.516 0 01.093.003c.091.006.18.013.268.021l-1.584-1.584M12.721 18.082a9.043 9.043 0 01-1.423-.426C10.213 17.204 9 16.096 9 14.5s1.213-2.704 2.298-3.156a9.043 9.043 0 011.423-.426m3.557 2.859a4.502 4.502 0 00-3.557-2.859m0 0a4.502 4.502 0 013.557-2.859m0 0c.34 0 .67.032.99.093m-3.557 2.859c-.34 0-.67-.032-.99-.093m0 0a4.5 4.5 0 00-5.143 4.232A4.5 4.5 0 0012 19.5a4.5 4.5 0 004.232-5.143m0 0a4.5 4.5 0 01-1.343-3.218" />
      </svg>
    ),
    gavel: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.186.24c-1.908 0-3.806-.4-5.516-1.154a48.538 48.538 0 01-2.186-.24c-.484-.174-.711-.703-.59-1.202L12 4.5m-3 0c-1.01.143-2.01.317-3 .52m3-.52L6.38 15.226c-.122.499.106 1.028.589 1.202a5.989 5.989 0 002.186.24c1.908 0 3.806-.4 5.516-1.154a48.538 48.538 0 002.186-.24c.484-.174.711-.703.59-1.202L12 4.5" />
      </svg>
    ),
    property: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    briefcase: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.05a2.25 2.25 0 01-2.25 2.25h-10.5a2.25 2.25 0 01-2.25-2.25v-4.05m15-4.5V7.5a2.25 2.25 0 00-2.25-2.25h-10.5a2.25 2.25 0 00-2.25 2.25v2.1m15 0a2.25 2.25 0 01-2.25 2.25h-10.5a2.25 2.25 0 01-2.25-2.25m15 0v-2.1a2.25 2.25 0 00-2.25-2.25H7.5A2.25 2.25 0 005.25 7.5v2.1m13.5 0H6.75" />
      </svg>
    ),
    mascot: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 13.5a8.25 8.25 0 018.25-8.25.5.5 0 01.5.5v2.75a.5.5 0 01-.5.5A5.75 5.75 0 008 15.25v2.5a.5.5 0 01-.5.5h-2.5a.5.5 0 01-.5-.5v-2.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 13.5a8.25 8.25 0 00-8.25-8.25.5.5 0 00-.5.5v2.75a.5.5 0 00.5.5A5.75 5.75 0 0116 15.25v2.5a.5.5 0 00.5.5h2.5a.5.5 0 00.5-.5v-2.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 10.5 8 10.5s1 .672 1 1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 12c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S15.448 10.5 16 10.5s1 .672 1 1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14.25c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z" opacity="0.2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.375V5.25m0 13.5v-2.25" />
      </svg>
    ),
     sun: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 16a4 4 0 110-8 4 4 0 010 8z" />
      </svg>
    ),
    moon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  };

  return icons[name] || null;
};
