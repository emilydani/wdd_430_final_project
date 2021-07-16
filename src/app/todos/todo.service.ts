import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  maxTodoId: number;

  @Output() todoSelectedEvent = new EventEmitter<Todo>();
  @Output() todoChangedEvent = new EventEmitter<Todo[]>();
  @Output() todoListChangedEvent = new Subject<Todo[]>();
  @Output() todoListReadyEvent = new Subject<void>();

  constructor(private http: HttpClient) {
    this.getTodos();
   }

   sortAndSend() {
    this.maxTodoId = this.getMaxId();
    this.todos.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    this.todoListChangedEvent.next(this.todos.slice());
    this.todoListReadyEvent.next();
   }

   getTodos() {
    this.http.get('http://localhost:3000/todos').subscribe(
      //success method
      (todos: any) => {
        this.todos = todos.todos;
        this.sortAndSend();
      },
      //error method
      (error: any) => {
        console.log(error);
      });
    }

   getTodo(id: string) {
     for (let todo of this.todos) {
       if (todo.id === id) {
         return todo
       }
     }
     return null;
   }

   getMaxId(): number {
    let maxId: number = 0;
    for (let todo of this.todos) {
      let currentId: number = +todo.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }


  addTodo(todo: Todo) {
    if (!todo) {
      return;
    }

    // make sure id of the new Todo is empty
    todo.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, todo: Todo }>('http://localhost:3000/todos',
      todo,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new todo to todos
          this.todos.push(responseData.todo);
          this.sortAndSend();
        }
      );
  }

  updateTodo(originalTodo: Todo, newTodo: Todo) {
    if (!originalTodo || !newTodo) {
      return;
    }

    const pos = this.todos.findIndex(d => d.id === originalTodo.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Todo to the id of the old Todo
    newTodo.id = originalTodo.id;
    newTodo._id = originalTodo._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/todos/' + originalTodo.id,
      newTodo, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.todos[pos] = newTodo;
          this.sortAndSend();
        }
      );
  }

  deleteTodo(todo: Todo) {

    if (!todo) {
      return;
    }

    const pos = this.todos.findIndex(d => d.id === todo.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/todos/' + todo.id)
      .subscribe(
        (response: Response) => {
          this.todos.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}
