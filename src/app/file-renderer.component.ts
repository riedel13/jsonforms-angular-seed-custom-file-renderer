import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {JsonFormsAngularService, JsonFormsControl} from '@jsonforms/angular';
import {FileService} from './file.service';

@Component({
  selector: 'app-file-renderer',
  template: `
        <div>Path: {{ path }} ID: {{ id }}</div>
        <div>
          <form fxFlex>
            <input
              *ngIf="data === ''; else uploadCompleted"
              type="file"
              (input)="uploadFile($event)"
              placeholder="{{ description }}"
              [id]="id"
              [formControl]="form"
            >
            <mat-label *ngIf="uploadProgress !== null">Upload in Progress: {{ uploadProgress }}%</mat-label>
            <ng-template #uploadCompleted>
              <img src="../assets/johannes_kepler.jpg" style="width: 250px"/>
              <br/>
              <mat-label>{{ data }}</mat-label>
            </ng-template>
          </form>
        </div>
    `
})
export class FileRendererComponent extends JsonFormsControl implements OnInit {

  file: File;
  uploadProgress: number = null;

  constructor(jsonFormsService: JsonFormsAngularService, private fileService: FileService, private changeDetector: ChangeDetectorRef) {
    super(jsonFormsService);

  }

  ngOnInit() {
    super.ngOnInit();
  }

  getEventValue = (event: any) => event;

  uploadFile(event) {
    this.file = event.target.files[0];
    console.error(this.file);
    this.fileService.uploadFile(this.file).subscribe(
      progress => {
        this.uploadProgress = progress;
        this.changeDetector.detectChanges();
      },
      () => {},
      () => {
        this.onChange('http://mydomain.net/' + this.file.name);
        this.uploadProgress = null;
        this.changeDetector.detectChanges();
      }
    );
  }
}


