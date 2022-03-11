import {Component, OnInit} from '@angular/core';
import {FileReadService} from "./file-read.service";
import {Clipboard} from '@angular/cdk/clipboard';

class tab {
  resulthex: pair[];
  name: string;
}

class pair {
  hex: string;
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
  startSel: number;
  endSel: number;
  showFiller = false;
  selectedFiles: any[];
  clipboardContent: string;
  tabs: tab[];
  seleT: number;

  constructor(private fileService: FileReadService, private clipboard: Clipboard) {
  }

  res(n: pair) {
    this.resultHex.forEach(a => {
      a.act = ''
    });
    this.startSel = n.pos;
    n.act = 'act';
    this.selecting = true;
  }

  resu(nm) {
    let tex = '';
    this.selecting = false;
    const sel = document.getSelection();
    if (nm.pos > this.startSel) {
      this.endSel = nm.pos;

    } else {
      this.endSel = this.startSel;
      this.startSel = nm.pos;
    }
    for (let i = this.startSel; i <= this.endSel; i++) {
      this.resultHex[i].act = 'act';
      tex += this.resultHex[i].hex + ' ';
      // console.log(i);
    }
    let element: HTMLElement = document.getElementById('trigger') as HTMLElement;
    element.click();
    this.clipboardContent = tex;
    this.clipboard.copy(tex);
    sel.removeAllRanges();
  }

  mOver(nm) {
    if (this.selecting) {
      nm.act = 'act';
      if (nm.pos > this.startSel) {
        this.endSel = nm.pos;

      } else {
        this.endSel = this.startSel;
        this.startSel = nm.pos;
      }
      for (let i = this.startSel; i <= this.endSel; i++) {
        this.resultHex[i].act = 'act';

      }


    }

  }

  read(strns) {
    const str = strns[0];
    const myArr = new Uint8Array(str.length);
    this.resultHex = [];
    myArr.forEach((n, i) => {
      if (str.charCodeAt(i) != 0) {
        this.resultHex.push({act: '', hex: str.charCodeAt(i).toString(16), pos: i, ascii: str[i]} as pair);
      } else {
        this.resultHex.push({act: '', hex: '00', pos: i, ascii: '.'} as pair);


      }
    });
    const nt = new tab();
    nt.name = strns[1];
    nt.resulthex = this.resultHex;
    this.tabs.push(nt);
    this.seleT = this.tabs.length - 1;
  }

  resv(n) {
    // console.log(n);

  }

  ngOnInit(): void {
    this.seleT = 0;
    this.resultHex = [];
    this.hexaInp = '54 65 73 74 69 6e 67 20 68 65 78 20 63 6f 6d 70 6f 6e 65 6e 74 20 66 6f 72 20 63 6f 64 65 20 63 68 61 6c 6c 65 6e 67 65';
    this.fileService.readFile('assets/test.svg').subscribe(
      str => {

        const view = new Uint8Array(str);

        view.forEach((n, i) => {
          if (n !== 0) {
            this.resultHex.push({act: '', hex: n.toString(16), pos: i, ascii: String.fromCharCode(n)} as pair);
          } else {
            this.resultHex.push({act: '', hex: '00', pos: i, ascii: '.'} as pair);


          }

          //this.resultHex.push({act: '', hex:n.toString(16),pos:i,ascii:String.fromCharCode(n)} as pair);


        });
        this.tabs = [{name: 'test.svg', resulthex: this.resultHex} as tab];


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


  mouseUp() {
    this.selecting = false;
  }

  selectTab(event: any) {
    this.resultHex = this.tabs[event.index].resulthex;
  }
}
