import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";

@Component({
  selector: 'app-bookview',
  templateUrl: './bookview.component.html',
  styleUrls: ['./bookview.component.css']
})
export class BookviewComponent implements OnInit {
  book: any;
  //@ViewChild("modalRef") modalRef!: TemplateRef<any>;
  //@ViewChild("vcRef", { read: ViewContainerRef }) vcRef!: ViewContainerRef;
  //vRef: any = null;
  item: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        const id = params.id;
        this.item = params.item;
        this.http
          .get("http://localhost:8080/document/" + this.item + '/' + id)
          .subscribe((data: any) => (this.book = data));
      }
    });
  }

  /*
    deleteBook() {
      if (confirm("Do you really want to delete this book")) {
        this.http
          .delete("http://localhost:8080/books/" + this.book?.id)
          .subscribe((data) => {
            this.router.navigate(["/"]);
          });
      }
    }
  
  
    showEditBookDialog() {
      let view = this.modalRef.createEmbeddedView(null);
      this.vcRef.insert(view);
    }
  
    closeDialog() {
    this.vcRef.clear();
  }
  */

}
