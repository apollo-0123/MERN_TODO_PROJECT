import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../styles/pages/TodoPage.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined
      }));
      setTodos(parsedTodos);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos([...todos, todo]);
      setNewTodo('');
      showAlertMessage('Todo added successfully!');
    }
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        const completed = !todo.completed;
        return {
          ...todo,
          completed,
          completedAt: completed ? new Date() : undefined
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    
    const completedTodo = updatedTodos.find(todo => todo.id === id);
    if (completedTodo?.completed) {
      showAlertMessage('Great job! Task completed! 🎉');
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    showAlertMessage('Todo deleted successfully!');
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const saveEdit = () => {
    if (editingText.trim()) {
      setTodos(todos.map(todo => 
        todo.id === editingId 
          ? { ...todo, text: editingText.trim() }
          : todo
      ));
      setEditingId(null);
      setEditingText('');
      showAlertMessage('Todo updated successfully!');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const showAlertMessage = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const getProgressPercentage = () => {
    if (todos.length === 0) return 0;
    const completedCount = todos.filter(todo => todo.completed).length;
    return Math.round((completedCount / todos.length) * 100);
  };

  const todayTodos = todos.filter(todo => {
    const today = new Date();
    const todoDate = new Date(todo.createdAt);
    return todoDate.toDateString() === today.toDateString();
  });

  const completedToday = todayTodos.filter(todo => todo.completed).length;
  const totalToday = todayTodos.length;

  return (
    <div className="todo-page">
      <Header />
      
      <main className="todo-main">
        <div className="container">
          <div className="todo-header">
            <h1>📝 Today's Todo List</h1>
            <div className="todo-stats">
              <div className="stat-item">
                <span className="stat-number">{completedToday}</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{totalToday}</span>
                <span className="stat-label">Total</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{getProgressPercentage()}%</span>
                <span className="stat-label">Progress</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <span className="progress-text">{getProgressPercentage()}% Complete</span>
          </div>

          {/* Add Todo Form */}
          <div className="add-todo-form">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="What do you want to accomplish today?"
              className="todo-input"
            />
            <button onClick={addTodo} className="add-todo-btn">
              Add Todo
            </button>
          </div>

          {/* Todo List */}
          <div className="todo-list">
            {todayTodos.length === 0 ? (
              <div className="empty-state">
                <p>No todos for today. Add your first todo above!</p>
              </div>
            ) : (
              todayTodos.map(todo => (
                <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="todo-checkbox"
                    />
                    
                    {editingId === todo.id ? (
                      <div className="edit-form">
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                          className="edit-input"
                          autoFocus
                        />
                        <button onClick={saveEdit} className="save-btn">Save</button>
                        <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
                      </div>
                    ) : (
                      <span className="todo-text">{todo.text}</span>
                    )}
                  </div>
                  
                  <div className="todo-actions">
                    {!todo.completed && (
                      <button 
                        onClick={() => startEditing(todo)} 
                        className="edit-btn"
                      >
                        ✏️
                      </button>
                    )}
                    <button 
                      onClick={() => deleteTodo(todo.id)} 
                      className="delete-btn"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Success Alert */}
      {showAlert && (
        <div className="alert-overlay">
          <div className="alert-box">
            <span className="alert-message">{alertMessage}</span>
            <button onClick={() => setShowAlert(false)} className="alert-close">×</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TodoPage; 