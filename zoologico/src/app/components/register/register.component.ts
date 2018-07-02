import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public title: string;
  constructor(
    private _route: ActivatedRoute,
    private _rputer: Router
  ) {
    this.title = 'registro';
  }

  ngOnInit() {
    console.log("hello");
  }

}
