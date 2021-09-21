export type ClickEvent = Event & {
  target: HTMLElement;
};

export type KeyValue = { [key: string]: string };

export type Route = {
  items?: Route[]; // @todo rename to 'routes'
  lang: string;
  path: string;
};
