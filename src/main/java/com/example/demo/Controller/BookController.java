package com.example.demo.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Domain.Book;
import com.example.demo.FirestoreService.BookFirestoreService;
import com.example.demo.Repository.BookRepository;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class BookController {

	@Autowired
	private final BookFirestoreService bookFirestoreService;

	@Autowired
	private final BookRepository bookRepository;

	public BookController(BookFirestoreService bookFirestoreService, BookRepository bookRepository) {
		this.bookFirestoreService = bookFirestoreService;
		this.bookRepository = bookRepository;
	}

	@GetMapping("/books")
	public List<Book> all() throws ExecutionException, InterruptedException {
		return bookFirestoreService.getAllBooks();
	}

	@PostMapping("/books")
	public Book addBook(@RequestBody Book book) throws ExecutionException, InterruptedException {
		return bookRepository.save(book);
	}

	@GetMapping("/getBookDetails")
	public Book getBookDetails(@RequestHeader String id) throws ExecutionException, InterruptedException {
		return bookFirestoreService.getBookDetails(id);
	}

	@PutMapping("/books")
	public String updateBook(@RequestBody Book newBook) throws ExecutionException, InterruptedException {
		return bookFirestoreService.updateBookDetails(newBook);
	}

	@DeleteMapping("/books")
	public String deleteBook(@RequestHeader String id) {
		return bookFirestoreService.deleteBook(id);
	}

}
