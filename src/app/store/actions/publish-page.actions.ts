import { createAction, props } from "@ngrx/store";
import { PageContents, ErrorMessage } from "src/app/core";

export enum PublishPageActionTypes {
  AddPage = "[Publish page] add program page",
  PostResultMessage = "[Publish page] message",
  LoadKeysForPublishedPages = "[Publish page] load keys for published pages",
  LoadPublishedPageByKey = "[Publish page] load published pages",
  AddLoadedPage = "[Publish page] add loaded page",
  DeletePage = "[Publish page] delete page",
  AddPageFail = "[Publish page] add page fail",
  DeletePageFail = "[Publish page] delete page fail",
  LoadPageFail = "[Publish page] load page fail",
  AddLoadedPageFail = "[Publish page] adding loaded page fail"
}

export const addPage = createAction(
  "[Publish page] add program page",
  props<{ pageContents: PageContents; typeOfAction: string }>()
);

export const postResultMessage = createAction(
  "[Publish page] message",
  props<{ message: any }>()
);

export const loadKeysForPublishedPages = createAction(
  "[Publish page] load keys for published pages"
);

export const loadPublishedPageByKey = createAction(
  "[Publish page] load published pages",
  props<{ key: string }>()
);

export const addLoadedPage = createAction(
  "[Publish page] add loaded page",
  props<{ loadedPage: PageContents }>()
);

export const addLoadedPageFail = createAction(
  "[Publish page] adding loaded page fail",
  props<{ error: ErrorMessage }>()
);

export const deletePage = createAction(
  "[Publish page] delete page",
  props<{ pageId: string }>()
);

export const deletePageFail = createAction(
  "[Publish page] delete page fail",
  props<{ error: ErrorMessage }>()
);

export const addPageFail = createAction(
  "[Publish page] add page fail",
  props<{ error: ErrorMessage }>()
);

export const loadPageFail = createAction(
  "[Publish page] load page fail",
  props<{ error: ErrorMessage }>()
);
