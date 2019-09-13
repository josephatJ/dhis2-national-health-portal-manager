import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";
import { mergeMap, map } from "rxjs/operators";
import { addLoadedPage } from "src/app/store/actions";

@Injectable({ providedIn: "root" })
export class PublishPageService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  addPage(data): Observable<any> {
    if (data.typeOfAction !== "edit") {
      return this.httpClient.post(
        "dataStore/home-portal-themes/" + data.pageContents.id,
        data.pageContents
      );
    } else {
      return this.httpClient.put(
        "dataStore/home-portal-themes/" + data.pageContents.id,
        data.pageContents
      );
    }
  }

  loadPages(): Observable<any> {
    return this.httpClient.get("dataStore/home-portal-themes").pipe(
      mergeMap(pageKeys => {
        return from(pageKeys).pipe(
          mergeMap(pageKey =>
            this.httpClient
              .get("dataStore/home-portal-themes/" + pageKey)
              .pipe(map(data => addLoadedPage({ loadedPage: data })))
          )
        );
      })
    );
  }
}
