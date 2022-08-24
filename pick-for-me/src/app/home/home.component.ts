import {
  Component,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../login/login.service";
import { HomeService } from "./home.service";
declare var $: any;


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: any = [];
  movieList: any = [];
  shows: any = [];
  history: any = [];
  userRatings: any = [];
  userPreferenceItems: any = [];
  uniqueGenre: any = [];

  displayRatings: any = [1, 2, 3, 4, 5]
  constructor(private homeService: HomeService,
    public loginServie: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    let email: string = localStorage.getItem('userLoggedInData') || '';
    if (email.length > 0) {
      this.loginServie.userLoggedInData = email;
    }

    this.pullUserRatings();
    this.fetchBooks();
    this.fetchMovies();
    this.fetchShows();

    // this.fetchHistory();
  }


  ngAfterViewInit() {

  }

  ngDestroy() {
    $(".top-banner").data("owl.carousel").destroy();
    $(".movies-carousel").data("owl.carousel").destroy();
  }

  fetchBooks() {
    this.homeService.fetchBooks().subscribe(
      (data: any) => {
        this.books = data;
        this.books.forEach((book: any) => {
          this.uniqueGenre.push(...book.genre.split(',').map((gen: any) => gen.trim()));
        });
        setTimeout(() => {
          this.setCarousal('.books-carousel');
        }, 1000);
      },
      (error: any) => {


      }
    );
  }

  fetchMovies() {
    this.homeService.fetchMovies().subscribe(
      (data: any) => {
        this.movieList = data;
        this.movieList.forEach((movie: any) => {
          this.uniqueGenre.push(...movie.genre.split(',').map((gen: any) => gen.trim()));
        });
        setTimeout(() => {
          this.setCarousal('.movies-carousel');
        }, 1000);
      },
      (error: any) => {

      }
    );
  }

  fetchShows() {
    this.homeService.fetchShows().subscribe(
      (data: any) => {
        this.shows = data;
        this.shows.forEach((show: any) => {
          this.uniqueGenre.push(...show.genre.split(',').map((gen: any) => gen.trim()));
        });
        setTimeout(() => {
          this.setCarousal('.shows-carousel');
        }, 1000);

      },
      (error: any) => {

      }
    );
  }

  setCarousal(value: string) {
    $(value).owlCarousel({
      items: 5,
      loop: false,
      margin: 30,
      autoplay: false,
      responsive: {
        600: {
          items: 5,
        }
      }
    })
  }

  fetchHistory() {
    this.homeService.fetchHistory().subscribe(
      (data: any) => {
        this.history = data
      },
      (error: any) => {

      }
    );
  }

  pullUserRatings() {
    let value: any = {
      "collection": "history",
      "field": "document",
      "value": this.loginServie.userLoggedInData
    }
    //$(".top-banner").data("owl.carousel").destroy();
    this.homeService.pullUserRatings(value).subscribe(
      (data: any) => {
        this.userRatings = data;
        if (!this.isRatingSubmitRequest) {
          setTimeout(() => {
            if (this.loginServie.userLoggedInData.length > 0 && this.books.length > 0 && this.movieList.length > 0 && this.shows.length > 0) {
              this.countGenre();
            } else {
              let userPreferenceMovies: any = this.getRandom(this.movieList, 3); //.slice(0, 3)
              let userPreferenceBooks: any = this.getRandom(this.books, 3) //this.books.slice(0, 3)
              let userPreferenceShows: any = this.getRandom(this.shows, 3) //this.shows.slice(0, 3)
              userPreferenceMovies = userPreferenceMovies.map((obj: any) => ({ ...obj, itemType: 'movies' }));
              userPreferenceBooks = userPreferenceBooks.map((obj: any) => ({ ...obj, itemType: 'books' }));
              userPreferenceShows = userPreferenceShows.map((obj: any) => ({ ...obj, itemType: 'tv shows' }));

              this.userPreferenceItems.push(...userPreferenceMovies);
              this.userPreferenceItems.push(...userPreferenceBooks);
              this.userPreferenceItems.push(...userPreferenceShows);
              setTimeout(() => {
                this.setCarousal('.rec-carousel');
              }, 1000);
              // setTimeout(() => {
              //   $('.top-banner').owlCarousel({
              //     stagePadding: 30,
              //     items: 1,
              //     loop: true,
              //     margin: 10,
              //     autoplay: true,
              //     autoplayTimeout: 2000,
              //     autoplayHoverPause: true,
              //     responsive: {
              //       600: {
              //         items: 1,
              //         stagePadding: 100,
              //       }
              //     }
              //   });
              // }, 1000);
            }
          }, 2000);
        } else {
          this.isRatingSubmitRequest = false;
        }
      },
      (error: any) => {

      }
    );
  }

  getRandom(arr: any, n: any) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      return arr;
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

   getRecommendations(arr: any, n: any) {
    var result = new Array(n),
      len = arr.length;
    if (n > len)
      return arr;
    while (n--) {
      result[n] = arr[n];
    }
    return result;
  }

  countOfGenre: any = [];
  countGenre() {
    this.uniqueGenre = this.uniqueGenre.filter((item: any, i: any, ar: any) => ar.indexOf(item) === i);
    console.log(this.uniqueGenre);
    if (this.userRatings) {
      this.uniqueGenre.forEach((genre: any) => {
        let item: any = {};
        item['genre'] = genre;
        item['count'] = this.userRatings.filter((rating: any) => rating.genre.indexOf(genre) > -1).length;
        item['avgRating'] = item['count'] == 0 ? 0 : this.userRatings.filter((rating: any) => rating.genre.indexOf(genre) > -1).map((item: any) => item.rating).reduce((prev: any, next: any) => prev + next, 0) / item['count'];
        this.countOfGenre.push(item);
      });
    }
    this.countOfGenre = this.countOfGenre.sort((a: any, b: any) => (a.avgRating < b.avgRating) ? 1 : -1);

    let nonRatedMovies: any = this.movieList.filter((movie: any) => !this.userRatings.some((el: any) => el.itemDocId === movie.docId));
    let ratedMovies:any = this.movieList.filter( (x:any) => !nonRatedMovies.filter( (y:any) => y.docId === x.docId).length);

    let nonRatedBooks: any = this.books.filter((book: any) => !this.userRatings.some((el: any) => el.itemDocId === book.docId));
    let ratedBooks:any = this.books.filter( (x:any) => !nonRatedBooks.filter( (y:any) => y.docId === x.docId).length);

    let nonRatedShows: any = this.shows.filter((show: any) => !this.userRatings.some((el: any) => el.itemDocId === show.docId));
    let ratedShows:any = this.shows.filter( (x:any) => !nonRatedShows.filter( (y:any) => y.docId === x.docId).length);

    console.log(nonRatedMovies);
    console.log(nonRatedBooks);
    console.log(nonRatedShows);
    let userPreferenceMovies: any = nonRatedMovies.filter((movie: any) => movie.genre.indexOf(this.countOfGenre[0]['genre']) > -1 || movie.genre.indexOf(this.countOfGenre[1]['genre']) > -1 || movie.genre.indexOf(this.countOfGenre[2]['genre']) > -1 || movie.genre.indexOf(this.countOfGenre[3]['genre']) > -1 || movie.genre.indexOf(this.countOfGenre[4]['genre']) > -1 || movie.genre.indexOf(this.countOfGenre[5]['genre']) > -1)
    if (userPreferenceMovies.length < 3) {
      let items: any = [];
      for (let i = 6; i < this.countOfGenre.length; i++) {
        items.push(...nonRatedMovies.filter((movie: any) => movie.genre.indexOf(this.countOfGenre[i]['genre']) > -1));
      }
      //items = items.filter((item: any, i: any, ar: any) => ar.indexOf(item) === i);
      items = items.filter((v:any,i:any,a:any)=>a.findIndex((t:any)=>(t.docId === v.docId))===i)
      userPreferenceMovies.push(...this.getRandom(items, 3 - userPreferenceMovies.length));
    }
    userPreferenceMovies = userPreferenceMovies.map((obj: any) => ({ ...obj, itemType: 'movies' }));

    let userPreferenceBooks: any = nonRatedBooks.filter((book: any) => book.genre.indexOf(this.countOfGenre[0]['genre']) > -1 || book.genre.indexOf(this.countOfGenre[1]['genre']) > -1 || book.genre.indexOf(this.countOfGenre[2]['genre']) > -1 || book.genre.indexOf(this.countOfGenre[3]['genre']) > -1 || book.genre.indexOf(this.countOfGenre[4]['genre']) > -1 || book.genre.indexOf(this.countOfGenre[5]['genre']) > -1)
    if (userPreferenceBooks.length < 3) {
      let items: any = [];
      for (let i = 6; i < this.countOfGenre.length; i++) {
        items.push(...nonRatedBooks.filter((book: any) => book.genre.indexOf(this.countOfGenre[i]['genre']) > -1));
      }
      items = items.filter((v:any,i:any,a:any)=>a.findIndex((t:any)=>(t.docId === v.docId))===i)
      userPreferenceBooks.push(...this.getRandom(items, 3 - userPreferenceBooks.length));
    }
    userPreferenceBooks = userPreferenceBooks.map((obj: any) => ({ ...obj, itemType: 'books' }));

    let userPreferenceShows: any = nonRatedShows.filter((show: any) => show.genre.indexOf(this.countOfGenre[0]['genre']) > -1 || show.genre.indexOf(this.countOfGenre[1]['genre']) > -1 || show.genre.indexOf(this.countOfGenre[2]['genre']) > -1 || show.genre.indexOf(this.countOfGenre[3]['genre']) > -1 || show.genre.indexOf(this.countOfGenre[4]['genre']) > -1 || show.genre.indexOf(this.countOfGenre[5]['genre']) > -1)
    if (userPreferenceShows.length < 3) {
      let items: any = [];
      for (let i = 6; i < this.countOfGenre.length; i++) {
        items.push(...nonRatedShows.filter((show: any) => show.genre.indexOf(this.countOfGenre[i]['genre']) > -1));
      }
      items = items.filter((v:any,i:any,a:any)=>a.findIndex((t:any)=>(t.docId === v.docId))===i)
      userPreferenceShows.push(...this.getRandom(items, 3 - userPreferenceShows.length));
    }
    userPreferenceShows = userPreferenceShows.map((obj: any) => ({ ...obj, itemType: 'tv shows' }));

    if (userPreferenceMovies.length == 0) {
      userPreferenceMovies = this.getRandom(ratedMovies, 3)
      userPreferenceMovies = userPreferenceMovies.map((obj: any) => ({ ...obj, itemType: 'movies' }));
    }

    if (userPreferenceBooks.length == 0) {
      userPreferenceBooks = this.getRandom(ratedBooks, 3)
      userPreferenceBooks = userPreferenceBooks.map((obj: any) => ({ ...obj, itemType: 'books' }))
    }

    if (userPreferenceShows.length == 0) {
      userPreferenceShows = this.getRandom(ratedShows, 3)
      userPreferenceShows = userPreferenceShows.map((obj: any) => ({ ...obj, itemType: 'tv shows' }));
    }

    if (userPreferenceMovies.length >= 3) {
      this.userPreferenceItems.push(...this.getRecommendations(userPreferenceMovies, 3));
    } else {
      this.userPreferenceItems.push(...this.getRandom(ratedMovies, 3-userPreferenceMovies.length));
    }

    if (userPreferenceBooks.length >= 3) {
      this.userPreferenceItems.push(...this.getRecommendations(userPreferenceBooks, 3));
    } else {
      this.userPreferenceItems.push(...this.getRandom(ratedBooks, 3-userPreferenceBooks.length));
    }

    if (userPreferenceShows.length >= 3) {
      this.userPreferenceItems.push(...this.getRecommendations(userPreferenceShows, 3));
    } else {
      this.userPreferenceItems.push(...this.getRandom(ratedShows, 3-userPreferenceShows.length));
    }

    setTimeout(() => {
      this.setCarousal('.rec-carousel');
    }, 1000);

    // setTimeout(() => {
    //   $('.top-banner').owlCarousel({
    //     stagePadding: 30,
    //     items: 1,
    //     loop: true,
    //     margin: 10,
    //     autoplay: true,
    //     autoplayTimeout: 2000,
    //     autoplayHoverPause: true,
    //     responsive: {
    //       600: {
    //         items: 1,
    //         stagePadding: 100,
    //       }
    //     }
    //   });
    // }, 1000);
  }

  routeToCard(item: any, id: any) {
    this.router.navigateByUrl('/' + item + '/' + id);
  }

  findRatingOfItem(docId: any) {
    let ratings: any = this.userRatings.filter((item: any) => item.itemDocId == docId);
    if (ratings.length > 0) {
      return ratings[0].rating
    } else {
      return 0;
    }
  }

  isRatingSubmitRequest: boolean = false;
  submitRating(index: any, item: any, collection: any) {
    let value: any = {
      "collection": "history",
      "document": this.loginServie.userLoggedInData,
      "rating": index,
      "genre": item.genre,
      "title": item.title,
      "type": collection,
      "itemDocId": item.docId
    };

    this.homeService.submitRating(value).subscribe(
      (data: any) => {
        this.isRatingSubmitRequest = true;
        this.pullUserRatings();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
