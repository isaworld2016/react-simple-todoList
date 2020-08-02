import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import './style.css';

class Todolist extends Component {
	componentDidMount() {
		this.todoInput.focus();
	}
	constructor(props) {
      super(props);
      this.state = {
		title: 'TodoList',
      	inputValue: '',
      	list: ["watch Movie", "hair cut", 'buy clothes']
      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleBtnClick = this.handleBtnClick.bind(this);
      this.handleItemDelete = this.handleItemDelete.bind(this);
      this.handleItemModify = this.handleItemModify.bind(this);
	}

	render() {
	return (
		<Fragment>
			<form className="list-form">
				<label htmlFor="insertArea" className="title">{ this.state.title }</label>
				<input 
					ref={input => this.todoInput = input}
					type="input"
					id="insertArea"
					className='new-list-input'
					value={this.state.inputValue}
					onChange={this.handleInputChange}
				/>
				<input className="submitBtn" type="submit" value="add" onClick={this.handleBtnClick}></input>
			</form>
			<ul>
				{ this.getTodoItem() }
			</ul>
	  </Fragment>
		)
	}

getTodoItem() {
	return this.state.list.map((item, index) => {
       return (
                <TodoItem 
                	key={index}
                	content={item} 
                	index={index}
					deleteItem={this.handleItemDelete}
					modifyItem={this.handleItemModify}
				/>
        )
	})
}

	handleInputChange(e) {
		const value = e.target.value;
		this.setState(() => ({
				inputValue: value
	}));
	}

	handleBtnClick(e) {
		e.preventDefault();
		this.setState((prevState) => ({
			list: [...prevState.list, prevState.inputValue],
			inputValue: ''
		}));
	}

	handleItemDelete(index) {
		this.setState((prevState) => {
			const list = [...prevState.list];
			list.splice(index, 1);
			return {list}
		});
		this.todoInput.focus();
	}

	handleItemModify(index, content) {
		this.setState((prevState) => {
			const list = [...prevState.list];

			list[index] = content;
			return {list} 
		})
	}
}

export default Todolist; 