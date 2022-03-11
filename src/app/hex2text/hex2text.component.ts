import {Component, OnInit} from '@angular/core';
import {FileReadService} from "./file-read.service";
import { Clipboard } from '@angular/cdk/clipboard';
import {HttpEventType, HttpResponse} from "@angular/common/http";


class pair {
  hex:string;
  ascii: string;
  pos: number;
  act: string;
}

@Component({
  selector: 'app-hex2text',
  templateUrl: './hex2text.component.html',
  styleUrls: ['./hex2text.component.css']
})
export class Hex2textComponent implements OnInit {
  public hexaInp: string;
  public asciiRes: string;
  public hexaRes: string;
  public asciiInp: string;
public resultHex: pair[];
selecting = false;
startSel:number;
  endSel:number;
  showFiller=false;
  selectedFiles: any[];

  constructor(private fileService:FileReadService,private clipboard: Clipboard) {
  }
res(n: pair){
    this.resultHex.forEach(a=>{a.act=''});
this.startSel=n.pos;
  n.act='act';
  this.selecting= true;
}

  resu(nm) {
    this.selecting= false;
    const sel = document.getSelection();
    if(nm.pos>this.startSel){
      this.endSel=nm.pos;

    }else{
      this.endSel=this.startSel;
      this.startSel=nm.pos;
    }
   for(let i = this.startSel;i<=this.endSel;i++){
     this.resultHex[i].act='act';
    // console.log(i);
   }
    this.clipboard.copy('dsfsdf');
    sel.removeAllRanges();
  }
  mOver(nm){
    if(this.selecting){
      nm.act='act';

    }

  }
  resv(n){
   // console.log(n);

  }
  ngOnInit(): void {
    this.resultHex=[];
    this.hexaInp = '54 65 73 74 69 6e 67 20 68 65 78 20 63 6f 6d 70 6f 6e 65 6e 74 20 66 6f 72 20 63 6f 64 65 20 63 68 61 6c 6c 65 6e 67 65';
this.fileService.readFile('assets/binary1.bin').subscribe(
  str=>{
    console.log(str);
    /*   const myArr = new Uint8Array(str.length);
  myArr.forEach((n,i)=>{
    console.log("Index value: "+ i +" has a byte code of: " + str.charCodeAt(i) + " for the char: " + str.charAt(i));
    this.resultHex.push({act: '', hex:str.charCodeAt(i).toString(16),pos:i,ascii:str.charAt(i)} as pair);

  });
 */
    const view = new Uint8Array(str);

     view.forEach((n,i)=>{
 this.resultHex.push({act: '', hex:n.toString(16),pos:i,ascii:String.fromCharCode(n)} as pair);
       console.log(i,n);

     });
    // contr=btoa(str0);
    /*

     for(var i = 0; i < Object.keys(str).length; i++){


       //console.log("Index value: "+ i +" has a byte code of: " + str.charCodeAt(i) + " for the char: " + str.charAt(i))
       myArr[i] = str.charCodeAt(i);
     }
 */



  }

);
  }




  hex_to_ascii(str1: string): string {
    const hex = str1.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 3) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }



}
