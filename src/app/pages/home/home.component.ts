import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "src/app/store/reducers";
import { loadKeysForPublishedPages } from "src/app/store/actions";
import { Observable } from "rxjs";
import { getAllPages } from "src/app/store/selectors/page.selectors";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  pages$: Observable<any>;
  navList: Array<any> = [{ id: "/", name: "Home" }];
  constructor(private store: Store<State>) {
    this.store.dispatch(loadKeysForPublishedPages());
    this.pages$ = this.store.select(getAllPages);
  }

  ngOnInit() {}
}
