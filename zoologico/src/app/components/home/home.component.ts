import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    title = 'HOME';
    ngOnInit() {
        console.log('metodo onInit OK HOME !');
    }
}
