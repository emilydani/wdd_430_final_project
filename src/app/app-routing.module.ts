import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodoDetailComponent } from "./todos/todo-detail/todo-detail.component";
import { TodoEditComponent } from "./todos/todo-edit/todo-edit.component";
import { TodoItemComponent } from "./todos/todo-list/todo-item/todo-item.component";
import { TodosComponent } from "./todos/todos.component";


const appRoutes: Routes = [
  {path: 'todos', component: TodosComponent,
  children: [
    {path: 'new', component: TodoEditComponent},
    {path: ':id', component: TodoDetailComponent},
    {path: ':id/edit', component: TodoEditComponent}
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
