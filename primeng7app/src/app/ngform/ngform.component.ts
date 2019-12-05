import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { AppService } from '../app.service';
import { NgDrupalSettings } from '../app.ngdrupalsettings';

import * as jQuery from 'jquery';

@Component({
  selector: 'app-ngform',
  templateUrl: './ngform.component.html',
  styleUrls: ['./ngform.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NGFormComponent implements OnInit {

  @Input('name') ngFormcomponentData: any;

  formBasicInfo: any;

  totalResults: any[]=[];
  childData: any[]=[];

  availableData: any[]=[];
  childLevelData: any[];
  parentChildSet: any[]=[];
  returnFormResults: any[]=[];
  returnQuestionsResults: any[]=[];

  constructor(private myService: AppService) {}

  /**
   *
   */
  save() {
    var temporaryQuestionResult;

    var ngDrupalSettings = new NgDrupalSettings();
    var pathArg = ngDrupalSettings.drupalSettings.path.currentPath.split('/');

    this.returnFormResults.forEach(eachResult => {
      eachResult.field_value =[];
      eachResult.field_value = eachResult.field_value.concat(this.totalResults[eachResult.field_name]);
    });

    this.returnQuestionsResults.forEach(eachQuestion => {
      eachQuestion.question_answer = "";
      eachQuestion.question_answer = this.totalResults[eachQuestion.question_reactset_tid];
    });

    // temporaryQuestionResult = {
    //   "field_name": "field_evaluation_reactset",
    //   "field_value": this.returnQuestionsResults
    // };

    // this.returnFormResults.push(temporaryQuestionResult);

    this.returnFormResults.forEach(eachResult => {
      this.formBasicInfo.resultSubmit[eachResult.field_name] = eachResult;
    });

    console.log(this.formBasicInfo.resultSubmit);

    // delete this.formBasicInfo.resultSubmit["meeting_tile"];
    // delete this.formBasicInfo.resultSubmit["meeting_topic"];
    // delete this.formBasicInfo.resultSubmit["undefined"];
    // console.log(this.formBasicInfo.resultSubmit);

    // save json to node evaluation
    this.formBasicInfo.resultSubmit["field_evaluation_reactset"] = this.returnQuestionsResults;

    if (typeof this.formBasicInfo.formSubmitTag !== 'undefined') {
      if (this.formBasicInfo.formSubmitTag == 'evaluation') {
        // only for evaluation form

        let tempReactset = {};
        let tempReactsetArray = [];
        this.formBasicInfo.resultSubmit["field_evaluation_reactset"].forEach(rowItem => {

          // const index: number = rowItem.indexOf("question_reactset_tid");
          // if (index !== -1) {
          //   tempReactset = rowItem.splice(index, 1);
          // }

          // rowItem = rowItem.filter(rowItem => rowItem.name != "question_reactset_tid"});

          if (typeof rowItem.question_answer === 'string') {
            tempReactset = {
              "question_tid" : rowItem.question_tid,
              "question_answer" : rowItem.question_answer,
              "refer_tid" : rowItem.refer_tid,
              "refer_uid" : rowItem.refer_uid,
              "refer_other" : rowItem.refer_other,
            };

            tempReactsetArray.push(tempReactset);
          };
        });
        this.formBasicInfo.resultSubmit["field_evaluation_reactset"] = tempReactsetArray;

        var httpMethod = 'POST';
        var postUrl = ngDrupalSettings.drupalSettings.path.baseUrl + 'node' + '?_format=json';

        // var postNodeJsonSample = {
        //   "type": [{ "target_id": "evaluation" }],
        //   "title": [{ "value": "Evaluation for meeting 41637" }],
        //   "field_evaluation_meetingnid": [
        //     {
        //       "target_id": "186",
        //       "target_type": "node",
        //     },
        //   ],
        //   "field_evaluation_reactset": [
        //     {
        //       "question_tid": "122",
        //       "question_answer": "5",
        //       "refer_uid": "0",
        //       "refer_tid": "0",
        //       "refer_other": ""
        //     },
        //     {
        //       "question_tid": "124",
        //       "question_answer": "2",
        //       "refer_uid": "0",
        //       "refer_tid": "0",
        //       "refer_other": ""
        //     },
        //   ],
        // };

        this.myService.httpGetCsrfToken().subscribe(res => {
          var csrfToken = res;

          this.myService.httpNodePostJson(postUrl, this.formBasicInfo.resultSubmit, csrfToken).subscribe(
            res => {
              // console.log(res);
              console.log("Evaluation submit successful");
              window.location.href = ngDrupalSettings.drupalSettings.path.baseUrl + this.formBasicInfo.redirectUrl;
            },
            err => {
              console.log("Error occured");
            }
          );
        });
      }
      else if (this.formBasicInfo.formSubmitTag == 'hcpcomments') {
        // only for HCP comments
        // check program is empty or not
        if (
          (typeof this.formBasicInfo.resultSubmit.field_program_list.field_value !== 'undefined') &&
          (this.formBasicInfo.resultSubmit.field_program_list.field_value[0] != null) &&
          (this.formBasicInfo.resultSubmit.field_program_list.field_value[0] > 0) ) {
            var programTid = this.formBasicInfo.resultSubmit.field_program_list.field_value[0];
            var startTime = pathArg.slice(-2)[0].toLowerCase();
            var endTime = pathArg.slice(-1)[0].toLowerCase();

            var requestUrl = "exportinfo/comments/program/" + programTid + "/" + startTime + "/" + endTime;

            window.location.href = ngDrupalSettings.drupalSettings.path.baseUrl + requestUrl;
        }
        // then check Therapeutic is empty or not
        else if (
          (typeof this.formBasicInfo.resultSubmit.field_theraparea_list.field_value !== 'undefined') &&
          (this.formBasicInfo.resultSubmit.field_theraparea_list.field_value[0] != null) &&
          (this.formBasicInfo.resultSubmit.field_theraparea_list.field_value[0] > 0) ) {
            var therapareaTid = this.formBasicInfo.resultSubmit.field_theraparea_list.field_value[0];
            var startTime = pathArg.slice(-2)[0].toLowerCase();
            var endTime = pathArg.slice(-1)[0].toLowerCase();

            var requestUrl = "exportinfo/comments/therapeuticarea/" + therapareaTid + "/" + startTime + "/" + endTime;

            window.location.href = ngDrupalSettings.drupalSettings.path.baseUrl + requestUrl;
        }
      }
      else if (this.formBasicInfo.formSubmitTag == 'hcpquestioncomments') {
        if (
          (typeof this.formBasicInfo.resultSubmit.field_textquestion_list.field_value !== 'undefined') &&
          (this.formBasicInfo.resultSubmit.field_textquestion_list.field_value[0] != null) &&
          (this.formBasicInfo.resultSubmit.field_textquestion_list.field_value[0] > 0) ) {
            var questionTid = this.formBasicInfo.resultSubmit.field_textquestion_list.field_value[0];
            var startTime = pathArg.slice(-2)[0].toLowerCase();
            var endTime = pathArg.slice(-1)[0].toLowerCase();

            var requestUrl = "exportinfo/comments/question/" + questionTid + "/" + startTime + "/" + endTime;

            window.location.href = ngDrupalSettings.drupalSettings.path.baseUrl + requestUrl;
        }
      }
      else if (this.formBasicInfo.formSubmitTag == 'hcptherapareacomments') {
        if (
          (typeof this.formBasicInfo.resultSubmit.field_textquestion_list.field_value !== 'undefined') &&
          (this.formBasicInfo.resultSubmit.field_textquestion_list.field_value[0] != null) &&
          (this.formBasicInfo.resultSubmit.field_textquestion_list.field_value[0] > 0) &&
          (typeof this.formBasicInfo.resultSubmit.field_theraparea_list.field_value !== 'undefined') &&
          (this.formBasicInfo.resultSubmit.field_theraparea_list.field_value[0] != null) &&
          (this.formBasicInfo.resultSubmit.field_theraparea_list.field_value[0] > 0) ) {

            var therapareaTid = this.formBasicInfo.resultSubmit.field_theraparea_list.field_value[0];
            var questionTid = this.formBasicInfo.resultSubmit.field_textquestion_list.field_value[0];
            var startTime = pathArg.slice(-2)[0].toLowerCase();
            var endTime = pathArg.slice(-1)[0].toLowerCase();

            var requestUrl = "exportinfo/comments/question/" + questionTid + "/" + startTime + "/" + endTime;
            requestUrl = requestUrl + "?theraparea[tid]=" + therapareaTid;

            window.location.href = ngDrupalSettings.drupalSettings.path.baseUrl + requestUrl;
        }
      }
    }
  }

  /**
   *
   */
  updateChildLevelData(event, currentLevelBlock, availableChildData) {
    this.childLevelData = this.childData[currentLevelBlock.child];
    var temporaryData = [];
    var parentLevelValue = 0;

    parentLevelValue = currentLevelBlock.fieldId;
    while(this.parentChildSet[parentLevelValue]) {
      parentLevelValue = this.parentChildSet[parentLevelValue];
      this.totalResults[parentLevelValue] = '';
    }

    this.childLevelData.forEach(eachchildLevelData => {
      if (eachchildLevelData.parent.parentId == event.value) {
        temporaryData.push(eachchildLevelData);
      }
    });

    this.availableData[availableChildData] = temporaryData;
  }

  /**
   *
   */
  ngOnInit() {
    var temporaryBlockData;
    var blockReturnOtherValue;
    var temporaryQuestionData;

    this.formBasicInfo = this.ngFormcomponentData.formsBasicInfo;

    this.ngFormcomponentData.primengforms.forEach(eachBlock => {
      temporaryBlockData=null;
      blockReturnOtherValue=null;
      temporaryQuestionData=null;

      if ((typeof eachBlock.isChild !== 'undefined') && eachBlock.isChild) {
        this.childData[eachBlock.fieldLabel]= eachBlock.options;
      }

      if (eachBlock.child) {
        this.parentChildSet[eachBlock.fieldId] = eachBlock.childId;
      }

      this.totalResults[eachBlock.fieldId] = eachBlock.default;

      if (eachBlock.displayType){
        if (eachBlock.displayType == 'customtext' || eachBlock.displayType == "customhtml") {

        }
        else {
          console.log(eachBlock.displayType);
          if (eachBlock.isReactSet) {
            temporaryQuestionData = {
              "question_reactset_tid" : eachBlock.fieldId,
              "question_tid" : eachBlock.question_tid,
              "question_answer": ""
            }

            if (eachBlock.returnValue) {
              blockReturnOtherValue = eachBlock.returnValue;
              temporaryQuestionData = Object.assign(temporaryQuestionData, blockReturnOtherValue);
            }

            this.returnQuestionsResults.push(temporaryQuestionData);
          }
          else {
            temporaryBlockData = {
              "field_name": eachBlock.fieldId,
              "field_value": []
            };

            if (eachBlock.returnValue) {
              blockReturnOtherValue = eachBlock.returnValue;
              temporaryBlockData = Object.assign(temporaryBlockData, blockReturnOtherValue);
            }

            this.returnFormResults.push(temporaryBlockData);
          }
      }
    }

    });
  }

}
