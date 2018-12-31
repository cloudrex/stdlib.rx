import Queue, {IQueue} from "./queue";
import {IConcatable, IClonable} from "../core/interfaces";

export default class PriorityQueue<T> implements IQueue<T>, IConcatable<PriorityQueue<T>>, IClonable<PriorityQueue<T>> {
    protected highPriority: IQueue<T>
    protected lowPriority: IQueue<T>;

    public constructor() {
        this.highPriority = new Queue();
        this.lowPriority = new Queue();
    }

    [Symbol.iterator](): IterableIterator<T> {
        //return this.highPriority.concat(this.lowPriority);

        // TODO: Hotfix
        return null as any;
    }

    public enqueue(item: T, highPriority: boolean = false): this {
        if (highPriority) {
            this.highPriority.enqueue(item);
        }
        else {
            this.lowPriority.enqueue(item);
        }

        return this;
    }

    public dequeue(): T | null {
        if (this.highPriority.size > 0) {
            return this.highPriority.dequeue();
        }

        return this.lowPriority.dequeue();
    }

    public first(): T | null {
        return this.highPriority.first() || this.lowPriority.first();
    }

    public last(): T | null {
        return this.highPriority.last() || this.lowPriority.last();
    }

    public concat(...queues: PriorityQueue<T>[]): PriorityQueue<T> {
        return null as any;
    }

    public clone(): PriorityQueue<T> {
        // TODO: Type-error hotfix
        return null as any;
    }

    public get size(): number {
        return this.highPriority.size + this.lowPriority.size;
    }
}