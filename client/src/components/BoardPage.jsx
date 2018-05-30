import React, { Component } from 'react';
import './BoardPage.css';
import ListForm from './ListForm';
import List from './List';
import { Link, Switch, Route } from 'react-router-dom';


export default class BoardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    }

    this.handleListSubmit = this.handleListSubmit.bind(this);
    this.handleListEdit = this.handleListEdit.bind(this);
    this.handleListDelete = this.handleListDelete.bind(this);
  }
  fetchBoardLists() {
    fetch(`/api/lists/${this.props.board.id}`)
    .then(resp => {
      if(!resp.ok) throw new Error(resp.statusMessage);
      return resp.json();
    })
    .then(respBody => {
      this.setState({
        lists: respBody.data
      })
      console.log(this.state.lists);
    })
  }

createList(list) {
  const authToken = localStorage.getItem('authToken');
    fetch('/api/lists', {
      method: 'POST',
      body: JSON.stringify(list),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(resp => {

        if (!resp.ok) throw new Error(resp.statusMessage);
        return resp.json();
      })
      .then(resBody => {
        console.log('Adding list');
        console.log(resBody);
        this.setState((prevState, props) => {
          return {
            lists: prevState.lists.concat(resBody.data)
          }
        })
      })
  }


  deleteList(id) {
  const authToken = localStorage.getItem('authToken');
  if(authToken){
    fetch(`/api/lists/0/${id}`, {
      method: 'DELETE'
    })
      .then(resp => {
        if (!resp.ok) throw new Error(resp.statusMessage);
        return resp.json();
      })
      .then(respBody => {
        this.setState((prevState, props) => {
          return {
            lists: prevState.lists.filter(list=> list.id !== id)
          }
        })
      })
  }
}

  updateList(list, id) {
    const authToken = localStorage.getItem('authToken');
    console.log(authToken);
    if(authToken){
    fetch(`/api/boards/0/${id}`, {
      method: 'PUT',
      body: JSON.stringify(list),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(resp => {
        if (!resp.ok) throw new Error(resp.statusMessage);
        return resp.json();
      })
      .then(resBody => {
        this.setState((prevState, props) => {
          const { lists } = prevState;
          const indx = lists.findIndex(l => l.id === id);
          return {
            lists: [
              ...lists.slice(0, indx),
              resBody.data,
              ...lists.slice(indx + 1)
            ]
          }
        })
      })
    }
  }

  componentDidMount() {
    this.fetchBoardLists();
    console.log(this.props.board);
  }

handleListSubmit(list) {
    this.createList(list);
  }

  handleListDelete(id) {
    this.deleteList(id);
  }

  handleListEdit(list, id) {
    this.updateList(list, id);
  }

checkToken() {
    const authToken = localStorage.getItem('authToken');
    fetch('/api/auth', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(resp => {
      if (!resp.ok) throw new Error(resp.mesage);
      return resp.json();
    })
    .then(respBody => {
      this.setState({
        currentUser: respBody.user
      })
    })
    .catch(err => {
      console.log('not logged in');
      localStorage.removeItem('authToken');
      this.setState({
        currentUser: null
      })
    })
  }


  render() {
    return (
      <div>
        <h1>{this.props.board.name} </h1>
        <Link to={`/boards/${this.props.board.id}/new`}>New List </Link>
        <Route exact path={`/boards/${this.props.board.id}/new`}
          render={() => (
            <ListForm onSubmit={this.handleListSubmit} />
            )} />
        {this.state.lists.map(list => (
          <div>

          <Switch>

          <Route exact
            path={`/boards/${this.props.board.id}/${list.id}/edit`}
            render={() => (
                <ListForm
                  onSubmit={updatedList => this.handleListEdit(updatedList, updatedList.id)}
                  initialValue={list} board={this.props.board}
                />
            )}
          />
          <Route
            render={() => (
              <List
                onDelete={()=> this.handleListDelete(list.id)}
                board={this.props.board}
                list={list}

              />
            )}
          />


        </Switch>
        </div>
          ))}
      </div>


      )
  }
}


