import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/app/env';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private url: string = env.url;
  constructor(private http: HttpClient) {}

  getBooks(pageNum:number) {
    // let headers = new HttpHeaders();
    // headers = headers.set('sessionId', '2213c480-71b5-44af-9815-c080fe506cfe');
    return this.http.get(`${this.url}livres?size=5&page=${pageNum}`);
  }

  addBook(book: any) {
    return this.http.post(`${this.url}livres`, book);
  }

  deleteBook(code: number) {
    return this.http.delete(`${this.url}livres/${code}`);
  }

  updateBook(code: number, book: any) {
    return this.http.put(`${this.url}livres/${code}`, book);
  }
}
