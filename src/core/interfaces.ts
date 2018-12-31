export interface IDisposable {
    dispose(): void | any;
}

export interface IClonable<T> {
    clone(): T;
}

export interface ISizable {
    readonly size: number;
}

export interface IPairIterable<TKey, TValue> {
    [Symbol.iterator](): IterableIterator<[TKey, TValue]>;
}

export interface IIterable<T> {
    [Symbol.iterator](): IterableIterator<T>;
}

export interface IConcatable<T> {
    concat(...items: T[]): T;
}