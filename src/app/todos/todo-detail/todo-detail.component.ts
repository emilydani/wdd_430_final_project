import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Todo } from '../todo.model'
import { TodoService } from '../todo.service';

@Component({
  selector: 'cms-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todo: Todo;
  id: number;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.todo = this.todoService.getTodo((+params['id']).toString())
          // this.todo = this.todoService.getTodo((params['id']))
        }
      )
  }

  onDelete() {
    this.todoService.deleteTodo(this.todo);
    this.router.navigateByUrl('/todos');
  }

}
