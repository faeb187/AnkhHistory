// @todo implement a performance optimized copy method
export const copy = <T>(x: T): T => <T>JSON.parse(JSON.stringify(x));

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
