import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BooksService } from 'src/app/services/books.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  books$!: Observable<any>;
  index: number = 0;
  bookFormGroup!: FormGroup;
  page=0;

  formFlag: any = {
    title: '',
    action: '',
  };
  pages!:number;
  constructor(
    private bookService: BooksService,
    private loadingService: LoadingService,
    private fb: FormBuilder
  ) {
    this.getBooks(0);
    this.bookFormGroup = this.fb.group({
      auteur: [''],
      titre: [''],
      nb_exemplaire: [''],
      url: [''],
    });
  }

  showBook(index: number) {
    this.index = index;
  }

  getBooks(pageNum:number) {
    this.books$ = this.bookService.getBooks(pageNum);
  }

  addBook() {
    this.loadingService.show('Adding Book...');
    let livre = this.bookFormGroup.value;
    let buttonCloseModal = document.getElementById(
      'buttonCloseModal'
    ) as HTMLElement;
    console.log(buttonCloseModal);

    if (livre.url == ''||livre.url==null)
      livre.url =
        'https://m.media-amazon.com/images/I/11cN6Drq6aL._SY264_BO1,204,203,200_QL40_ML2_.jpg';
    this.bookService.addBook(livre).subscribe({
      next: (data) => {
        console.log(data);
        buttonCloseModal?.click();
        this.getBooks(this.page);
        this.loadingService.close();
      },
      error: (err) => {
        console.log(err);
        this.loadingService.close();
      },
    });
  }

  editBook(id: number) {
    this.loadingService.show('Updating Book...');
    let livre = this.bookFormGroup.value;
    let buttonCloseModal = document.getElementById(
      'buttonCloseModal'
    ) as HTMLElement;
      console.log(livre)
    if (livre.url == ''||livre.url==null)
      livre.url =
        'https://m.media-amazon.com/images/I/11cN6Drq6aL._SY264_BO1,204,203,200_QL40_ML2_.jpg';
    this.bookService.updateBook(id, livre).subscribe({
      next: (data) => {
        console.log(data);
        buttonCloseModal?.click();
        this.getBooks(this.page);
        this.loadingService.close();
      },
      error: (err) => {
        console.log(err);
        this.loadingService.close();
      },
    });
  }

  deleteBook(book: any) {
    console.log(book);
    this.loadingService.show('Deleteing Book...');
    let id = book._links.self.href.split('/')[4];
    console.log(id);
    this.bookService.deleteBook(id).subscribe({
      next: (data) => {
        console.log(data);
        if (this.index > 0) this.index = this.index - 1;

        this.getBooks(this.page);
        this.loadingService.close();
      },
      error: (err) => {
        console.log(err);
        this.loadingService.close();
      },
    });
  }

  editBookModal(book: any) {
    this.formFlag.title = 'Edit Book';
    this.formFlag.action = 'editBook';
    this.bookFormGroup.setValue({
      auteur: book.auteur,
      titre: book.titre,
      nb_exemplaire: book.nb_exemplaire,
      url: book.url,
    });
    this.bookFormGroup.setValue({
      auteur: book.auteur,
      titre: book.titre,
      nb_exemplaire: book.nb_exemplaire,
      url: book.url,
    });
  }

  addBookModal() {
    this.formFlag.title = 'Add Book';
    this.formFlag.action = 'addBook';

    this.bookFormGroup.reset();
  }

  formSubmit(book: any) {
    let id = book._links.self.href.split('/')[4];
    if (this.formFlag.action == 'addBook') {
      this.addBook();
    } else {
      this.editBook(id);
    }
  }



  turnNumIntoArray(num:number){
    let list : number[]=[] ;
    for (let index = 0; index < num; index++) {
      list.push(index)
    }
    return list;
  }


  nextPage(){
    this.index=0;
    this.page=this.page+1
    console.log("page:",this.page)
    this.getBooks(this.page)
  }

  prevPage(){
    this.index=0;
    this.page=this.page-1
    console.log("page:",this.page)
    this.getBooks(this.page)
  }


  showPage(pageNum:number){
    this.index=0;
    this.page = pageNum;
    this.getBooks(pageNum)
  }
}
