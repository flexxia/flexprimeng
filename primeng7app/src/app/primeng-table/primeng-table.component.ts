import { Component, OnInit, Input, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CopyComponent } from '../copy.component';

@Component({
  selector: 'app-primeng-table',
  templateUrl: './primeng-table.component.html',
  styleUrls: ['./primeng-table.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class PrimengTableComponent implements OnInit, AfterViewInit {

	@Input('tableInputData') primengDataGeneral: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log("angular table page loaded");
    document.getElementById('spinner').style.display = 'none';
  }

  copyMessage(val: any) {
	  var copyButton = new CopyComponent();
	  copyButton.copyMessage(val);
	}

}
