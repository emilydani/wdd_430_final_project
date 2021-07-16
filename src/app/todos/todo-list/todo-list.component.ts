import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from '../todo.model'
import { TodoService } from '../todo.service';

@Component({
  selector: 'cms-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todo: Todo;
  @Input() index: number;
  @Output() todoSelected = new EventEmitter<void>();

  originalTodo: Todo;
  editMode: boolean = false;
  id: string;

  todos: Todo[];
  private subscription: Subscription;
  term: string;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos();
    this.todoService.todoChangedEvent
      .subscribe(
        (todos: Todo[]) => {
          this.todos = todos;
        }
      )

    this.subscription = this.todoService.todoListChangedEvent
    .subscribe(
      (todoList: Todo[]) => {
        this.todos = todoList;
      }
    )
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
