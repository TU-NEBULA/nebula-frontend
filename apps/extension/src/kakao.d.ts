export {};

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
    };
  }
}
