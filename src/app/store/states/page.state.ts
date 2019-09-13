import { BaseState } from "./base.state";
import { EntityState } from "@ngrx/entity";

export interface PageState extends EntityState<any>, BaseState {
  message: string;
}
