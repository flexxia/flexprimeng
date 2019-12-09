import { Component, OnInit, Input, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-primeng-chartjs',
  templateUrl: './primeng-chartjs.component.html',
  styleUrls: ['./primeng-chartjs.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class PrimengChartjsComponent implements OnInit, AfterViewInit {

	@Input('chartInputData') primengDataGeneral: any[];

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log("angular chart page loaded");
    document.getElementById('spinner').style.display = 'none';
  }

}
