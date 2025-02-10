package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.ToDoItem;
import com.example.demo.repository.ToDoItemRepository;

@Service
public class ToDoItemService {

	private final ToDoItemRepository repository;
	
	public ToDoItemService(ToDoItemRepository repository) {
		this.repository = repository;
	}
	
	public List<ToDoItem>getAllItem(){
		return repository.findAll();
	}
	
	public ToDoItem createItem(ToDoItem item) {
		return repository.save(item);
	}
    public ToDoItem updateItem(Long id, ToDoItem item) {
        ToDoItem existingItem = repository.findById(id)
                                          .orElseThrow(() -> new RuntimeException("Item not found"));
        existingItem.setTask(item.getTask());
        existingItem.setCompleted(item.isCompleted());
        existingItem.setDueDate(item.getDueDate());
        return repository.save(existingItem);
    }

    public void deleteItem(Long id) {
        repository.deleteById(id);
    }
}
