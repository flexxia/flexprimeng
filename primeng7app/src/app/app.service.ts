import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NgDrupalSettings } from './app.ngdrupalsettings';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
  }

  getHero() {
    return "real hero";
  }

  /**
   *
   */
  getJsonFile(section) {
    // return this.http.get('./assets/data/testData.json');
    // return this.http.get('http://localhost:8888/emd/web/libraries/primeng7app/dist/angular7-primeng7-template/assets/data/test2.json');

    // return this.http.get('../../libraries/primengapp/dist/my-angular6/assets/data/chartData.json');
    // return this.http.get('http://localhost:8888/emd/web/ngjson/dashboard/page/1/2/3');
    // return this.http.get('http://localhost/novartis8/web/ngjson/dashboard/page/1/2/3');

    var ngDrupalSettings = new NgDrupalSettings();
    var pathArg = ngDrupalSettings.drupalSettings.path.currentPath.split('/');

    // var section = pathArg.slice(-5)[0].toLowerCase();
    // $type is 'page' or 'form'
    var type = pathArg.slice(-4)[0].toLowerCase();
    var entityId = pathArg.slice(-3)[0].toLowerCase();

    /**
     * for debug demo page
     http://localhost:8888/emd/web/ngpage/samplepage/page/all/1546318800/1573489660
     http://localhost:8888/emd/web/ngpage/sampleform/page/all/1546318800/1573489660
     */
    if (section == 'samplepage') {
      return this.http.get(ngDrupalSettings.drupalSettings.path.baseUrl + 'libraries/flexprimeng/primeng7app/src/assets/data/sample-page.json');
    }
    else if (section == 'sampleform') {
      return this.http.get(ngDrupalSettings.drupalSettings.path.baseUrl + 'libraries/flexprimeng/primeng7app/src/assets/data/sample-form.json');
    }
    else if (section == 'sampletable') {
      return this.http.get(ngDrupalSettings.drupalSettings.path.baseUrl + 'libraries/flexprimeng/primeng7app/src/assets/data/sample-table.json');
    }

    return this.http.get(ngDrupalSettings.drupalSettings.path.baseUrl + 'ngjson/' + section + '/' + type + '/'  + entityId + '/start/end');

  }


  /**
   *
   */
  httpNodePostJson(postUrl, jsonContent, csrfToken) {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
    });

    let options = { headers: headers };

    return this.http.post(postUrl, jsonContent, options);
  }

  /**
   *
    @todo define response type using an object with the "responseType" key
   */
  httpGetCsrfToken() {
    var ngDrupalSettings = new NgDrupalSettings();
    var tokenUrl = ngDrupalSettings.drupalSettings.path.baseUrl + 'rest/session/token';

    return this.http.get(tokenUrl, { responseType: 'text' });
  }

}


