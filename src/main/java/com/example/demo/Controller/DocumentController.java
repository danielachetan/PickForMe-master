package com.example.demo.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

@RestController
@RequestMapping("/document")
@CrossOrigin(origins = "http://localhost:4200")
public class DocumentController {
	private static final Logger logger = LoggerFactory.getLogger(DocumentController.class);

	@RequestMapping(value = "/{docType}", method = RequestMethod.GET)
	public ResponseEntity<?> findAll(@PathVariable String docType) {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		try {
			List<Map<String, Object>> payload = new ArrayList<>();

			ApiFuture<QuerySnapshot> results = dbFirestore.collection(docType).get();
			results.get().getDocuments().stream().forEach(action -> {
				Map<String, Object> item = action.getData();
				item.put("docId", action.getId());
				payload.add(item);
			});

			return new ResponseEntity(payload, new HttpHeaders(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

	}

	@RequestMapping(value = "/{docType}/{docId}", method = RequestMethod.GET)
	public ResponseEntity<?> findItemByDocId(@PathVariable String docType, @PathVariable String docId) {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		try {
			DocumentReference documentReference = dbFirestore.collection(docType).document(docId);
			ApiFuture<DocumentSnapshot> future = documentReference.get();

			DocumentSnapshot document = future.get();

			return new ResponseEntity(document.getData(), new HttpHeaders(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/findDocsByField", method = RequestMethod.POST)
	public ResponseEntity<?> findItemsByField(@RequestBody Map<String, Object> request) {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		try {
			List<Map<String, Object>> payload = new ArrayList<>();
			// Create a reference to the cities collection
			CollectionReference cities = dbFirestore.collection(request.get("collection").toString());
			// Create a query against the collection.
			Query query = cities.whereEqualTo(request.get("field").toString(), request.get("value").toString());
			// retrieve query results asynchronously using query.get()
			ApiFuture<QuerySnapshot> querySnapshot = query.get();

			for (DocumentSnapshot document : querySnapshot.get().getDocuments()) {
				System.out.println(document.getData());
				Map<String, Object> item = document.getData();
				item.put("docId", document.getId());
				payload.add(item);
			}

			return new ResponseEntity(payload, new HttpHeaders(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping(value = "save")
	public ResponseEntity<?> saveItem(@RequestBody Map<String, Object> rating) {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		List<Map<String, Object>> payload = new ArrayList<>();
		try {
//			dbFirestore.collection(rating.get("type").toString()).document(rating.get("document").toString())
//					.set(rating);

			// Add a new document (asynchronously) in collection "cities" with id "LA"
//			ApiFuture<WriteResult> future = dbFirestore.collection(rating.get("collection").toString())
//					.document(rating.get("document").toString()).collection("list").add(rating);

			ApiFuture<DocumentReference> addedDocRef = dbFirestore.collection(rating.get("collection").toString())
					.add(rating);
			System.out.println("Added document with ID: " + addedDocRef.get().getId());
			logger.info("Added document with ID: " + addedDocRef.get().getId());
			return new ResponseEntity(payload, new HttpHeaders(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
