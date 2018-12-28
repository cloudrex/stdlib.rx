import {ISizable, IIterable, IClonable} from "../core/interfaces";

type CollectionMapCallback<TKey, TValue> = (value: TValue, key: TKey) => TValue;

export interface ILinearCollection<T> {
    first(): T | undefined;
    array(): T[];
    clear(): this;
}

export interface IMap<TKey, TValue> extends ISizable, IIterable<TValue>, ILinearCollection<TValue>, IClonable<IMap<TKey, TValue>> {
    concat(...collections: IMap<TKey, TValue>[]): IMap<TKey, TValue>;
    map<T = any>(callback: CollectionMapCallback<TKey, TValue>): T;
    filter(callback: CollectionMapCallback<TKey, TValue>): IMap<TKey, TValue>;
    reduce(callback: CollectionMapCallback<TKey, TValue>): this;
    delete(key: TKey): boolean;
    get(key: TKey): TValue | undefined;
    has(key: TKey): boolean;
    set(key: TKey, value: TValue): this;
}

// TODO: Missing firstKey(), last(), lastKey(), middle(), middleKey(), random(), randomKey()
// TODO: Currently having booleans as values in collections may cause problems because of the || checks, specifically for first() and last()
export default class Dictionary<TKey, TValue> implements IMap<TKey, TValue> {
    protected valueCache: TValue[] | null;
    protected keyCache: TKey[] | null;
    protected data: Map<TKey, TValue>;

    // TODO: Type of entries
    public constructor(entries?: any) {
        this.data = new Map(entries);
        this.valueCache = [];
        this.keyCache = [];
    }

    [Symbol.iterator](): IterableIterator<TValue> {
        return this.data.values();
    }

    public set(key: TKey, value: TValue): this {
        if (value === undefined) {
            throw new Error("Value must not be undefined");
        }
        else if (this.keyCache && !this.keyCache.includes(key)) {
            this.keyCache.push(key);
        }
        else if (!this.keyCache) {
            this.keyCache = [key];
        }

        this.valueCache = [];
        this.data.set(key, value);

        return this;
    }

    public get(key: TKey): TValue | undefined {
        return this.data.get(key);
    }

    public first(): TValue | undefined {
        return this.data.values().next().value;
    }

    public array(): TValue[] {
        return this.valueCache ? this.valueCache : this.valueCache = [...this.data.values()];
    }

    public clone(): Dictionary<TKey, TValue> {
        return new Dictionary(...this.data.entries());
    }

    public concat(...collections: Dictionary<TKey, TValue>[]): Dictionary<TKey, TValue> {
        const result: Dictionary<TKey, TValue> = this.clone();

        for (const collection of collections) {
            for (const [key, value] of collection) {
                result.set(key, value);
            }
        }

        return result;
    }

    public map(callback: CollectionMapCallback<TKey, TValue>): Dictionary<TKey, TValue> {
        for (const [key, value] of this) {
            callback(value, key);
        }

        return this;
    }

    public reduce(callback: CollectionMapCallback<TKey, TValue>): Dictionary<TKey, TValue> {
        for (const [key, value] of this) {
            if (!callback(value, key)) {
                this.data.delete(key);
            }
        }

        return this;
    }

    public filter(callback: CollectionMapCallback<TKey, TValue>): Dictionary<TKey, TValue> {
        const result: Dictionary<TKey, TValue> = this.clone();

        for (const [key, value] of this) {
            if (callback(value, key)) {
                result.set(key, value);
            }
        }

        return result;
    }

    public clear(): this {
        this.data.clear();

        return this;
    }

    public has(key: TKey): boolean {
        // TODO

        return false;
    }

    public delete(key: TKey): boolean {
        // TODO
        
        return false;
    }

    public get size(): number {
        return this.data.size;
    }
}
