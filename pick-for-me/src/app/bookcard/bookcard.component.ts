import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-bookcard",
  templateUrl: './bookcard.component.html',
  styleUrls: ['./bookcard.component.css']
})
export class BookcardComponent implements OnInit {
  @Input() book: any;
  constructor(private router: Router) { }
  ngOnInit(): void { }

  routeToCard(id: any) {
    this.router.navigateByUrl('/book/' + id);
  }
}
