import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GenerateUidService {
  constructor() {}

  generateUID(len) {
    let uid = "";
    const sourceCharacters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let count = 0; count < len; count++) {
      uid += sourceCharacters.charAt(
        Math.floor(Math.random() * sourceCharacters.length)
      );
    }
    return uid;
  }
}
