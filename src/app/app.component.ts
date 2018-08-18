import { Component } from '@angular/core';
import { ToDoItem } from './classes/to-do-item'
import { ToDoItemsList } from './classes/to-do-items-list'
import { SortablejsOptions } from 'angular-sortablejs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  ToDos: ToDoItemsList;
  items: ToDoItem[];
  create = false;
  delete = false;
  update = false;
  idToDelete: number;
  itemToEdit: ToDoItem;

  eventOptions: SortablejsOptions = {
    handle: '.draggable',
    onSort: (e1: any) => {
      this.ToDos.setOrder(this.items)
      this.items = this.ToDos.getItems();
    }
  };

  ngOnInit () {
    this.ToDos = new ToDoItemsList();
    this.items = this.ToDos.getItems();
    // this.ToDos.add('Сделать домашку');
    // this.ToDos.add('Сдать тест');
    // this.items.push(new ToDoItem(1, 'Сделать домашку'));
    // this.items.push(new ToDoItem(2, 'Сдать тест'));
  }
  createTodo () {
    this.create = true
  }
  createTodoCompleted () {
    this.ToDos.add(this.title);
    this.title = '';
    this.create = false;
    this.items = this.ToDos.getItems();
  }

  removeTodo (id: number) {
    this.idToDelete = id;
    this.delete = true;
  }

  removeTodoConfirmed (id: number) {
    this.delete = false;
    this.ToDos.remove(this.idToDelete);
    this.items = this.ToDos.getItems();
  }
  
  updateTodo (item: ToDoItem) {
    this.itemToEdit = item
    this.title = item.title
    this.update = true
  }


  updateTodoCompleted () {
    this.ToDos.update(this.itemToEdit.id, this.title);
    this.update = false;
    this.items = this.ToDos.getItems();
  }

}
