import {Component, NgZone, OnInit} from '@angular/core';
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
  showFiller = true;
  selectedFiles: any[];
  clipboardContent: string;
  tabs: tab[];
  seleT: number;
  private zone: NgZone;
  copied = 'nov';


  constructor(private fileService: FileReadService, private clipboard: Clipboard, zone: NgZone) {
    this.zone = zone;
  }

  /***
   * mousedown action
   * first cell selected
   *
   *
   * @param n item
   * @param t  item's type
   */
  res(n: pair, t:boolean) {
    this.resultHex.forEach(a => {
      a.act = ''
    });
    this.startSel = n.pos;
    n.act = 'act';
    this.selecting = true;
  }

  /****
   * MouseUp event
   * filling clipboard with data
   * finalising selection
   *
   * @param nm last touched pair
   * @param t which side is touched 0=hex, 1=ascii
   */
  resu(nm: pair, t:boolean) {
    let tex = '';
    this.selecting = false;
    const sel = document.getSelection();
nm.act='act';

    this.resultHex.forEach(a => {
      const val= t ? a.ascii : a.hex;
      if(a.act === 'act'){
        tex += val + ' ';

      }
    });
    /***
     * style animation manipulation for clipboard
     *
     */
    this.copied='nov ad'

    this.zone.run(()=>{
        setTimeout(()=>{
          const w=1;
          this.copied=' nov';},2000);
}
      );


    this.clipboardContent = tex;
    this.clipboard.copy(tex);
    sel.removeAllRanges();
  }

  /***
   *
   * mouse over item
   * collect activated selected cells
   *
   *
   * @param nm
   */
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

  /***
   *
   * reading content of file
   *
   *
   * @param strns
   */
  read(strns) {
    const str = strns[0];
    const myArr = new Uint8Array(str.length);
    this.resultHex = [];
    myArr.forEach((n, i) => {
      if (str.charCodeAt(i) != 0) {

        let ghex=str.charCodeAt(i).toString(16);
        if (ghex.length ==1 ) ghex='0'.concat(ghex);
        this.resultHex.push({act: '', hex: ghex, pos: i, ascii: str[i]} as pair);
      } else {
        this.resultHex.push({act: '', hex: '00', pos: i, ascii: '.'} as pair);
 }
    });
    const nt = new tab();
    nt.name = strns[1];
    nt.resulthex = this.resultHex;
    /***
     *
     * add new tab with name of file
     *
     */
    this.tabs.push(nt);
    /***
     *
     * activate new tab
     *
     */
    this.seleT = this.tabs.length - 1;
  }


  ngOnInit(): void {
    this.seleT = 0;
    this.resultHex = [];
    this.hexaInp = '54 65 73 74 69 6e 67 20 68 65 78 20 63 6f 6d 70 6f 6e 65 6e 74 20 66 6f 72 20 63 6f 64 65 20 63 68 61 6c 6c 65 6e 67 65';
  /***

  reading first example file
   */

    this.fileService.readFile('assets/test.svg').subscribe(
      str => {

        const view = new Uint8Array(str);

        view.forEach((n, i) => {
          if (n !== 0) {
            let ghex=n.toString(16);
            if (ghex.length ==1 ) ghex='0'.concat(ghex);
            this.resultHex.push({act: '', hex: ghex, pos: i, ascii: String.fromCharCode(n)} as pair);
          } else {
            this.resultHex.push({act: '', hex: '00', pos: i, ascii: '.'} as pair);


          }

          //this.resultHex.push({act: '', hex:n.toString(16),pos:i,ascii:String.fromCharCode(n)} as pair);


        });
        /***
         *
         *
         * creating first tab
         */
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

  /****
   *
   * disabling selecting process
   *
   */
  mouseUp() {
    this.selecting = false;
  }

  selectTab(event: any) {
    this.resultHex = this.tabs[event.index].resulthex;
  }
}
