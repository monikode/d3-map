import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  @Input() selectedImg: File | null = null;
  @Output() onSelectedImg = new EventEmitter<File>();

  onFileChanged(event: Event) {
    const target = event.target as HTMLInputElement
    const files = target.files as FileList;
    if (files.length > 0) {
      this.selectedImg = files[0];
      this.onSelectedImg.emit(this.selectedImg ?? undefined);
      
    }
  }
}
