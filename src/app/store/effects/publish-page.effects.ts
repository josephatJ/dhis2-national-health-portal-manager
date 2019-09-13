import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../reducers";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import {
  addPage,
  postResultMessage,
  addPageFail,
  loadKeysForPublishedPages
} from "../actions";
import { switchMap, map, catchError, mergeMap } from "rxjs/operators";
import { PublishPageService } from "src/app/core";
import { of } from "rxjs";

@Injectable()
export class PublishPageEffects {
  constructor(
    private store: Store<State>,
    private actions$: Actions,
    private publishPageService: PublishPageService
  ) {}

  addPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPage),
      switchMap(page =>
        this.publishPageService.addPage(page).pipe(
          map(data => postResultMessage(data)),
          catchError((error: any) => of(addPageFail(error)))
        )
      )
    )
  );

  loadPages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadKeysForPublishedPages),
      switchMap(() => this.publishPageService.loadPages())
    )
  );
}
