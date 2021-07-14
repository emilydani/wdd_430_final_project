import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../../contact.model';
import { ContactService } from '../../contact.service';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  @Input() index: number;
  @Output() contactSelected = new EventEmitter<void>();

  originalContact: Contact;
  editMode: boolean = false;
  id: string;

  name = 'Angular';
  action: string = ' ';

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params.id) {
        this.editMode = false;
        return;
      } else {
        this.originalContact = this.contactService.getContact(params.id);
        if (!this.originalContact) {
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
      }
    });
  }

  onSelected() {
    this.contactSelected.emit();
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('/contacts');
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newContact = new Contact(
      null,
      null,
      value.name,
      value.status
    );

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts'], { relativeTo: this.route });
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
