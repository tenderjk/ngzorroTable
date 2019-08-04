import { Component } from '@angular/core';

export interface Data {
  key: number, name: string,age: number,address:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'ngzorroTable'
  // listOfData: Data[] = []
  // listOfDisplayData: Data[]
  // isAllDisplayDataChecked: boolean = false
  // isIndeterminate: boolean = false
  // mapOfCheckedId: { [key: string]: boolean } = {};
  // pageSize: number = 10
  // pageIndex: number = 1
  // getUrl: string = `http://127.0.0.1:5000/getdata/pageindex/${this.pageIndex}/pagesize/${this.pageSize}`
  // checkAll (value: boolean) {
  //   this.listOfDisplayData.forEach( (v, i, self) => {
  //     this.mapOfCheckedId[v.key] = value
  //   } )
  //   console.log(value)
  //   this.refreshStatus()
  // }

  // currentPageDataChange($event) {
  //   console.log($event)
  //   this.listOfDisplayData = $event
  //   this.refreshStatus()
  // }

  // cancelDel () {
  //   console.log('cancel')
  // }

  // confirmDel ( id: number ) {
  //   console.log(id)
  //   this.listOfData.splice(id, 1)
  //   this.listOfDisplayData = this.listOfData.slice((this.pageIndex-1) * this.pageSize, this.pageIndex * this.pageSize)
  //   console.log(this.pageIndex)
  //   console.log('未删除', this.mapOfCheckedId)
  //   delete this.mapOfCheckedId[id]
  //   console.log('删除', this.mapOfCheckedId)
  //   this.refreshStatus()
  // }

  // refreshStatus () {
  //   console.log(this.mapOfCheckedId)
  //   this.isAllDisplayDataChecked = this.listOfDisplayData.every(
  //     item => this.mapOfCheckedId[item.key]
  //   )
  //   this.isIndeterminate = this.listOfDisplayData.some(
  //     item => this.mapOfCheckedId[item.key]
  //   ) && !this.isAllDisplayDataChecked

  // }

  // pageChange (pageNum: number) {
  //   console.log(pageNum)
  //   this.listOfDisplayData = this.listOfData.slice((pageNum-1) * this.pageSize, pageNum * this.pageSize)
  //   console.log(this.listOfDisplayData)
  //   this.refreshStatus()
  //   this.pageIndex = pageNum
  // }

  // pageDataChange() {

  // }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // for (let i = 0; i < 100; i++) {
    //   this.listOfData.push({
    //     key: i,
    //     name: `Edward King ${i}`,
    //     age: 32,
    //     address: `London, Park Lane no. ${i}`,
    //   });
    // }
    // this.pageChange(1)
  }
  
}
