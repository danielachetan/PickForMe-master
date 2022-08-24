package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

@SpringBootApplication
@ConditionalOnProperty(value = "spring.cloud.gcp.firestore.enabled", matchIfMissing = true)
public class PickForMeApplication {

    public static void main(String[] args) {
        SpringApplication.run(PickForMeApplication.class, args);
    }

    /*
    @Bean
    CommandLineRunner init(BookRepository bookRepository) {
        return args -> {
            bookRepository.save(new Book("The Fellowship of the Ring", "J.R.R. Tolkien", "/Storage/The_Fellowship_of_the_Ring.jpg", "A Lord of the Rings book", 480));
            bookRepository.save(new Book("1984", "George Orwell", "/Storage/1984.jpg", "About 1984", 352));
            bookRepository.findAll().forEach(System.out::println);
        };
    }

	*/
}
