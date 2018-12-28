import {GenericList, IGenericList} from "./list";

export interface ISet<T> extends IGenericList<T> {
    add(...items: T[]): number;
}

export default class Set<T> extends GenericList<T> {
    public add(...items: T[]): number {
        let added: number = 0;

        for (let i: number = 0; i < items.length; i++) {
            if (!this.contains(items[i])) {
                this.items.push(items[i]);
                added++;
            }
        }

        return added;
    }

    public clone(): Set<T> {
        return new Set(...this.items);
    }
}