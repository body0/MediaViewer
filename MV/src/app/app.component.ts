import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  Schema;

  constructor(private http: HttpClient) {
    http.get(environment.ApiRoute + '/getDirStructure')
      .toPromise()
      .then(pld => {
        this.Schema = pld;
      });
  }
}
