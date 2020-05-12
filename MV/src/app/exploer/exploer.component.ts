import { Component, Input, OnDestroy, HostListener } from '@angular/core';

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
  TimerInterval = 2500;
  TimerDestructor = null;
  MediaType = MediaType;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.Show) { return; }
    if (event.code === 'Escape') {
      this.Show = false;
    } else if (event.code === 'ArrowRight' || event.code === 'KeyD') {
      this.shift(1);
    } else if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
      this.shift(-1);
    } else if (event.code === 'KeyE') {
      this.shift(10);
    } else if (event.code === 'KeyR') {
      this.Pointer = 0;
    } else if (event.code === 'Space') {
      if (this.Playing) {
        this.stop();
      } else {
        this.play();
      }
    } else if (event.code === 'KeyF') {
      if (this._UrlList[this.Pointer].scale === 1) {
        this._UrlList[this.Pointer].scale = 100;
      } else {
        this._UrlList[this.Pointer].scale = 1;
      }
    }
  }
  constructor() { }

  ngOnDestroy() {
    this.stop();
  }

  shift(shift: number) {
    const p = (this.Pointer + shift) % this._UrlList.length;
    this.Pointer = (p < 0) ? this._UrlList.length - 1 : p;
  }
  onMouseWheel(event) {
    const move = (event.wheelDeltaY > 0) ? -1 : 1;
    if (event.altKey) {
      this.scale(move * 0.25);
    } else if (!event.shiftKey) {
      this.shift(move);
    }
  }

  scale(scale: number) {
    this._UrlList[this.Pointer].scale += scale;
  }

  play() {
    this.TimerDestructor = window.setInterval(() => {
      this.shift(1);
    }, this.TimerInterval);
    this.Playing = true;
  }
  stop() {
    if (this.TimerDestructor) {
      window.clearInterval(this.TimerDestructor);
    }
    this.Playing = false;
  }
}
