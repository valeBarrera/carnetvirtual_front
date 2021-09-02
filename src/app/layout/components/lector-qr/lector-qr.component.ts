import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.component.html',
  styleUrls: ['./lector-qr.component.css']
})
export class LectorQrComponent implements OnInit {

  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];

  @Input() scannerEnabled: boolean = false;

  @Output() usuarioId = new EventEmitter<number>();

  constructor() {
  }

  scan(event: any){
     this.usuarioId.emit(event);
  }

  ngOnInit(): void {
  }

}
