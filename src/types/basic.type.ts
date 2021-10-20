type ClickEvent = Event & {
  target: HTMLElement;
};
type KeyValue = { [key: string]: string };

export { ClickEvent, KeyValue };
