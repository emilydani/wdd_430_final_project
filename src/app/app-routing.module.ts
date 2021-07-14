import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactDetailComponent } from "./contacts/contact-detail/contact-detail.component";
import { ContactEditComponent } from "./contacts/contact-edit/contact-edit.component";
import { ContactItemComponent } from "./contacts/contact-list/contact-item/contact-item.component";
import { ContactsComponent } from "./contacts/contacts.component";


const appRoutes: Routes = [
  {path: 'contacts', component: ContactsComponent,
  children: [
    {path: 'new', component: ContactEditComponent},
    {path: ':id', component: ContactDetailComponent},
    {path: ':id/edit', component: ContactEditComponent}
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
