import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map,  } from 'rxjs/operators';
import { ReadingListItem } from '@tmo/shared/models';
import { confirmedUnmarkedAsFinished, failedtoUnmarkFinished, unmarkFinished, failedtoMarkFinished, confirmedMarkedAsFinished, markFinished, init, loadReadingListSuccess, loadReadingListError, addToReadingList, confirmedAddToReadingList, failedAddToReadingList, removeFromReadingList, confirmedRemoveFromReadingList, failedRemoveFromReadingList} from './reading-list.actions';
@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => confirmedAddToReadingList({ book })),
          catchError(() =>
            of(failedAddToReadingList({ book }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromReadingList),
      concatMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() =>
            confirmedRemoveFromReadingList({ item })
          ),
          catchError(() =>
            of(failedRemoveFromReadingList({ item }))
          )
        )
      )
    )
  );

  markFinishedBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(markFinished),
      optimisticUpdate({
        run: ({ item }) => {
          return this.http.put(`/api/reading-list/${item.bookId}/finished`, item).pipe(
            map(() =>
              confirmedMarkedAsFinished({
                item
              })
            )
          );
        },
        undoAction: ({ item }) => {
          return failedtoMarkFinished({
            item
          });
        }
      })
    )
  );

  unmarkFinishedBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unmarkFinished),
      optimisticUpdate({
        run: ({ item }) => {
          return this.http.delete(`/api/reading-list/${item.bookId}/finished`).pipe(
            map(() =>
              confirmedUnmarkedAsFinished({
                item
              })
            )
          );
        },
        undoAction: ({ item }) => {
          return failedtoUnmarkFinished({
            item
          });
        }
      })
    )
  );

  ngrxOnInitEffects() {
    return init();
  }

  constructor(private actions$: Actions, private http: HttpClient) {}
}
