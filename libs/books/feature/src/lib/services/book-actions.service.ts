import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';

@Injectable({
  providedIn: 'root'
})
export class BookActionsService {

  constructor(private readonly store: Store) { }

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }
}