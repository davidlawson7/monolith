import { Component } from '@angular/core';
import { UploaderService } from './uploader.service';

class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'ui-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  providers: [UploaderService],
})
export class UploaderComponent {
  selectedFile!: ImageSnippet;

  constructor(private imageService: UploaderService) {}

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          console.log('success', res);
        },
        (err) => {
          console.log('failure', err);
        }
      );
    });

    reader.readAsDataURL(file);
  }
}
