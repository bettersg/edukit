/// <reference types="vite/client" />

declare global {
  interface Window {
    tuteeParsedData?: Tutee[];
    tutorParsedData?: Tutor[];
    matchingList?: MatchingList;
    handleCredentialResponse: (response: any) => void;
  }
}
