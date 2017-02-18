import React ,{ Component } from 'react';
import Todo from './Todo';
import ClassNames from 'classnames';

class TodoList extends Component {
    constructor(){
        super();
    }
    render(){
        const {
            todos,
            editing,
            filter,
            handleToggleTodo,
            handleDeleteTodo,
            handleEditTodo,
            handleCancelEditTodo,
            handleSaveTodo,
            handleToggleAll
        } = this.props;
        const todoList = todos.map(({id, text, done}) => {
            if(
                (done && filter === 'active')
                || (!done && filter === 'completed')
            ) return;

            return (
                <Todo
                    key = {id}
                    text = {text}
                    editing={editing === id}
                    done = {done}
                    onToggleTodo = {()=> handleToggleTodo(id)}
                    onDeleteTodo = {()=> handleDeleteTodo(id)}
                    onEditTodo   = {()=> handleEditTodo(id)}
                    onCancelEditTodo = {()=> handleCancelEditTodo()}
                    onSaveTodo = {text=> handleSaveTodo(id, text)}
                />
            )
        });

        return (
        <div className="todo-app__main">
            <div
                className={ClassNames('toggle-all', {
                    checked: todos.every(v => v.done)
                })}
                onClick={handleToggleAll}
            />
            <ul className="todo-list">
                {todoList}
            </ul>
        </div>
        )
    }
}

export default TodoList;