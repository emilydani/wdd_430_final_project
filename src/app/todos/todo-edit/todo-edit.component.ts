import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'cms-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css'],
})
export class TodoEditComponent implements OnInit {
  originalTodo: Todo;
  todo: Todo;
  groupTodos: Todo[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params.id) {
        this.editMode = false;
        return;
      } else {
        this.originalTodo = this.todoService.getTodo(params.id);
        if (!this.originalTodo) {
          return;
        }
        this.editMode = true;
        this.todo = JSON.parse(JSON.stringify(this.originalTodo));
      }
    });
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newTodo = new Todo(
      null,
      null,
      value.name,
      value.status
    );

    if (this.editMode) {
      this.todoService.updateTodo(this.originalTodo, newTodo);
    } else {
      this.todoService.addTodo(newTodo);
    }
    this.router.navigate(['/todos'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['/todos'], { relativeTo: this.route });
  }

  isInvalidTodo(newTodo: Todo) {
    if (!newTodo) {
      // newTodo has no value
      return true;
    }
    if (this.todo && newTodo.id === this.todo.id) {
      return true;
    }
    return false;
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupTodos.length) {
      return;
    }
    this.groupTodos.splice(index, 1);
  }
}
