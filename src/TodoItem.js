import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: "read",
			buttonOrInput: "",
			buttonName: "modify",
			content: this.props.content
		}
	}
	
	shouldComponentUpdate (newProps, newState) {
		if (newProps.content !== this.props.content) {
			return true;
		} else {
			return false;
		}
	}
	
	delselectedItem = () => {
		// const deleteItem = thie.props.deleteItem,
		// const index = this.props.index 와 같은 뜻.
		const { deleteItem, index } = this.props;
		deleteItem(index);
	}
		
	modifySelectedItem = () => {
		this.state.mode === "read" ? 
		this.setState({mode: "modify", buttonName: "save"}) : 
		this.setState({mode:"read", buttonName: "modify"})
		this.forceUpdate();

		const { modifyItem, index } = this.props;
		modifyItem(index, this.state.content)
	}
	inputFormHandler = (e) => {
		e.preventDefault();
		this.setState({
			content : e.target.value
		})
	}

	render () {
		const { content } = this.props;
		let buttonOrInput = null;

		if(this.state.mode ==="read"){
			buttonOrInput = <span>{ content }</span>
		} else if(this.state.mode === "modify"){
			buttonOrInput = <input 
				className="modify-input"
				type="input" 
				value={content}
				onChange={this.inputFormHandler}
				></input>
		}
		return (
				<li className="list-wrap">
					{ buttonOrInput }
					<div className="btn-wrap">
						<button
							className="modifyBtn"
							type="button"
							onClick={
								this.modifySelectedItem
							}
							>{this.state.buttonName}</button>
						<button 
							className="deleteBtn"
							type="button" 
							onClick={
								this.delselectedItem
							}
						>delete</button>
					</div>
				</li>
		)
	}

}


TodoItem.propTypes = {
	content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	deleteItem: PropTypes.func,
	index: PropTypes.number
}

export default TodoItem;