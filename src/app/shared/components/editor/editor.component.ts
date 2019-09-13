import { Component, AfterViewInit } from "@angular/core";

declare var tinymce: any;

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.css"]
})
export class EditorComponent implements AfterViewInit {
  constructor() {}

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: "#editor-tinymce",
      plugins: ["link", "table"],
      skin_url: "assets/skins/lightgray",
      setup: editor => {
        this.editor = editor;
        editor.on("keyup change", () => {
          const content = editor.getContent();
        });
      }
    });
  }
}
