import { createReducer, on } from "@ngrx/store";
import { initialBaseState, loadedBaseState } from "../states/base.state";
import {
  addPage,
  postResultMessage,
  loadKeysForPublishedPages,
  addLoadedPage
} from "../actions";
import { PageState } from "../states/page.state";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialPageState = adapter.getInitialState({
  ...initialBaseState,
  message: null
});
export const reducer = createReducer(
  initialPageState,
  on(addPage, state => {
    return {
      ...state
    };
  }),
  on(postResultMessage, (state, { message }) => ({
    ...state,
    ...loadedBaseState,
    message
  })),
  on(loadKeysForPublishedPages, state => {
    return {
      ...state,
      message: state.message
    };
  }),
  on(addLoadedPage, (state, { loadedPage }) =>
    adapter.addOne(loadedPage, {
      ...state,
      ...loadedBaseState
    })
  )
);

export function addPageReducer(state, action): PageState {
  return reducer(state, action);
}
