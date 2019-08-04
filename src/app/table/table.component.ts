import { Component, OnInit, Input } from '@angular/core';
import { TableServiceService } from './table-service.service'
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AddDataModalComponent } from './add-data-modal/add-data-modal.component';
export interface Data {
  id: number, name: string,age: number,address:string
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TableServiceService]
})
export class TableComponent implements OnInit {
  @Input() pageIndex:number
  @Input() pageSize:number
  @Input() getUrl:string
  @Input() delUrl:string
  @Input() primaryKey:string
  @Input() hideKey:boolean
  @Input() autoPrimaryKey:boolean
  @Input() insUrl:string
  @Input() updUrl:string
  constructor(
    private service: TableServiceService,
    private modalService: NzModalService,
    private nzMessageService: NzMessageService
  ) { }
  title = 'ngzorroTable'
  totalDataNum: number
  listOfData: Data[] = []
  listOfDisplayData: Data[]
  isAllDisplayDataChecked: boolean = false
  isIndeterminate: boolean = false
  mapOfCheckedId: { [key: string]: boolean } = {};
  tableCaptions = []
  editCache:any = {}
  delSwitchValue: boolean = false
  // pageSize: number = 10
  // pageIndex: number = 1
  // getUrl: string = `http://127.0.0.1:5000/getdata/pageindex/${this.pageIndex}/pagesize/${this.pageSize}`
  showModal () {
    let tableCaptionsCopy = [...this.tableCaptions]
    if (this.autoPrimaryKey) {
      tableCaptionsCopy.splice(this.tableCaptions.indexOf(this.primaryKey), 1)
      // this.tableCaptions.indexOf(this.primaryKey)
    }
    this.modalService.create({
      nzTitle: '添加数据',
      nzContent: AddDataModalComponent,
      nzComponentParams:{
        columns: tableCaptionsCopy,
        insertUrl: this.insUrl
      }
    });
  }
  checkAll (value: boolean) {
    this.listOfDisplayData.forEach((v, i, self) => {
      this.mapOfCheckedId[v.id] = value
    })
    console.log(value)
    this.refreshStatus()
  }
  // currentPageDataChange($event) {
  //   console.log($event)
  //   this.listOfDisplayData = $event
  //   this.refreshStatus()
  // }

  cancelDel () {
    console.log('cancel')
  }

  confirmDel ( id: number ) {
    console.log(id)
    this.service.delData(this.delUrl, id).subscribe((res: any) => {
      if(res.code === 0) {
        let oldPageNum = Math.ceil(this.totalDataNum/this.pageSize)
        this.refreshStatus()
        this.totalDataNum = res.count
        let newPageNum = Math.ceil(this.totalDataNum/this.pageSize)
        console.log(oldPageNum, newPageNum, this.totalDataNum)
        if (this.pageIndex === oldPageNum && oldPageNum !== newPageNum) {
          if (this.pageIndex !== 1) {
            --this.pageIndex
          }
        }
        this.initData()
      }
    })
  }

  refreshStatus () {
    console.log(this.mapOfCheckedId)
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(
      item => this.mapOfCheckedId[item[this.primaryKey]]
    )
    this.isIndeterminate = this.listOfDisplayData.some(
      item => this.mapOfCheckedId[item[this.primaryKey]]
    ) && !this.isAllDisplayDataChecked

  }

  initData () {
    this.service.getData(this.getUrl, this.pageIndex, this.pageSize).subscribe((res:any) => {
      console.log(res)
      if (res.code === 0) {
        this.listOfDisplayData = res.data
        this.totalDataNum = res.count
        this.updateCacheEdit()
        this.refreshStatus()
      } 
    })
  }
  updateCacheEdit () {
    this.listOfDisplayData.forEach(item => {
      this.editCache[item[this.primaryKey]] = {
        edit: false,
        data: { ...item }
      }
    })
  }
  pageChange (pageNum: number) {
    this.pageIndex = pageNum
    console.log(pageNum)
    // this.service.getData(this.getUrl, this.pageIndex, this.pageSize).subscribe((res:any) => {
    //   if (res.code === 0) {
    //     this.listOfDisplayData = res.data
    //     this.totalDataNum = res.count
    //   }
    // })
    this.initData()
    // this.refreshStatus() 
  }

  pageDataChange () {

  }
  pageSizeChange (num:number) {
    this.pageSize = num
    // this.service.getData(this.getUrl, this.pageIndex, this.pageSize).subscribe((res:any) => {
    //   if (res.code === 0) {
    //     this.listOfDisplayData = res.data
    //     this.totalDataNum = res.count
    //   }
    // })
    this.initData()
  }

  startEdit (id) {
    console.log(id)
    console.log(this.editCache)
    this.editCache[id].edit = true
  }

  endEdit (id):void {
    console.log('endEdit',id)
    console.log(this.editCache)
    let index:number = this.listOfDisplayData.findIndex(item => item[this.primaryKey] === id)
    this.service.updData(this.updUrl, this.editCache[id].data).subscribe((res:any) => {
      if (res.code === 0) {
        Object.assign(this.listOfDisplayData[index],this.editCache[id].data)
        this.editCache[id].edit = false
      }
    }) 
  }

  cancelEdit (id) {
    console.log('cancel', id)
    console.log(this.editCache)
    let index:number = this.listOfDisplayData.findIndex(item => item[this.primaryKey] === id)
    this.editCache[id].data = this.listOfDisplayData[index]
    this.editCache[id].edit = false
  }

  delSomeconfirm() {
    let CheckedIdArr = Object.keys(this.mapOfCheckedId).filter((v) => 
      this.mapOfCheckedId[v] === true
    )
    if (CheckedIdArr.length > 0) {

    } else {
      this.nzMessageService.info('click confirm');
    }
    console.log(CheckedIdArr)
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.service.getData(this.getUrl, this.pageIndex, this.pageSize).subscribe(
      (res:any) => {
        console.log(res)
        if (res.code === 0) {
          let firstData = res.data[0]
          this.tableCaptions = Object.keys(firstData)
          this.listOfDisplayData = res.data
          this.totalDataNum = res.count
          this.updateCacheEdit()
          console.log(this.editCache)
        }
      }
    )
    // this.pageChange(1)
  }
  ngOnChanges() {
    
  }

}
