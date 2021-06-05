import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookActionsService } from '../services/book-actions.service';
import { ReadingListItem } from '@tmo/shared/models';
@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(
    private snackBar: MatSnackBar,
    private bookActionsService: BookActionsService,
    private readonly store: Store) {}

  removeFromReadingList(item: ReadingListItem) {
    this.bookActionsService.removeFromReadingList(item);
    this.snackBar.open('Book successfully removed.', 'Undo', {
      duration: 4000,
    }).onAction().subscribe(() => {
      console.log('added back ?', item)
      this.bookActionsService.addBookToReadingList(item);
    });
  }
}
