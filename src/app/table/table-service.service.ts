import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class TableServiceService {

  constructor(
    private http: HttpClient
  ) { }
  getData(url: string, pageIndex: number, pageSize: number) {
    let fullUrl = `${url}/pageindex/${pageIndex}/pagesize/${pageSize}`
    return this.http.get(fullUrl)
  }
  delData(url: string, id: number|number[]) {
    let fullUrl = `${url}/${id}`
    return this.http.delete(fullUrl)
  }
  insertData(url: string, data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(url, data, httpOptions)
  }
  updData(url: string, data:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.put(url, data, httpOptions)
  }
}
