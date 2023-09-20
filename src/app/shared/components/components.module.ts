import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonComponent } from './atoms/button/button.component';
import { UploadFileComponent } from './molecules/upload-file/upload-file.component';

@NgModule({
  declarations: [ButtonComponent, UploadFileComponent],
  imports: [BrowserModule],

  exports: [ButtonComponent, UploadFileComponent],
})
export class ComponentsModule {}
