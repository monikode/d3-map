import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonComponent } from './shared/components/atoms/button/button.component';
import { PinComponent } from './shared/components/atoms/pin/pin.component';
import { UploadFileComponent } from './shared/components/molecules/upload-file/upload-file.component';
import { ComponentsModule } from './shared/components/components.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
