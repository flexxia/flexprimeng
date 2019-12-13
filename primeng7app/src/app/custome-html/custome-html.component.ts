import { Component, OnInit, Input, AfterViewInit , ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-custome-html',
  templateUrl: './custome-html.component.html',
  styleUrls: ['./custome-html.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomeHtmlComponent implements OnInit, AfterViewInit {
	@Input('htmlInputData') htmlDataGeneral: any[];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log("angular html page loaded");
    document.getElementById('spinner').style.display = 'none';
  }

}
