import React, { useState, useEffect } from 'react';

const TodoForm = ({ addTodo, editingTodo, setEditingTodo, updateTodo }) => {
  const [task, setTask] = useState(editingTodo ? editingTodo.task : '');  // 수정 상태에 따라 값을 설정
  const [dueDate, setDueDate] = useState(editingTodo ? editingTodo.dueDate : '');  // dueDate 값 설정
  const [completed, setCompleted] = useState(editingTodo ? editingTodo.completed : false);  // 완료 여부 설정

  useEffect(() => {
    if (editingTodo) {
      setTask(editingTodo.task);
      setDueDate(editingTodo.dueDate);
      setCompleted(editingTodo.completed);
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task && dueDate) {
      const newTodo = { task, dueDate, completed };

      if (editingTodo) {
        updateTodo(editingTodo.id, newTodo);  // 수정 시 updateTodo 호출
      } else {
        addTodo(newTodo);  // 새 할 일 추가 시 addTodo 호출
      }

      // 폼 초기화
      setTask('');
      setDueDate('');
      setCompleted(false);
      setEditingTodo(null);  // 수정 상태 초기화
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="할 일 입력"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <div>
        <label>완료 여부:</label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted(!completed)}  // 완료 여부 토글
        />
      </div>
      <button type="submit">{editingTodo ? '수정하기' : '추가하기'}</button>
    </form>
  );
};

export default TodoForm;
