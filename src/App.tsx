import React from 'react';
import './styles/App.css';
import Page from './components/todos/Page';

function App() {
  return (
    <div>
      <Page/>
		{/*<section className="todoapp">
			<header className="header">
				<h1>todos</h1>
				<input className="new-todo" placeholder="What needs to be done?" />
			</header>
			<section className="main">
				<input id="toggle-all" className="toggle-all" type="checkbox"/>
				<label >Mark all as complete</label>
				<ul className="todo-list">
					<li className="completed">
						<div className="view">
							<input className="toggle" type="checkbox" />
							<label>Taste JavaScript</label>
							<button className="destroy"></button>
						</div>
						<input className="edit" defaultValue=""/>
					</li>
					<li>
						<div className="view">
							<input className="toggle" type="checkbox"/>
							<label>Buy a unicorn</label>
							<button className="destroy"></button>
						</div>
						<input className="edit" defaultValue=""/>
					</li>
				</ul>
			</section>
			<footer className="footer">
				<span className="todo-count"><strong>0</strong> item left</span>
				<ul className="filters">
					<li>
						<a className="selected" href="#/">All</a>
					</li>
					<li>
						<a href="#/active">Active</a>
					</li>
					<li>
						<a href="#/completed">Completed</a>
					</li>
				</ul>
				<button className="clear-completed">Clear completed</button>
			</footer>
		</section>
		<footer className="info">
			<p>Double-click to edit a todo</p>
			<p>Created by <a href="http://todomvc.com">Fabien</a></p>
			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>

		<script src="node_modules/todomvc-common/base.js"></script>
		<script src="js/app.js"></script>*/}
  </div> 
  );
}

export default App;
