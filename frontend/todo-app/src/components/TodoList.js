import React from 'react';

const TodoList = ({ todos, deleteTodo, updateTodo, setEditingTodo, editingTodo }) => {
    const handleEdit = (todo) => {
      setEditingTodo(todo);  // 수정할 항목을 setEditingTodo로 설정
    };
  
    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <p>{todo.task}</p>
            <p>목표 설정 날짜: {todo.dueDate}</p>
            <p>상태: {todo.completed ? '완료' : '진행 중'}</p>
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
            <button onClick={() => handleEdit(todo)}>수정</button>  {/* 수정 버튼 */}
          </li>
        ))}
      </ul>
    );
  };
  
  export default TodoList;
  
  