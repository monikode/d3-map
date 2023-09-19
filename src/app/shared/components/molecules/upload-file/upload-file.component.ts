import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  @Input() selectedImg: File | null = null;
  @Output() onSelectedImg = new EventEmitter<File>();

  onFileChanged(event: any) {
    if (event.target.files.length > 0) {
      this.selectedImg = event.target.files[0];
      this.onSelectedImg.emit(this.selectedImg ?? undefined);
      
    }
  }
}
