import List from "./list";

/**
 * A list with unique values.
 */
export default class Set<T> extends List<T> {
    public add(...items: T[]): this {
        for (let i: number = 0; i < items.length; i++) {
            if (!this.contains(items[i])) {
                this.items.push(items[i]);
            }
        }

        return this;
    }

    public clone(): Set<T> {
        return new Set(...this.items);
    }
}
