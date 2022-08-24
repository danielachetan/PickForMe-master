import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginServie: LoginService,
    private router: Router) { }

  ngOnInit(): void {

  }

  routeTo(route: string) {
    if (route == 'login') {
      this.router.navigateByUrl('/' + route);
    } else if (route == 'logout') {
      this.loginServie.userLoggedInData = '';
      localStorage.clear();
    }
  }
}
