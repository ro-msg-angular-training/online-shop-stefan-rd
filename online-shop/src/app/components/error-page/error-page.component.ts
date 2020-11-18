import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'errors',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
  constructor(public errorService: ErrorService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.errorService.clear();
  }
}
