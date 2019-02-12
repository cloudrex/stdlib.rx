import {IIterable, IConcatable, IClonable} from "../core/interfaces";

export interface IQueue<T> extends IIterable<T> {
    enqueue(item: T): void;
    dequeue(): T | null;
    first(): T | null;
    last(): T | null;

    readonly size: number;
}

export default class Queue<T> implements IQueue<T>, IConcatable<Queue<T>>, IClonable<Queue<T>> {
    protected items: T[];

    public constructor(...items: T[]) {
        this.items = items !== undefined ? items : [];
    }

    [Symbol.iterator](): IterableIterator<T> {
        return this.items.values();
    }

    public enqueue(item: T): this {
        this.items.unshift(item);

        return this;
    }

    public dequeue(): T | null {
        return this.items.pop() || null;
    }

    public first(): T | null {
        return this.items[0] || null;
    }

    public last(): T | null {
        return this.items[this.items.length - 1] || null;
    }

    public concat(...queues: IQueue<T>[]): Queue<T> {
        const result: Queue<T> = this.clone();

        for (const queue of queues) {
            for (const item of queue) {
                result.enqueue(item);
            }
        }

        return result;
    }

    public clone(): Queue<T> {
        return new Queue(...this.items);
    }

    public get size(): number {
        return this.items.length;
    }
}