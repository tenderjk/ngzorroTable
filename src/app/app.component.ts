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
  title = 'ngzorroTable'
  listOfData: Data[] = []
  listOfDisplayData: Data[]
  isAllDisplayDataChecked: boolean = false
  isIndeterminate: boolean = false
  mapOfCheckedId: { [key: string]: boolean } = {};
  pageSize = 10
  checkAll (value: boolean) {
    this.listOfDisplayData.forEach( (v, i, self) => {
      this.mapOfCheckedId[v.key] = value
    } )
    console.log(value)
    this.refreshStatus()
  }

  // currentPageDataChange($event) {
  //   console.log($event)
  //   this.listOfDisplayData = $event
  //   this.refreshStatus()
  // }

  refreshStatus () {
    console.log(this.mapOfCheckedId)
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(
      item => this.mapOfCheckedId[item.key]
    )
    this.isIndeterminate = this.listOfDisplayData.some(
      item => this.mapOfCheckedId[item.key]
    ) && !this.isAllDisplayDataChecked

  }

  pageChange (pageNum: number) {
    console.log(pageNum)
    this.listOfDisplayData = this.listOfData.slice((pageNum-1) * this.pageSize, pageNum * this.pageSize)
    console.log(this.listOfDisplayData)
    this.refreshStatus()
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
    this.pageChange(1)
    // this.listOfData = [
    //   {
    //     key: '1',
    //     name: 'John Brown',
    //     age: 32,
    //     address: 'New York No. 1 Lake Park'
    //   },
    //   {
    //     key: '2',
    //     name: 'Jim Green',
    //     age: 42,
    //     address: 'London No. 1 Lake Park'
    //   },
    //   {
    //     key: '3',
    //     name: 'Joe Black',
    //     age: 32,
    //     address: 'Sidney No. 1 Lake Park'
    //   },
    //   {
    //     key: '4',
    //     name: 'Joe Black',
    //     age: 32,
    //     address: 'Sidney No. 1 Lake Park'
    //   },
    //   {
    //     key: '5',
    //     name: 'Joe Black',
    //     age: 32,
    //     address: 'Sidney No. 1 Lake Park'
    //   },
    //   {
    //     key: '6',
    //     name: 'Joe Black',
    //     age: 32,
    //     address: 'Sidney No. 1 Lake Park'
    //   },{
    //     key: '7',
    //     name: 'Joe Black',
    //     age: 32,
    //     address: 'Sidney No. 1 Lake Park'
    //   }
    // ];
  }
  
}
