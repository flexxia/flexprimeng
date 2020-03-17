import { Table } from 'primeng/components/table/table';

export class CopyComponent {

  clipBoardArrayContent: any[];
  clipBoardStringContent: '';

  copyClipboard(copyContent) {
    this.clipBoardArrayContent = [];
    this.clipBoardStringContent = '';

    if (copyContent.length > 0) {
      for (var i= 0; i < copyContent.length; i++) {
        if (i == 0) {
          if (copyContent[i].exportData == undefined) {
            this.clipBoardArrayContent = Object.keys(copyContent[i]);
          }
          else {
            this.clipBoardArrayContent = Object.keys(copyContent[i].exportData);
          }

          this.clipBoardStringContent += this.clipBoardArrayContent.join('\t');
          this.clipBoardStringContent += '\n';
        }
        // copyContent[i] = copyContent[i].replace(/<(.|\n)*?>/g, '');
        // this.clipBoardArrayContent = Object.values(copyContent[i]);
        // this.clipBoardArrayContent = Object.values(copyContent[i].exportData);

        if (copyContent[i].exportData == undefined) {
          this.clipBoardArrayContent = Object.values(copyContent[i]);
        }
        else {
          this.clipBoardArrayContent = Object.values(copyContent[i].exportData);
        }

        this.clipBoardStringContent += this.clipBoardArrayContent.join('\t');
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