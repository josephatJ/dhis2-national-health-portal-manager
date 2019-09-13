import { createSelector } from "@ngrx/store";
import { getRootState, State } from "../reducers";
import { adapter } from "../reducers/publish-page.reducer";

export const getPageInfoState = createSelector(
  getRootState,
  (state: State) => state.pagesInfo
);

export const {
  selectEntities: getPageInfoEntities,
  selectAll: getAllPages
} = adapter.getSelectors(getPageInfoState);
