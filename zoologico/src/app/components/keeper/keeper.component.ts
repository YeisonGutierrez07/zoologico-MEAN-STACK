import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'keepers',
    templateUrl: './keeper.component.html'
})
export class KeepersComponent implements OnInit {
    title = 'keeper';
    ngOnInit() {
        console.log('metodo onInit OK keeper !');
    }
}
