import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'animals',
    templateUrl: './animals.component.html'
})
export class AnimalsComponent implements OnInit {
    title = 'animals';
    ngOnInit() {
        console.log('metodo onInit OK animals !');
    }
}
