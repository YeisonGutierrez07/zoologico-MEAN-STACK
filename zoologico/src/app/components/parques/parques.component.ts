import { Component, Input, Output, EventEmitter, SimpleChange, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
    selector: 'parques',
    templateUrl: './parques.component.html'
})
export class ParquesComponent implements OnInit, DoCheck, OnDestroy {
    @Input() titulo: string;
    public metros: number;
    public vegetacion: string;
    public abierto: boolean;

    @Output() pasameLosDatos = new EventEmitter();

    constructor() {
        this.metros = 450;
        this.vegetacion = 'Alta';
        this.abierto =  true;
    }
    ngOnInit() {
        console.log('metodo onInit OK');
    }
    ngDoCheck() {
        console.log('El doCkeck se ha ejecutado');
    }
    emitirEvento() {
        this.pasameLosDatos.emit({
            'titulo': this.titulo,
            'metros': this.metros,
            'vegetacion': this.vegetacion,
            'abierto': this.abierto,
        });
    }
    ngOnDestroy() {
        console.log('Se va a eliminar el componente');
    }
}
