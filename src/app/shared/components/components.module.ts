import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonComponent } from './atoms/button/button.component';
import { PinComponent } from './atoms/pin/pin.component';
import { UploadFileComponent } from './molecules/upload-file/upload-file.component';

@NgModule({
  declarations: [ButtonComponent, PinComponent, UploadFileComponent],
  imports: [BrowserModule],

  exports: [ButtonComponent, PinComponent, UploadFileComponent],
})
export class ComponentsModule {}
