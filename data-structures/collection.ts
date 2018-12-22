type CollectionMapCallback<TKey, TValue> = (value: TValue, key: TKey) => TValue;

export interface ICollection<TKey, TValue> {
    first(): TValue | null;
    array(): TValue[];
    clone(): ICollection<TKey, TValue>;
    concat(...collections: ICollection<TKey, TValue>[]): ICollection<TKey, TValue>;
    map(callback: CollectionMapCallback<TKey, TValue>): this | ICollection<TKey, TValue>;
    filter(callback: CollectionMapCallback<TKey, TValue>): ICollection<TKey, TValue>;
    reduce(callback: CollectionMapCallback<TKey, TValue>): this | ICollection<TKey, TValue>;
    clear(): void;
    delete(key: TKey): boolean;
    get(key: TKey): TValue | null;
    has(key: TKey): boolean;
    set(key: TKey, value: TValue): this | ICollection<TKey, TValue>;
    readonly size: number;
}

// TODO: Missing firstKey(), last(), lastKey(), middle(), middleKey(), random(), randomKey()
// TODO: Currently having booleans as values in collections may cause problems because of the || checks, specifically for first() and last()
export default class Collection<TKey, TValue> extends Map<TKey, TValue> implements ICollection<TKey, TValue> {
    protected valueCache: TValue[] | null;
    protected keyCache: TKey[] | null;

    // TODO: Type of entries
    public constructor(entries?: any) {
        super(entries);

        this.valueCache = [];
        this.keyCache = [];
    }

    public set(key: TKey, value: TValue): this {
        if (this.keyCache && !this.keyCache.includes(key)) {
            this.keyCache.push(key);
        }
        else if (!this.keyCache) {
            this.keyCache = [key];
        }

        this.valueCache = [];
        super.set(key, value);

        return this;
    }

    public first(): TValue | undefined {
        return this.values().next().value;
    }

    public array(): TValue[] {
        return this.valueCache ? this.valueCache : this.valueCache = [...this.values()];
    }

    public clone(): Collection<TKey, TValue> {
        return new Collection(...this.entries());
    }

    public concat(...collections: Collection<TKey, TValue>[]): Collection<TKey, TValue> {
        const result: Collection<TKey, TValue> = this.clone();

        for (const collection of collections) {
            for (const [key, value] of collection) {
                result.set(key, value);
            }
        }

        return result;
    }

    public map(callback: CollectionMapCallback<TKey, TValue>): Collection<TKey, TValue> {
        for (const [key, value] of this) {
            callback(value, key);
        }

        return this;
    }

    public reduce(callback: CollectionMapCallback<TKey, TValue>): Collection<TKey, TValue> {
        for (const [key, value] of this) {
            if (!callback(value, key)) {
                this.delete(key);
            }
        }

        return this;
    }

    public filter(callback: CollectionMapCallback<TKey, TValue>): Collection<TKey, TValue> {
        const result: Collection<TKey, TValue> = this.clone();

        for (const [key, value] of this) {
            if (callback(value, key)) {
                result.set(key, value);
            }
        }

        return result;
    }
}
