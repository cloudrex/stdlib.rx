type ListMapCallback<TItem, TReturn> = (item: TItem) => TReturn;

export interface IList<T> {
    add(...items: T[]): this;
    map(callback: ListMapCallback<T, T>): T[];
    filter(callback: ListMapCallback<T, boolean>): IList<T>;
    remove(item: T): boolean;
    removeAll(item: T): number;
    removeAt(index: number): boolean;
    clear(): this;
    reduce(callback: ListMapCallback<T, boolean>): this;
    every(callback: ListMapCallback<T, any>): this;
    reverse(): this;
    array(): T[];
    pop(): T | undefined;
    shift(): T;
    unshift(...values: T[]): this;
    contains(item: T): boolean;
    swap(firstItem: T, secondItem: T): boolean;
    swapAt(firstPosition: number, secondPosition: number): boolean;
    json(): string;
}

export default class List<T> implements IList<T> {
    protected items: T[];

    public constructor(...items: T[]) {
        this.items = items !== undefined ? items : [];
    }

    public add(item: T): this {
        // TODO: Implement.
        throw new Error("Not yet implemented");
    }

    public clone(): IList<T> {
        // TODO: Implement.
        throw new Error("Not yet implemented");
    }

    public map(callback: ListMapCallback<T, T>): T[] {
        return this.items.map(callback);
    }

    public filter(callback: ListMapCallback<T, boolean>): IList<T> {
        const result: IList<T> = this.clone();

        // TODO
        throw new Error("Method not implemented.");
    }

    public remove(item: T): boolean {
        const index: number = this.items.indexOf(item);

        if (index !== -1) {
            this.items.splice(index, 1);

            return true;
        }

        return false;
    }

    public removeAll(item: T): number {
        let count: number = 0;

        while (this.remove(item)) {
            count++;
        }

        return count;
    }

    public removeAt(index: number): boolean {
        // TODO

        throw new Error("Method not implemented.");
    }

    public clear(): this {
        this.items.length = 0;

        return this;
    }

    public reduce(callback: ListMapCallback<T, boolean>): this {
        for (let i: number = 0; i < this.items.length; i++) {
            if (!callback(this.items[i])) {
                this.removeAt(i);
            }
        }

        return this;
    }

    public every(callback: ListMapCallback<T, any>): this {
        for (const item of this.items) {
            callback(item);
        }

        return this;
    }

    public reverse(): this {
        this.items = this.items.reverse();

        return this;
    }

    public reversed(): T[] {
        return this.items.reverse();
    }

    public array(): T[] {
        return this.items;
    }

    public pop(): T | undefined {
        return this.items.pop();
    }

    public shift(): T {
        return this.shift();
    }

    public unshift(...values: T[]): this {
        this.items.unshift(...values);

        return this;
    }

    public contains(item: T): boolean {
        return this.items.includes(item);
    }

    public swap(firstItem: T, secondItem: T): boolean {
        throw new Error("Method not implemented.");
    }

    public swapAt(firstPosition: number, secondPosition: number): boolean {
        throw new Error("Method not implemented.");
    }

    public json(): string {
        return JSON.stringify(this.items);
    }

    public contact(...lists: IList<T>[]): IList<T> {
        const result: IList<T> = this.clone();

        for (const list of lists) {
            // TODO
            result.add(...list.array());
        }

        return result;
    }

    public get size(): number {
        return this.items.length;
    }
}
