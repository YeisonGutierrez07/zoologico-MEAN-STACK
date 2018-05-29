import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
    title = 'Contact';
    ngOnInit() {
        console.log('metodo onInit OK Contact !');
    }
}
