import React from 'react';
import './styles/App.css';
import TodoApp from './components/todos/TodosPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<TodoApp displayFilter="all"/>}/>
          <Route path="/active" element={<TodoApp displayFilter="active"/>}/>
          <Route path="/completed" element={<TodoApp displayFilter="completed"/>}/>
          <Route path="/*" element={<TodoApp displayFilter="all"/>}/>
      </Routes>
  </div> 
  );
}

export default App;
