type AnkhBreakpoint = "s" | "m" | "l" | "xl";

type AnkhMedia = {
  min?: AnkhBreakpoint;
  max?: AnkhBreakpoint;
};

type AnkhUiConf = {
  id: string;
  media?: AnkhMedia;
  parentId: string;
};

export const home = [
  {
    id: "test",
    text: "test",
    ui: "html",
  },
];
