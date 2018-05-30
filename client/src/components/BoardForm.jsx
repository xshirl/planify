import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './BoardForm.css';

export default class BoardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect:false,
      redirectHome: false,
      board: Object.assign({

       name: '',
       user_id: ''

     }, props.initialValue)
   };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitBoard = this.handleSubmitBoard.bind(this);
  }

  handleInputChange(e) {
    // see https://reactjs.org/docs/forms.html#handling-multiple-inputs
    const {name, value} = e.target;
    console.log(name, value);
    this.setState((prevState, props) => ({
      board: {
        ...prevState.board,
        [name]: value
      }
    }))
  }

  handleSubmitBoard(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.board);
    this.setState({
      redirectHome: true
    });
  }


  render() {
    const { id, name, user_id } = this.state.board
    return (
      <div>
        <form class="boardForm" onSubmit={this.handleSubmitBoard} className={id ? 'edit' : 'create'}>
        {this.state.redirectHome && <Redirect to='/boards' />}
        {!id && <h2>New board</h2>}

          <input class="board" type="text" value={this.state.board.name} onChange={this.handleInputChange} name="name" placeholder="Board Name" />

          <input type="hidden" value="1" onChange={this.handleInputChange} name="user_id" placeholder="User id" />

          <button type='submit'>{id ? 'Edit' : 'Create'} board</button>
          <Link to='/'>Cancel</Link>

        </form>
        </div>
      )
  }
}
