/// <reference types="@types/google.maps" />

declare global {
  interface Window {
    initGoogleMaps: () => void;
  }
}

// Emits an empty export to ensure TypeScript treats this as a module
export {};
