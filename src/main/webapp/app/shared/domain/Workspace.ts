/** Представляет список доступных для перехода отделённых ФПС а также коллекцию прав на действия на клиенте для аутент. польз-ля */
export class Workspace {
    allowedActions: string[];
    items: WorkspaceMenuItem[];
}

/** Элемент дерева меню */
export class WorkspaceMenuItem {
    appName: string;
    title: string;
    url: string;
}
