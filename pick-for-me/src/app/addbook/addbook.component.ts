import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-addbook',
  template: `
    <div class="modal">
      <div class="modal-backdrop" (click)="closeModal()"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add Book</h3>
          <span style="padding: 10px;cursor: pointer;" (click)="closeModal()"
            >X</span
          >
        </div>
        <div class="modal-body content">
          <div class="inputField">
            <div class="label"><label>Title</label></div>
            <div><input id="addBookTitle" type="text" /></div>
          </div>
          <div class="inputField">
            <div class="label"><label>Photo</label></div>
            <div><input id="addBookPhoto" type="text" /></div>
          </div>
          <div class="inputField">
            <div class="label"><label>Description</label></div>
            <div><input id="addBookDescription" type="text" /></div>
          </div>
          <div class="inputField">
            <div class="label"><label>Author</label></div>
            <div><input id="addBookAuthor" type="text" /></div>
          </div>
          <div class="inputField">
            <div class="label"><label>Genre</label></div>
            <div><input id="addBookGenre" type="text" /></div>
          </div>
		  <div class="inputField">
            <div class="label"><label>Number of pages</label></div>
            <div><input id="addBookNumberOfPages" type="text" /></div>
          </div>
        </div>
        <div class="modal-footer">
          <button (click)="closeModal()">Cancel</button>
          <button
            [disabled]="disable"
            class="btn"
            (click)="addNewBook($event)"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  `,
   styles: [
    `
      .label {
        padding: 4px 0;
        font-size: small;
        color: rgb(51, 55, 64);
      }
      .content {
        display: flex;
        flex-wrap: wrap;
      }
      .inputField {
        margin: 3px 7px;
        flex: 1 40%;
      }
    `,
  ],
})
export class AddbookComponent implements OnInit {
  @Output() closeDialog = new EventEmitter();
  @Output() refreshBooks = new EventEmitter();
  disable = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  addNewBook(e: Event) {
    this.disable = true;
    const {
      addBookTitle,
      addBookAuthor,
      addBookGenre,
      addBookPhoto,
      addBookDescription,
	  addBookNumberOfPages,
    } = window as any;
    this.http
      .post("http://localhost:8080/books", {
        title: addBookTitle.value,
        author: addBookAuthor.value,
        description: addBookDescription.value,
        photo: addBookPhoto.value,
        genre: addBookGenre.value,
		numberOfPages: addBookNumberOfPages.value,
      })
      .subscribe(
        (data) => {
          this.disable = false;
          this.refreshBooks.emit("");
          this.closeDialog.emit("");
        },
        (err) => {
          this.disable = false;
        }
      );
  }

  closeModal() {
    this.closeDialog.emit("");
  }

}
