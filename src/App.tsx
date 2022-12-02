import React from 'react';
import './styles/App.css';
import TodoApp from './components/todos/TodoApp';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<TodoApp parentFilter="all"/>}/>
          <Route path="/active/*" element={<TodoApp parentFilter="active"/>}/>
          <Route path="/completed/*" element={<TodoApp parentFilter="completed"/>}/>
      </Routes>
  </div> 
  );
}

export default App;
