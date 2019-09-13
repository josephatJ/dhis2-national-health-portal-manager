import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./pages";
import { PublishPageComponent } from "./pages/components/publish-page/publish-page.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "publish-page/:id/:type-of-action",
    component: PublishPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class RoutingModule {}
