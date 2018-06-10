import { Component } from '@angular/core';

@Component({
    selector: 'tienda',
    templateUrl: './tienda.component.html',
    styleUrls: ['./tienda.component.css']
})
export class TiendaComponent{
    public titulo;
    public nombreDelParque: string;
    public miParque;

    constructor() {
        this.titulo = 'ESTE ES EL TITULO DE TIEDA';
    }

    mostrarNombre() {
        console.log(this.nombreDelParque);
    }

    verDatosParque(event) {
        console.log(event);
        this.miParque = event;
    }
}
