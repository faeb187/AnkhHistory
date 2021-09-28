// @todo implement a performance optimized copy method
export const copy = (x: Record<string, unknown>): Record<string, unknown> =>
  JSON.parse(JSON.stringify(x)) as Record<string, unknown>;
