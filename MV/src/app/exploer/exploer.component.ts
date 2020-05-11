import { Component, Input, OnDestroy } from '@angular/core';

enum MediaType {
  IMG,
  VIDEO
}

@Component({
  selector: 'app-exploer',
  templateUrl: './exploer.component.html',
  styleUrls: ['./exploer.component.css']
})
export class ExploerComponent implements OnDestroy {

  @Input()
  set UrlList(urlList) {
    if (!Array.isArray(urlList) || urlList.length === 0) { return; }
    const reg = /^.*\.(.*)$/;
    const parsedUrlList = urlList
      .map(url => {
        const split = reg.exec(url);
        if (!split || !split[1]) {
          console.warn('Wrong format', url);
          return null;
        }
        const suFix = split[1];
        if (
          suFix === 'mp4' ||
          suFix === 'webm'
        ) {
          return {
            url,
            type: MediaType.VIDEO,
            scale: 1
          };
        } else if (
          suFix === 'jpeg' ||
          suFix === 'jpg' ||
          suFix === 'png' ||
          suFix === 'webp' ||
          suFix === 'gif' ||
          suFix === 'jpg_small' ||
          suFix === 'jpg_medium' ||
          suFix === 'jpg_large'
        ) {
          return {
            url,
            type: MediaType.IMG,
            scale: 1
          };
        } else {
          console.warn('Wrong type', url);
          return null;
        }
      })
      .filter(val => val);
    this.Pointer = 0;
    this._UrlList = parsedUrlList;
  }
  // tslint:disable-next-line: variable-name
  _UrlList = [];
  Pointer = 0;
  Show = false;
  Playing = false;
  TimerDestructor = null;
  MediaType = MediaType;

  constructor() { }

  ngOnDestroy() {
    this.stop();
  }

  shift(shift: number) {
    const p = (this.Pointer + shift) % this._UrlList.length;
    this.Pointer = (p < 0) ? this._UrlList.length - 1 : p;
  }
  scale(scale: number) {
    this._UrlList[this.Pointer].scale += scale;
  }
  play() {
    this.TimerDestructor = window.setInterval(() => {
      this.shift(1);
    }, 2500);
    this.Playing = true;
  }
  stop() {
    if (this.TimerDestructor) {
      window.clearInterval(this.TimerDestructor);
    }
    this.Playing = false;
  }
}
