import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { addToReadingList, init, loadReadingListSuccess, loadReadingListError, removeFromReadingList} from './reading-list.actions';
import { ReadingListItem } from '@tmo/shared/models';

export const READING_LIST_FEATURE_KEY = 'readingList';

export interface State extends EntityState<ReadingListItem> {
  loaded: boolean;
  error: null | string;
}

export interface ReadingListPartialState {
  readonly [READING_LIST_FEATURE_KEY]: State;
}

export const readingListAdapter: EntityAdapter<ReadingListItem> = createEntityAdapter<
  ReadingListItem
>({
  selectId: item => item.id
});

export const initialState: State = readingListAdapter.getInitialState({
  loaded: false,
  error: null
});

const readingListReducer = createReducer(
  initialState,
  on(init, state => {
    return {
      ...state,
      loaded: false,
      error: null
    };
  }),
  on(loadReadingListSuccess, (state, action) => {
    return readingListAdapter.setAll(action.list, {
      ...state,
      loaded: true
    });
  }),
  on(loadReadingListError, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(addToReadingList, (state, action) =>
    readingListAdapter.addOne({ id: action.book.id, ...action.book }, state)
  ),
  on(removeFromReadingList, (state, action) =>
    readingListAdapter.removeOne(action.item.id, state)
  )
);

export function reducer(state: State | undefined, action: Action) {
  return readingListReducer(state, action);
}
