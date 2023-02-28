import { Component } from '@angular/core';
import { Guid } from "guid-typescript";
import { Todo } from 'src/models/todo.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'To-Do-List-Angular';
  todos: Todo[] = [
    new Todo(Guid.create(),'Wash car', false),
    new Todo(Guid.create(),'Buy Groceries', false)
  ]

  onSubmit(form: NgForm){
    if (!form.value.title) {
      alert("The input is empty. Please try again!");
      return;
    }
    if(form.value.title.length > 30){
      alert("Too many letters. Please try again!");
      return;
    }

    const newTodo = { id: Guid.create(), title: form.value.title, isComplete: false };
    this.todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    form.resetForm();
  }

  onComplete(id: Guid){
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.isComplete = true;
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  onDelete(id: Guid){
    const index = this.todos.findIndex(t => t.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
  ngOnInit() {
    const todos = localStorage.getItem('todos');
    if (todos) {
      this.todos = JSON.parse(todos);
    }
  }

}

