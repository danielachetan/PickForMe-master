import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient) { }

    fetchBooks() {
        return this.http
            .get("http://localhost:8080/document/books");
    }

    fetchMovies() {
        return this.http
            .get("http://localhost:8080/document/movies")
    }

    fetchShows() {
        return this.http
            .get("http://localhost:8080/document/tv shows");
    }

    fetchHistory() {
        return this.http
            .get("http://localhost:8080/document/history");
    }

    submitRating(item: any) {
        return this.http.post("http://localhost:8080/document/save", item).pipe(retry(1),
            catchError(this.handleError));;
    }

    pullUserRatings(item: any) {
        return this.http.post("http://localhost:8080/document/findDocsByField", item);
    }

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}

