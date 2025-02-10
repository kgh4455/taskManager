package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.ToDoItem;
import com.example.demo.service.ToDoItemService;

@RestController
@RequestMapping("/api/todo")
public class ToDoItemController {

	private ToDoItemService service;
	
	public ToDoItemController(ToDoItemService service) {
		this.service = service;
	}
	
	@GetMapping("/items")
	public List<ToDoItem>getAllItems(){
		return service.getAllItem();
	}
	@PostMapping("/items")
	public ToDoItem createItem(@RequestBody ToDoItem item) {
		return service.createItem(item);
	}
	@PutMapping("/items/{id}")
    public ToDoItem updateItem(@PathVariable("id") Long id, @RequestBody ToDoItem item) {
        return service.updateItem(id, item);
    }

	@DeleteMapping("/items/{id}")
    public void deleteItem(@PathVariable("id") Long id) {
        service.deleteItem(id);
    }
}
