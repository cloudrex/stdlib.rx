export interface IDisposable {
    dispose(): void | any;
}

export interface IClonable<T> {
    clone(): T;
}

export interface ISizable {
    readonly size: number;
}

export interface IIterable<TKey, TValue> {
    [Symbol.iterator](): IterableIterator<[TKey, TValue]>;
}