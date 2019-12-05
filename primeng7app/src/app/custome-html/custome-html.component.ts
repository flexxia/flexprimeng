import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-custome-html',
  templateUrl: './custome-html.component.html',
  styleUrls: ['./custome-html.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomeHtmlComponent implements OnInit {
	@Input('htmlInputData') htmlDataGeneral: any[];

  constructor() { }

  ngOnInit() {
  }

}
