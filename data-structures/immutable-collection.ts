import Collection, {ICollection} from "./collection";

export default class ImmutableCollection<TKey, TValue> extends Collection<TKey, TValue> {
    public array(): TValue[] {
        return this.valueCache ? this.valueCache : this.valueCache = [...this.values()];
    }

    public concat(...collections: ICollection<TKey, TValue>[]): ICollection<TKey, TValue> {
        const result: ImmutableCollection<TKey, TValue> = this.clone();

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

    public reduce(callback: (value: TValue, key: TKey) => TValue): ICollection<TKey, TValue> {
        for (const [key, value] of this) {
            if (!callback(value, key)) {
                this.delete(key);
            }
        }

        return this;
    }

    public filter(callback: (value: TValue, key: TKey) => TValue): this {
        throw new Error("Method not implemented.");
    }
}