import type en from './en.json';

export type Messages = keyof typeof en;

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: Messages;
    }
  }
}
