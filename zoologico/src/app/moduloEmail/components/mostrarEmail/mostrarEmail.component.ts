import { Component, OnInit, DoCheck} from '@angular/core';

@Component({
    selector: 'mostrar-email',
    template: `
    <div *ngIf="emailContacto">
            <h2>{{title}}</h2>
            <strong>Email contacto:</strong> {{emailContacto}}
            <button (click)="borrarEmail()">Eliminar Email</button>
        </div>
    `
})
export class MostrarEmailComponent implements OnInit, DoCheck {
    title = 'mostrar email';
    public emailContacto: string;
    ngOnInit() {
        this.emailContacto = localStorage.getItem('emailContacto');
        console.log(this.emailContacto);
    }

    ngDoCheck() {
        this.emailContacto = localStorage.getItem('emailContacto');
    }

    borrarEmail() {
        localStorage.removeItem('emailContacto');
        localStorage.clear();
        this.emailContacto = null;
    }
}
