import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
    title = 'Contact';
    public emailContacto: string;
    ngOnInit() {
        console.log('metodo onInit OK Contact !');
    }

    guardarEmail() {
        localStorage.setItem('emailContacto', this.emailContacto);
        console.log("ACA", localStorage.getItem('emailContacto'));
    }
}
