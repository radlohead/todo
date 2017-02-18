import React, { Component } from 'react';
import ClassNames from 'classnames';

class Todo extends Component {
    constructor() {
        super();
    }
    componentDidUpdate(){
        if(this.props.editing) this._textInput.focus();
    }
    onFocus(){
        this._textInput.value = this.props.text;
    }
    onKeyDown(e){
        const text = this._textInput.value;
        if(!text || e.keyCode !== 13) return;
        this.props.onSaveTodo(text);
    }
    render() {
        const {
            text,
            editing,
            done,
            onToggleTodo,
            onDeleteTodo,
            onEditTodo,
            onCancelEditTodo
        } = this.props;
        return (
            <li className={ClassNames("todo-item", {
                editing: editing,
                completed: done
            })}>
                <div
                    className="toggle"
                    onClick={onToggleTodo}
                />
                <div className="todo-item__view">
                    <div
                        className="todo-item__view__text"
                        onDoubleClick={onEditTodo}
                    >
                        {text}
                    </div>
                    <button
                        className="todo-item__destroy"
                        onClick={onDeleteTodo}
                    />
                </div>
                <input
                    className="todo-item__edit"
                    type="text"
                    ref={ref=> { this._textInput = ref; }}
                    onFocus={()=> this.onFocus()}
                    onBlur={onCancelEditTodo}
                    onKeyDown={(e)=> this.onKeyDown(e)}
                />
            </li>
        )
    }
}

export default Todo;