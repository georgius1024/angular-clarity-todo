export enum ToDoStatus {
    new = 'new',
    done = 'done',
    archive = 'archive'
}
export class ToDoItem {
    index: number;
    constructor (public id: number, public title: string, public status: ToDoStatus = ToDoStatus.new) {

    }


}
