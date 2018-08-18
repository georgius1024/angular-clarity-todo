import {ToDoStatus, ToDoItem} from './to-do-item'

export class ToDoItemsList {
  _todos:ToDoItem[];

  constructor() {
    this.loadFromStorage();
  }

  public getItems():ToDoItem[] {
    return this._todos
      .filter(e => e.status !== ToDoStatus.archive)
      .sort((a, b) => a.index - b.index)
  }

  public getArchive():ToDoItem[] {
    return this._todos.filter(e => e.status === ToDoStatus.archive);
  }

  public add(title:string):ToDoItem {
    let id = 1;
    this._todos.forEach((item) => {
      if (item.id >= id) {
        id = item.id + 1;
      }
    });
    const newItem = new ToDoItem(id, title);
    newItem.index = this._todos.length;
    this._todos.push(newItem);
    this.saveToStorage();
    return newItem
  }

  public update(id: number, title:string):ToDoItem {
    let item = this.find(id);
    if (item) {
      item.title = title
      this.saveToStorage();
    }
    return item;
  }

  public remove(id:number): void {
    let item = this.find(id);
    if (item) {
      item.status = ToDoStatus.archive
      this.saveToStorage();
    }
  }

  public find(id:number):ToDoItem {
    return this._todos.find((item) => {
      return (item.id === id);
    })
  }
  public setOrder(items: ToDoItem[]) {
    items.forEach((item, index) => {
      const original = this.find(item.id)
      original.index = index;
    })
    this.saveToStorage();
  }
  private loadFromStorage() {
    console.log('retrieving todos from storage...');
    this._todos = [];
    const todos = localStorage.getItem('todos');
    if (todos) {
      try {
        const list = JSON.parse(todos);
        this._todos = list
      } catch (error) {
        console.log(error)
      }
    }
  }

  private saveToStorage() {
    console.log('saving todos to storage...');
    const todos = JSON.stringify(this._todos);
    localStorage.setItem('todos', todos);
  }

}
