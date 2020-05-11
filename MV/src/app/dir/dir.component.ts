import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ExploerComponent } from '../exploer/exploer.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dir',
  templateUrl: './dir.component.html',
  styleUrls: ['./dir.component.css']
})
export class DirComponent implements OnInit {
  @ViewChild('exp') ExploerComponent: ExploerComponent;

  @Input() Dir;
  @Input() Open = false;
  Recursive = true;

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.ExploerComponent.UrlList = this.getUlrFromSchema(this.Dir.data, this.Dir.url);
    this.ExploerComponent.Show = true;
  }

  private getUlrFromSchema(schema, url) {
    let subUrlList = schema.file
      .map(fileName => {
        return environment.MediaApiRoute + url + '/' + fileName;
      });
    if (this.Recursive) {
      Object.getOwnPropertyNames(schema.dir)
      .forEach(dirName => {
        const dirList = this.getUlrFromSchema(schema.dir[dirName], url + '/' + dirName);
        subUrlList = subUrlList.concat(dirList);
      });
    }
    return subUrlList;
  }

}
