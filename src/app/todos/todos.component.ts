import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'cms-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodosComponent implements OnInit {
  selectedTodo:Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

}
