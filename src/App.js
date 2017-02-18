import React, { Component } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';
import axios from 'axios';

const newId = () => Date.now();

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos: [],
            editing: null
        };
    }
    componentDidMount(){
        axios.get('./state.json')
            .then(response => {
                this.setState({ todos: response.data.todos });
            });
    }
    handleAddTodo(text){
        this.setState({
            todos: [...this.state.todos, {
                id: newId(),
                text: text
            }]
        });
    }
    handleDeleteTodo(id){
        const newTodos = [...this.state.todos];
        const deleteIndex = newTodos.findIndex(v => v.id === id);
        newTodos.splice(deleteIndex, 1);
        this.setState({
            todos: newTodos
        });
    }
    handleToggleTodo(id){
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id === id);
        newTodos[editIndex].done = !newTodos[editIndex].done;
        this.setState({
            todos: newTodos
        });
    }
    handleEditTodo(id){
        this.setState({
            editing: id
        });
    }
    handleCancelEditTodo(){
        this.setState({
            editing: null
        });
    }
    handleSaveTodo(id, newText){
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id === id);
        newTodos[editIndex].text = newText;
        this.setState({
            todos: newTodos,
            editing: null
        });
    }
    handleToggleAll(){
        const newToggleAll = !this.state.todos.every(v => v.done);
        const newTodos = this.state.todos.map(v => {
            v.done = newToggleAll;
            return v;
        });
        this.setState({
            todos: newTodos
        });
    }
    handleDeleteCompleted(){
        const newTodos = this.state.todos.filter(v=> !v.done);
        this.setState({ todos: newTodos });
    }
    render(){
        const {
            todos,
            editing
        } = this.state;

        const filter = this.props.routeParams.filter;
        const activeLength = todos.filter(v => !v.done).length;
        const completedLength = todos.length - activeLength;

        return (
            <div className="todo-app">
                <Header handleAddTodo={(text)=> this.handleAddTodo(text)} />
                <TodoList
                    todos={todos}
                    editing={editing}
                    filter={filter}
                    handleToggleTodo={id=> this.handleToggleTodo(id)}
                    handleDeleteTodo={id=> this.handleDeleteTodo(id)}
                    handleEditTodo={id=> this.handleEditTodo(id)}
                    handleCancelEditTodo={()=> this.handleCancelEditTodo()}
                    handleSaveTodo={(id, newText)=> this.handleSaveTodo(id, newText)}
                    handleToggleAll={()=> this.handleToggleAll()}
                />
                <Footer
                    filter={filter}
                    activeLength={activeLength}
                    completedLength={completedLength}
                    handleDeleteCompleted={()=> this.handleDeleteCompleted()}
                />
            </div>
        )
    }
};

export default App;