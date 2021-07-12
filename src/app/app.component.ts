import { Component } from '@angular/core';
import { ContactService } from './contacts/contact.service';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private contactService: ContactService) {}

}
