import {SimpleFile} from "./SimpleFile";

export class SimpleDocument {
    constructor(
        public id?: string,
        public name?: string,
        public appFormId?: string,
        public appFormName?: string,
        public groupId?: string,
        public files: SimpleFile[] = []
    ) {
    }
}
