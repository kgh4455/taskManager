package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.ToDoItem;

public interface ToDoItemRepository extends JpaRepository<ToDoItem, Long>{

}
