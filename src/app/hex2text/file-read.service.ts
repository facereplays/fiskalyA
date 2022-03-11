import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FileReadService {

  constructor(private http: HttpClient) { }

  readFile(file: string){
    return this.http.get(file, {responseType: "arraybuffer"});


  }
}
