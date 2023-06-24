import { TFunction } from "i18next";

// export interface ContextMenuOptions {
//   getContextActions(t: TFunction): any[];
//   getContextHandler(indexPath: number[]): void;
// }

export interface ContextMenuOptions {
  getContextActions: (t: TFunction) => any[];
  getContextHandler: (indexPath: number[]) => void;
}
