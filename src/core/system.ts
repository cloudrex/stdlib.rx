import {FileHandle} from "./file-system";
import fs from "fs";

export const hiddenPropertySuffix: string = "$$xlib_";

export type PromiseOr<T> = Promise<T> | T;

export type Action<T = void> = () => T;

export default class System {
    public static open(path: string): FileHandle | null {
        if (!fs.existsSync(path)) {
            return null;
        }

        return new FileHandle(path);
    }
}