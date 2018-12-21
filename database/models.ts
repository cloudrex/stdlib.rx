import {hiddenPropertySuffix} from "../core/system";

const propertyPrefix: string = `${hiddenPropertySuffix}db_`;

function mark(obj: object, name: string, value: any): void {
    Object.defineProperty(obj, `${propertyPrefix}${name}`, {
        value: value
    });
}

export interface IModel {

}

export enum PropertyType {
    String
}

export function unique(): any {
    return function (target) {
        mark(target, "unique", true);
    }
}

export function type(type: PropertyType): any {
    return function (target) {
        mark(target, "type", type);
    }
}

export function name(name: string): any {
    return function (target) {
        mark(target, "name", name);
    }
}

class UserTestModel implements IModel {
    @type(PropertyType.String)
    @unique()
    @name("name")
    public readonly name: string;
}