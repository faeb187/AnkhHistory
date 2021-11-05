// @todo implement a performance optimized copy method
export const copy = (x: Record<string, unknown>): Record<string, unknown> =>
  JSON.parse(JSON.stringify(x)) as Record<string, unknown>;

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
