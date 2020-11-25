import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild} from '@angular/core';

import { AppService } from './app.service';

import {SelectItem} from 'primeng/api';

import 'chart.js';

import 'chartjs-plugin-labels';

import 'chartjs-plugin-stacked100';

import { NgDrupalSettings } from './app.ngdrupalsettings';


interface DropDownDataFormat {
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../css/customstyle.css'],
  encapsulation: ViewEncapsulation.None
})


export class AppComponent implements OnInit {

  // get json data
  sectionContent: any;
  primengDataGeneral: any[];
  blockData: any;

  // new chart.js data
  blockIsChart: boolean;
  tabContent: any;
  pluginLabel: any;

  hcpData: any[];

  businessUnit: any[];
  therapArea: any[];
  programArea: any[];
  selectedRoles: string[] = [];
  display: boolean = false;
  userRoles: any[];

  // evaluation form
  enteredMeetingName: string;
  // programs: DropDownDataFormat[];
  selectedProgram: string;
  // modules: SelectItem[];
  selectedModules: string = "";

  // programTypes: DropDownDataFormat[];
  // selectedProgramType: DropDownDataFormat;

  // evaluationForms: DropDownDataFormat[];
  // selectedEvaluationForms: DropDownDataFormat;

  // meetingFormats: DropDownDataFormat[];
  // selectedMeetingFormats: DropDownDataFormat;

  // meetingTimes: DropDownDataFormat[];
  // selectedMeetingTimes: DropDownDataFormat;

  // speakers: SelectItem[];
  // selectedSpeakers: string = "";

  meetingEventData: string;

  countOnScroll = 2;

  newLoadedData: any[];
  newLoadedSectionContent: any;

  finishLoadLastJsonFile: boolean;

  section: string;
  temp: boolean;

  constructor(private myService: AppService) {
    var ngDrupalSettings = new NgDrupalSettings();
    var pathArg = ngDrupalSettings.drupalSettings.path.currentPath.split('/');
    this.section = pathArg.slice(-5)[0].toLowerCase();
    this.temp = false;
  }

  showDialog() {
    this.display = true;
  }

  // get all data
  getChartJSONAndDisplay(jsonFileName) {

    this.myService.getJsonFile(jsonFileName).subscribe(data => {

      this.newLoadedSectionContent = data;

      this.newLoadedSectionContent.forEach(eachComponent => {
        if (eachComponent.componentname == 'primengchartjs') {
          this.primengDataGeneral = eachComponent.primengcontentdata;
          this.primengDataGeneral.forEach(eachBlockData => {
            if (eachBlockData.blockContent[0]){
              eachBlockData.blockContent.forEach(eachTabData => {
                if (eachBlockData.isChartjs) {
                  if (typeof eachTabData.chartjsPluginsOptions !== 'undefined') {
                    if (typeof eachTabData.chartjsPluginsOptions.calculateLabel !== 'undefined') {
                      if (eachTabData.chartjsPluginsOptions.calculateLabel) {
                        if (eachTabData['tabData'].middle.middleMiddle.renderLabel == "value") {
                          eachTabData['tabData'].middle.middleMiddle.options.plugins.labels.render = "value";
                        }
                        else {
                          eachTabData['tabData'].middle.middleMiddle.options.plugins.labels.render = function(args) {
                            var result = '';
                            if (args.percentage > 5) {
                              result = args.percentage + " %";
                            }
                            return result;
                          };
                        }
                      }
                    }

                    if (typeof eachTabData.chartjsPluginsOptions.calculateLabel !== 'undefined') {
                      if (eachTabData.chartjsPluginsOptions.calculateTooltip) {
                        eachTabData['tabData'].middle.middleMiddle.options.tooltips = {
                          callbacks: {
                            label: function(tooltipItem, data) {
                              var dataset = data.datasets[tooltipItem.datasetIndex];
                              var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                                return previousValue + currentValue;
                              });
                              var currentValue = dataset.data[tooltipItem.index];
                              var percentage = Math.floor(((currentValue/total) * 100)+0.5);
                              return currentValue + ' - - ' + percentage + "%";
                            }
                          }
                        };
                      }
                    }
                    if (typeof eachTabData.chartjsPluginsOptions.dispalyTooltipLabelValue !== 'undefined') {
                      if (eachTabData.chartjsPluginsOptions.dispalyTooltipLabelValue) {
                        eachTabData['tabData'].middle.middleMiddle.options.tooltips = {
                          callbacks: {
                            label: function(tooltipItem, data) {
                              var dataset = data.datasets[tooltipItem.datasetIndex];
                              var currentValue = dataset.data[tooltipItem.index]['y'];
                              var currentLabel = dataset.label;
                              return currentLabel + ' ( ' + currentValue + " ) ";
                            }
                          }
                        };
                      }
                    }
                  }
                }
              });
            }
          });
        }

      });

      if (!this.temp) {
        this.sectionContent = this.newLoadedSectionContent
      }
      else {
        this.newLoadedSectionContent.forEach(eachComponentf => {
          if (eachComponentf.componentname == 'primengchartjs') {
            this.newLoadedData = eachComponentf.primengcontentdata;
          }
        });

        this.sectionContent.forEach(eachComponents => {
          if (eachComponents.componentname == 'primengchartjs') {
           eachComponents.primengcontentdata.push(...this.newLoadedData);
           // eachComponents.primengcontentdata = eachComponents.primengcontentdata.concat(this.newLoadedData);
          }
        });
      }

      this.finishLoadLastJsonFile = true;
    }, // Bind to view
    err => {
      // Log errors if any
      console.log('error: ', err);
    });
  }

  ngOnInit() {
    setTimeout(() => {
      // this.divClick.nativeElement.click();
    }, 200);

    this.sectionContent = null;
    this.temp = false;

    this.getChartJSONAndDisplay(this.section);
  }

  ngDoCheck() {
    if (this.finishLoadLastJsonFile) {
      if (this.section == 'lazy1' || this.section == 'BU1' ) {
        this.temp = true;

        if(this.countOnScroll < 4) {
          // this.getChartJSONAndDisplay(this.section);
          this.getChartJSONAndDisplay('lazy' + this.countOnScroll);
          this.countOnScroll++;
        }
      }
      this.finishLoadLastJsonFile = false;
    }
  }
}

