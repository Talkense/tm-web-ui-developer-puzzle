import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const init = createAction('[Reading List] Initialize');

export const loadReadingListSuccess = createAction(
  '[Reading List API] Load list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListError = createAction(
  '[Reading List API] Load list error',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Books Search Results] Add to list',
  props<{ book: Book }>()
);

export const failedAddToReadingList = createAction(
  '[Reading List API] Failed add to list',
  props<{ book: Book }>()
);

export const confirmedAddToReadingList = createAction(
  '[Reading List API] Confirmed add to list',
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  '[Books Search Results] Remove from list',
  props<{ item: ReadingListItem }>()
);

export const failedRemoveFromReadingList = createAction(
  '[Reading List API] Failed remove from list',
  props<{ item: ReadingListItem }>()
);

export const confirmedRemoveFromReadingList = createAction(
  '[Reading List API] Confirmed remove from list',
  props<{ item: ReadingListItem }>()
);

export const markFinished = createAction(
  '[Reading List] Add to finished reading list',
  props<{ item: ReadingListItem }>()
);

export const failedtoMarkFinished = createAction(
  '[Reading List] Failed add to finished reading list',
  props<{ item: ReadingListItem }>()
);

export const confirmedMarkedAsFinished = createAction(
  '[Reading List] Confirmed add to finished reading list',
  props<{ item: ReadingListItem }>()
);

export const unmarkFinished = createAction(
  '[Reading List] Remove from finished reading list',
  props<{ item: ReadingListItem }>()
);

export const failedtoUnmarkFinished = createAction(
  '[Reading List] Failed to remove from finished reading list',
  props<{ item: ReadingListItem }>()
);

export const confirmedUnmarkedAsFinished = createAction(
  '[Reading List] Confirmed removing from finished reading list',
  props<{ item: ReadingListItem }>()
); 
