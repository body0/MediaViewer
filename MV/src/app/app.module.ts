import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DirComponent } from './dir/dir.component';
import { ExploerComponent } from './exploer/exploer.component';

@Pipe({name: 'getOwnPropery'})
export class GetOwnProperyPipe implements PipeTransform {
  transform(value: object): string[] {
    return Object.getOwnPropertyNames(value);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    DirComponent,
    GetOwnProperyPipe,
    ExploerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
