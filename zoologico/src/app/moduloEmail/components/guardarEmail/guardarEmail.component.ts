import { Component} from '@angular/core';

@Component({
    selector: 'guardar-email',
    template: `
        <h2>{{title}}</h2>
        <input type="text" [(ngModel)]="emailContacto" />
        <button (click)="guardarEmail()">Guardar email</button>
    `
})
export class GuardarEmailComponent  {
    title = 'guardar email';
    public emailContacto: string;

    guardarEmail() {
        localStorage.setItem('emailContacto', this.emailContacto);
        console.log('ACA', localStorage.getItem('emailContacto'));
    }
}
