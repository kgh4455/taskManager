import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';  
import TodoList from './components/TodoList';  

const App = () => {
  const [todos, setTodos] = useState([]);  
  const [editingTodo, setEditingTodo] = useState(null);  // 수정할 할 일 상태 관리
  const [filter, setFilter] = useState('all');  // 필터 상태 관리
  const [searchTerm, setSearchTerm] = useState('');  // 검색어 상태 관리

  useEffect(() => {
    fetch('http://localhost:8080/api/todo/items')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = ({ task, dueDate, completed }) => {
    const newTodo = { task, dueDate, completed };
  
    fetch('http://localhost:8080/api/todo/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    })
    .then((response) => response.json())
    .then((data) => setTodos((prevTodos) => [...prevTodos, data]));
  };
  
  const updateTodo = (id, updatedTodo) => {
    // 수정할 할 일을 업데이트
    fetch(`http://localhost:8080/api/todo/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    })
    .then((response) => response.json())
    .then((data) => {
      setTodos((prevTodos) =>
        prevTodos.map((item) => (item.id === id ? { ...item, completed: data.completed } : item))
      );
    });
  };
  
  const deleteTodo = (id) => {
    fetch(`http://localhost:8080/api/todo/items/${id}`, { method: 'DELETE' })
      .then(() => setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)));
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);  // 수정할 항목을 setEditingTodo로 설정
  };

  // 필터링된 할 일 목록
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'inProgress') return !todo.completed;
    return true;  // all일 때 모든 할 일을 반환
  });

  // 검색어에 맞는 할 일 목록 필터링
  const searchedTodos = filteredTodos.filter((todo) =>
    todo.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>할 일 관리 앱</h1>
      
      {/* 할 일 추가 폼 */}
      <TodoForm 
        addTodo={addTodo} 
        editingTodo={editingTodo} 
        setEditingTodo={setEditingTodo} 
        updateTodo={updateTodo}  // 수정 기능 추가
      />  

      {/* 필터 버튼 */}
      <div>
        <button onClick={() => setFilter('all')}>모든 할 일</button>
        <button onClick={() => setFilter('completed')}>완료된 할 일</button>
        <button onClick={() => setFilter('inProgress')}>진행 중인 할 일</button>
      </div>

      {/* 검색 */}
      <div>
        <input
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 필터링과 검색된 할 일 목록만 표시 */}
      <TodoList
        todos={searchedTodos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        setEditingTodo={setEditingTodo}
        handleEditTodo={handleEditTodo}  // 수정 버튼 기능 추가
      />
    </div>
  );
};

export default App;
