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

  downloadTable(text, filename) {
    var copyButton = new CopyComponent();
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(copyButton.copyClipboard(text)));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
