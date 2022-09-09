import { Injectable } from '@angular/core';
import {timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  uploadFile(file: File) {
    const result$ = timer(10000);
    return timer(0, 100).pipe(takeUntil(result$));
  }
}
