type AnyObject = Record<string, unknown>;
type EmptyObject = Record<string, never>;
type KeyValue = Record<string, string>;
type Position = { x: number; y: number };

export { AnyObject, EmptyObject, KeyValue, Position };
