type HashMapCallback<TKey, TValue> = (value: TValue, key: TKey) => TValue;
type HashMapTransformCallback<TKey, TValue, TResult> = (value: TValue, key: TKey) => TResult;

export interface ILinearCollection<T> {
    first(): T | undefined;
    array(): T[];
    clear(): this;

    readonly size: number;
}

export interface IHashMap<TKey, TValue> {
    [Symbol.iterator](): IterableIterator<[TKey, TValue]>;
    concat(...hashMaps: IHashMap<TKey, TValue>[]): IHashMap<TKey, TValue>;
    map<T = any>(callback: HashMapTransformCallback<TKey, TValue, T>): T[];
    filter(callback: HashMapCallback<TKey, TValue>): IHashMap<TKey, TValue>;
    reduce(callback: HashMapCallback<TKey, TValue>): this;
    delete(key: TKey): boolean;
    get(key: TKey): TValue | undefined;
    has(key: TKey): boolean;
    set(key: TKey, value: TValue): this;
}

// TODO: Missing firstKey(), last(), lastKey(), middle(), middleKey(), random(), randomKey().
// TODO: Currently having booleans as values in collections may cause problems because of the || checks, specifically for first() and last().
export default class HashMap<TKey, TValue> implements IHashMap<TKey, TValue> {
    protected valueCache: TValue[] | null;
    protected keyCache: TKey[] | null;
    protected data: Map<TKey, TValue>;

    // TODO: Type of entries.
    public constructor(entries?: any) {
        this.data = new Map(entries);
        this.valueCache = [];
        this.keyCache = [];
    }

    [Symbol.iterator](): IterableIterator<[TKey, TValue]> {
        return this.data.entries();
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

    public clone(): HashMap<TKey, TValue> {
        return new HashMap(...this.data.entries());
    }

    public concat(...hashMaps: IHashMap<TKey, TValue>[]): IHashMap<TKey, TValue> {
        const result: HashMap<TKey, TValue> = this.clone();

        for (const hashMap of hashMaps) {
            for (const [key, value] of hashMap) {
                result.set(key, value);
            }
        }

        return result as any;
    }

    public map<T = any>(callback: HashMapTransformCallback<TKey, TValue, T>): T[] {
        const result: T[] = [];

        for (const [key, value] of this) {
            result.push(callback(value, key));
        }

        return result;
    }

    public reduce(callback: HashMapCallback<TKey, TValue>): this {
        for (const [key, value] of this) {
            if (!callback(value, key)) {
                this.data.delete(key);
            }
        }

        return this;
    }

    public filter(callback: HashMapCallback<TKey, TValue>): IHashMap<TKey, TValue> {
        const result: HashMap<TKey, TValue> = this.clone();

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
        return this.data.has(key);
    }

    public delete(key: TKey): boolean {
        // TODO

        return false;
    }

    public get size(): number {
        return this.data.size;
    }
}
