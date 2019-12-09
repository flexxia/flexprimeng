import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class LoadSpinnerComponent implements OnInit {

	@Input('displayloadspinner') displayloadspinner: boolean;

  constructor() {
  }

  ngOnInit() {

  }

}
