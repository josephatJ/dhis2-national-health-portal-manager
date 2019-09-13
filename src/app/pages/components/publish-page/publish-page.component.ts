import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "src/app/store/reducers";
import { addPage, loadKeysForPublishedPages } from "src/app/store/actions";
import { GenerateUidService, PageContents } from "src/app/core";
import { Observable } from "rxjs";
import {
  getAllPages,
  getPageInfoEntities
} from "src/app/store/selectors/page.selectors";
import { ActivatedRoute, Params, Router } from "@angular/router";
declare var tinymce: any;
declare var tinyMCE: any;

@Component({
  selector: "app-publish-page",
  templateUrl: "./publish-page.component.html",
  styleUrls: ["./publish-page.component.css"]
})
export class PublishPageComponent implements OnInit {
  html: any = `<h5 style="text-alin: center">Your editor</h5>`;
  tinmceConfigs: any = {
    height: "600px",
    id: "tinymce-contents",
    // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
    plugins:
      "print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount contextmenu colorpicker textpattern",
    toolbar:
      "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat",
    image_advtab: true,
    imagetools_toolbar:
      "rotateleft rotateright | flipv fliph | editimage imageoptions"
  };
  programName: string;
  isPreviewSet: boolean;
  pages$: Observable<any>;
  pagesEntities$: Observable<any>;
  currentPageId: string;
  currentPage: any;
  isEditModeSet: boolean = true;
  navList: Array<any> = [{ id: "/", name: "Home" }];
  constructor(
    private store: Store<State>,
    private router: Router,
    private generateService: GenerateUidService,
    private route: ActivatedRoute
  ) {
    this.isPreviewSet = false;
    this.store.dispatch(loadKeysForPublishedPages());
    this.pages$ = this.store.select(getAllPages);
    this.pagesEntities$ = this.store.select(getPageInfoEntities);
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.currentPageId = params["id"];
      if (params["type-of-action"] == "edit") {
        this.isEditModeSet = true;
      } else {
        this.isEditModeSet = false;
      }
      if (this.pagesEntities$) {
        this.pagesEntities$.subscribe(entities => {
          if (entities) {
            this.currentPage = entities[this.currentPageId];
            console.log(this.currentPage);
            if (this.currentPage && this.currentPage.pageHtmlCodes) {
              this.programName = this.currentPage.name;
              this.html = this.currentPage.pageHtmlCodes;
            }
          }
        });
      }
    });
  }

  preview() {
    this.isPreviewSet = !this.isPreviewSet;
  }

  publish() {
    let page;
    let typeOfAction;
    if (this.isEditModeSet) {
      typeOfAction = "edit";
      page = {
        id: this.currentPageId,
        name: this.programName,
        cardContents: {
          header: this.programName
        },
        pageHtmlCodes: this.html
      };
    } else {
      typeOfAction = "new";
      page = {
        id: this.programName + "_" + this.generateService.generateUID(11),
        name: this.programName,
        cardContents: {
          header: this.programName
        },
        pageHtmlCodes: this.html
      };
      this.currentPageId = page.id;
    }
    console.log(this.isEditModeSet);
    this.store.dispatch(
      addPage({ pageContents: page, typeOfAction: typeOfAction })
    );
    this.isPreviewSet = !this.isPreviewSet;
    this.router.navigate(["/publish-page/" + this.currentPageId + "/edit"]);
  }

  formatName(name) {
    return name.replace(" ", "").toLowerCase();
  }
}
