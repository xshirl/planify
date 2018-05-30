import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import {
  login,
  register
} from './services/apiService';
import Login from './components/Login';
import Registration from './components/Registration';
import './App.css';
import BoardList from './components/BoardList';
import BoardForm from './components/BoardForm';
import BoardPage from './components/BoardPage';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      currentUser: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.logOut = this.logOut.bind(this);
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



  fetchUserBoards() {

    fetch(`/api/boards/`)
    .then(resp => {
      if(!resp.ok) throw new Error(resp.statusMessage);
      return resp.json();
    })
    .then(respBody => {
      this.setState({
        boards: respBody.data
      })
    })
  }



createBoard(board) {
  const authToken = localStorage.getItem('authToken');
    fetch('/api/boards', {
      method: 'POST',
      body: JSON.stringify(board),
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
        console.log('Adding board');
        console.log(resBody);
        this.setState((prevState, props) => {
          return {
            boards: prevState.boards.concat(resBody.data)
          }
        })
      })
  }

deleteBoard(id) {
  const authToken = localStorage.getItem('authToken');
  if(authToken){
    fetch(`/api/boards/0/${id}`, {
      method: 'DELETE'
    })
      .then(resp => {
        if (!resp.ok) throw new Error(resp.statusMessage);
        return resp.json();
      })
      .then(respBody => {
        this.setState((prevState, props) => {
          return {
            boards: prevState.boards.filter(board => board.id !== id)
          }
        })
      })
  }
}

  updateBoard(board, id) {
    const authToken = localStorage.getItem('authToken');
    console.log(authToken);
    if(authToken){
    fetch(`/api/boards/0/${id}`, {
      method: 'PUT',
      body: JSON.stringify(board),
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
          const { boards } = prevState;
          const indx = boards.findIndex(b => b.id === id);
          return {
            boards: [
              ...boards.slice(0, indx),
              resBody.data,
              ...boards.slice(indx + 1)
            ]
          }
        })
      })
    }
  }

 handleSubmit(board) {
    this.createBoard(board);
  }
  handleDelete(id) {
    this.deleteBoard(id);
  }

  handleEdit(board, id) {
    this.updateBoard(board, id);
  }




  logOut(){
    localStorage.setItem('authToken', '');
    this.setState ({
     currentUser: null
    })
  }


  componentDidMount() {
    this.fetchUserBoards();
    this.checkToken();
  }


  handleLogin(creds) {
   login(creds)
    .then(user => this.setState({currentUser: user}));
 }

  handleRegistration(creds) {
  register(creds)
   .then(user => this.setState({currentUser: user}));
  }

  render() {
    let Site;
    if(this.state.currentUser) {
      Site = (
        <div className="home">
          <nav>
          <div className="header">Planify</div>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/boards">Boards</Link></li>
              <li><Link to="/new">New Board </Link> </li>
              <li><Link to="/" onClick={this.logOut}>Log Out </Link></li>
            </ul>
          </nav>
          <Switch>
            {this.state.boards.map(board => (
              <Route
                path={`/boards/${board.id}`}
                key={board.id}
                render={() => <BoardPage board={board} />}
              />
            ))}
            <Route exact path="/boards" render={()=> <BoardList boards={this.state.boards} onDelete={this.handleDelete} onEdit={this.handleEdit}/>} />
            <Route exact path="/new" render={() => <BoardForm onSubmit={this.handleSubmit} />} />

          </Switch>
        </div>
        )
    }
    else {
      Site = (
        <div className="login">
          <nav>
            <ul>
              <li><Link to="/">Log In</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </nav>

          <Route exact path="/" render={()=> <Login onSubmit={this.handleLogin}/>} />
          <Switch>
          <Route exact path="/register" render={()=> <Registration onSubmit={this.handleRegistration}/>} />
          </Switch>
        </div>
        )
    }
    return (
      <Router>
      <div className="site">
        {Site}
      </div>
      </Router>
    );
  }
}

export default App;
