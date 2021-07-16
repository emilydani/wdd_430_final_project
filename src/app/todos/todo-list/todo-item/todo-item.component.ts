import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Todo } from '../../todo.model';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'cms-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Input() index: number;
  @Output() todoSelected = new EventEmitter<void>();

  originalTodo: Todo;
  editMode: boolean = false;
  id: string;

  name = 'Angular';
  action: string = ' ';

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

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

  onSelected() {
    this.todoSelected.emit();
  }

  onDelete() {
    this.todoService.deleteTodo(this.todo);
    this.router.navigateByUrl('/todos');
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

  onClick() {
    if(this.action == ' ') {
      this.action = '✔ ';
      // alert('Task is marked as done');
    } else {
      this.action = ' ';
        // alert('Unmark task');
    }
  }

}
