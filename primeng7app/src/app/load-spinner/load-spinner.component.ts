import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class LoadSpinnerComponent implements OnInit, AfterViewInit {

	@Input('displayloadspinner') displayloadspinner: boolean;

  constructor() { }

  ngAfterViewInit() {
    this.displayloadspinner = false;
    console.log("displayloadspinner");
    console.log(this.displayloadspinner);
  }

  ngOnInit() {

  }

}
