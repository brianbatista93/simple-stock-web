import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LuArt';

  constructor(public router: Router) {
  }

  public goTo(route: string) {
    this.router.navigate([route]);
  }
}
