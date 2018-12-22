import {IClonable} from "../core/interfaces";

type ListMapCallback<TItem, TReturn> = (item: TItem) => TReturn;

export interface IList<T> extends IClonable<List<T>> {
    map(callback: ListMapCallback<T, T>): T[];
    filter(callback: ListMapCallback<T, boolean>): IList<T>;
    add(item: T): this;
    remove(item: T): boolean;
    removeAll(item: T): number;
    removeAt(index: number): boolean;
    clear(): this;
    reduce(callback: ListMapCallback<T, boolean>): IList<T>;
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
    readonly size: number;
}

export default class List<T> implements IList<T> {
    protected values: T[];

    public constructor(...values: T[]) {
        this.values = values !== undefined ? values : [];
    }

    public map(callback: ListMapCallback<T, T>): T[] {
        return this.values.map(callback);
    }

    public filter(callback: ListMapCallback<T, boolean>): IList<T> {
        const result: List<T> = this.clone();

        // TODO
        throw new Error("Method not implemented.");
    }

    public add(...items: T[]): this {
        this.values.push(...items);

        return this;
    }

    public remove(item: T): boolean {
        const index: number = this.values.indexOf(item);

        if (index !== -1) {
            this.values.splice(index, 1);

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
        this.values.length = 0;

        return this;
    }
    
    public reduce(callback: ListMapCallback<T, boolean>): IList<T> {
        throw new Error("Method not implemented.");
    }

    public every(callback: ListMapCallback<T, any>): this {
        throw new Error("Method not implemented.");
    }

    public reverse(): this {
        this.values = this.values.reverse();

        return this;
    }

    public reversed(): T[] {
        return this.values.reverse();
    }

    public array(): T[] {
        return this.values;
    }

    public pop(): T | undefined {
        return this.values.pop();
    }
    
    public shift(): T {
        return this.shift();
    }

    public unshift(...values: T[]): this {
        this.values.unshift(...values);

        return this;
    }

    public contains(item: T): boolean {
        return this.values.includes(item);
    }

    public swap(firstItem: T, secondItem: T): boolean {
        throw new Error("Method not implemented.");
    }

    public swapAt(firstPosition: number, secondPosition: number): boolean {
        throw new Error("Method not implemented.");
    }

    public json(): string {
        return JSON.stringify(this.values);
    }

    public clone(): List<T> {
        return new List<T>(...this.values);
    }

    public contact(...lists: List<T>[]): List<T> {
        const result: List<T> = this.clone();

        for (const list of lists) {
            result.add()
        }

        return result;
    }

    public get size(): number {
        return this.values.length;
    }
}