import type { KeyValue } from "types/basic.type";

/*
enum AnkhEventType {
  dom = "dom",
  ui = "ui",
}
*/
type AnkhEventType = keyof HTMLElementEventMap | string;

type AnkhEvent = {
  args?: KeyValue;
  f?: string;
  l?: string;
  name?: string;
  target: HTMLElement | string;
  type: AnkhEventType;
  // handler?: (e: Event | ClickEvent) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler?: (e: any) => void;
};

type AnkhEventDom = AnkhEvent & {
  target: HTMLElement;
};

export { AnkhEvent, AnkhEventDom, AnkhEventType };
