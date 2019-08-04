import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { TableServiceService } from '../table-service.service'
@Component({
  selector: 'app-add-data-modal',
  templateUrl: './add-data-modal.component.html',
  styleUrls: ['./add-data-modal.component.scss'],
  providers: [TableServiceService]
})
export class AddDataModalComponent implements OnInit {
  @Input() columns
  @Input() insertUrl: string
  modalData: any = {}
  constructor(
    private modal: NzModalRef,
    private service: TableServiceService
  ) { }
  destroyModal(): void {
    this.modal.destroy();
  }
  sendaData ():void {
    this.service.insertData(this.insertUrl, this.modalData).subscribe((res:any) => {
      if (res.code === 0) {
        this.modal.destroy();
      }
    })
    console.log(this.modalData)
  }

  ngOnInit() {
    // this.columns.forEach(element => {
    //   this.modalData[element] = null
    // });
  }

}
