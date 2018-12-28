export interface IDisposable {
    dispose(): void | any;
}

export interface IClonable<T> {
    clone(): T;
}

export interface ISizable {
    readonly size: number;
}

export interface IIterable<T> {
    [Symbol.iterator](): IterableIterator<T>;
}