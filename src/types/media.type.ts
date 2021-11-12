type AnkhMediaOptions = {
  max?: AnkhMediaViewport;
  min?: AnkhMediaViewport;
};

enum AnkhMediaViewport {
  XS = "xs",
  S = "s",
  M = "m",
  L = "l",
  XL = "xl",
  HD = "hd",
}

export { AnkhMediaOptions, AnkhMediaViewport };
