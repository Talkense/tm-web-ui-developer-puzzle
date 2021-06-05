import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, markFinished, unmarkFinished } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  removeFromReadingList(item: ReadingListItem) {
    const id = item.bookId;
    this.store.dispatch(removeFromReadingList({ item }));
    this.store.dispatch(unmarkFinished({ item }))
  }

  markAsFinished(evt, item) {
    console.log(evt.checked)
    if (evt.checked) {
      this.store.dispatch(markFinished({ item }))
    } else if (!evt.checked) {
      this.store.dispatch(unmarkFinished({ item }))
    }
  }
}
