import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public messages: string[] = [];

  public add(message: string) {
    this.messages.pop();
    this.messages.push(message);
  }

  public clear() {
    this.messages = [];
  }
}
