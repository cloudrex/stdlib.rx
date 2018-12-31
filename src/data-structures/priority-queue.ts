import Queue, {IQueue} from "./queue";

export default class PriorityQueue<T> implements IQueue<T> {
    protected highPriority: IQueue<T>
    protected lowPriority: IQueue<T>;

    public constructor() {
        this.highPriority = new Queue();
        this.lowPriority = new Queue();
    }

    [Symbol.iterator](): IterableIterator<T> {
        return this.highPriority.concat(this.lowPriority);
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

    public get size(): number {
        return this.highPriority.size + this.lowPriority.size;
    }
}