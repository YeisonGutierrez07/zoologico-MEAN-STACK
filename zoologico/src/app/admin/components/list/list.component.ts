import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  title = 'Panel de administracion Listar';
  number = new Array(25)
}
