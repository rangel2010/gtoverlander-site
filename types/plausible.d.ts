// Tipagem global pra função plausible() que é injetada pelo script externo
// Usado nos formulários pra disparar eventos de conversão.

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: {
        callback?: () => void;
        props?: Record<string, string | number | boolean>;
      }
    ) => void;
  }
}

export {};
