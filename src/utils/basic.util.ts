export const debounce = (
  fn: (event: Event) => void
): ((event: Event) => void) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timer: any;
  return (event: Event) => {
    timer && clearTimeout(timer);
    timer = setTimeout(fn, 100, event);
  };
};

export const times = (x: number) => (f: (i: number) => void): void => {
  if (x > 0) {
    f(x);
    times(x - 1)(f);
  }
};
