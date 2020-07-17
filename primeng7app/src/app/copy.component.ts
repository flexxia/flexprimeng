import { Table } from 'primeng/components/table/table';

export class CopyComponent {

  clipBoardArrayContent: any[];
  clipBoardArrayKey: any[];
  clipBoardStringContent: '';

  copyClipboard(copyContent) {
    this.clipBoardArrayContent = [];
    this.clipBoardArrayKey = [];
    this.clipBoardStringContent = '';

    if (copyContent.length > 0) {
      for (var i= 0; i < copyContent.length; i++) {

        // copyContent[i] = copyContent[i].replace(/<(.|\n)*?>/g, '');
        // this.clipBoardArrayContent = Object.values(copyContent[i]);
        // this.clipBoardArrayContent = Object.values(copyContent[i].exportData);

        this.clipBoardArrayKey = Object.keys(copyContent[i]);
        this.clipBoardArrayContent = Object.values(copyContent[i]);

        if (i == 0) {
          for (var j = 0; j < this.clipBoardArrayKey.length; j++) {
            if (this.clipBoardArrayKey[j] != 'tableBodyData') {
              this.clipBoardStringContent += this.clipBoardArrayKey[j];
              this.clipBoardStringContent += ",";
            }
          }
          this.clipBoardStringContent += '\n';
        }

        for (var j = 0; j < this.clipBoardArrayContent.length; j++) {
          if (this.clipBoardArrayKey[j] != 'tableBodyData') {
            this.clipBoardStringContent += this.clipBoardArrayContent[j];
            this.clipBoardStringContent += ",";
          }
        }
        this.clipBoardStringContent += '\n';
      }
    }

    return this.clipBoardStringContent;
  }

  copyMessage(val: any) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.copyClipboard(val);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);


    // var a = Table.prototype.exportCSV;
    // console.log(a);

  }
}