import {Component, EventEmitter, NgZone, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {FileReadService} from "../hex2text/file-read.service";


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  private zone: NgZone;
  fileInfos?: Observable<any>;
  @Output()
  onLoadF = new EventEmitter<string[]>();

    constructor(private uploadService: FileReadService,zone: NgZone) {
      this.zone = zone;


    }

  ngOnInit(): void { }
    selectFile(event: any): void {
      this.selectedFiles = event.target.files;
      this.upload();
    }
rea(file){

  this.currentFile = file;
  const myReader: FileReader = new FileReader();

myReader.onload = () => {

this.onLoadF.emit([myReader.result as string,file.name]);

  }
  myReader.readAsBinaryString(file);

  this.selectedFiles = undefined;

}

    upload(): void {
      this.progress = 0;
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
        if (file) {
          this.zone.run(
            () => {


              this.rea( file );

            }
          );
        }
      }
  }


}
