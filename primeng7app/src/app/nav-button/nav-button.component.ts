import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgDrupalSettings } from './../app.ngdrupalsettings';

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavButtonComponent implements OnInit {

	@Input('displayNavButton') displayNavButton: boolean;

  constructor() { }

  replaceurl(redirectUrl) {
    var ngDrupalSettings = new NgDrupalSettings();
    var current = ngDrupalSettings.drupalSettings.path.currentPath;
    console.log("redirectUrl");
    console.log(ngDrupalSettings.drupalSettings.path.baseUrl);
    var resulturl = ngDrupalSettings.drupalSettings.path.baseUrl + 'ngpage' + redirectUrl + '/page/all/';
    console.log(resulturl);

    location.replace(resulturl);
    // window.location = resulturl;
  }

  ngOnInit() {
  }

}
