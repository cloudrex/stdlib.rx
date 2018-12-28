import Dictionary, {IMap} from "./collection";

export interface IImmutableCollection<TKey, TValue> {
    first(): TValue | undefined;
    array(): TValue[];
    clone(): IMap<TKey, TValue>;
    concat(...collections: IMap<TKey, TValue>[]): IMap<TKey, TValue>;
    map<T = any>(callback: CollectionMapCallback<TKey, TValue>): T;
    filter(callback: CollectionMapCallback<TKey, TValue>): IMap<TKey, TValue>;
    reduce(callback: CollectionMapCallback<TKey, TValue>): this;
    clear(): this;
    delete(key: TKey): boolean;
    get(key: TKey): TValue | undefined;
    has(key: TKey): boolean;
    set(key: TKey, value: TValue): this;
}

export default class ImmutableDictionary<TKey, TValue> extends Dictionary<TKey, TValue> {
    public array(): TValue[] {
        return this.valueCache ? this.valueCache : this.valueCache = [...this.values()];
    }

    public concat(...collections: IMap<TKey, TValue>[]): IMap<TKey, TValue> {
        const result: ImmutableDictionary<TKey, TValue> = this.clone();

        for (const collection of collections) {
            for (const [key, value] of collection) {
                result.set(key, value);
            }
        }

        return result;
    }

    public map(callback: (value: TValue, key: TKey) => TValue): this {
        for (const [key, value] of this) {
            callback(value, key);
        }

        return this;
    }

    public reduce(callback: (value: TValue, key: TKey) => TValue): IMap<TKey, TValue> {
        for (const [key, value] of this) {
            if (!callback(value, key)) {
                this.delete(key);
            }
        }

        return this;
    }

    public filter(callback: (value: TValue, key: TKey) => TValue): ImmutableDictionary<TKey, TValue> {
        throw new Error("Method not implemented.");
    }
}