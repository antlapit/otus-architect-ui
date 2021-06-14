/** Представляет список доступных для перехода отделённых ФПС а также коллекцию прав на действия на клиенте для аутент. польз-ля */
export class Workspace {
    constructor(
        public allowedActions?: string[],
        public items?: WorkspaceMenuItem[]
    ) {

    }
}

/** Элемент дерева меню */
export class WorkspaceMenuItem {
    constructor(
        public appName?: string,
        public title?: string,
        public url?: string
    ) {
    }
}
