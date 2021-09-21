type ObserverEventUi = {
  $target: HTMLElement;
};

type ObserverEvent = {
  ui: ObserverEventUi[];
};

export type ObserverCoreBreadcrumbUpdateOptions = {
  events: ObserverEvent;
};

type ObserverCoreSiteLoadEvent = {
  target: HTMLElement;
};

export type ObserverCoreSiteLoadOptions = {
  event: ObserverCoreSiteLoadEvent;
};
