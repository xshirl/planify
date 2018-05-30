import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


export default class ListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect:false,
      redirectHome: false,
      list: Object.assign({

       name: '',
       board_id: ''

     }, props.initialValue)
   };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitList = this.handleSubmitList.bind(this);
  }

  handleInputChange(e) {
    // see https://reactjs.org/docs/forms.html#handling-multiple-inputs
    const {name, value} = e.target;
    console.log(name, value);
    this.setState((prevState, props) => ({
      list: {
        ...prevState.list,
        [name]: value
      }
    }))
  }

  handleSubmitList(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.list);
    this.setState({
      redirectHome: true
    });
  }


  render() {
    const { id, name, board_id } = this.state.list
    return (
      <div>
        <form class="listForm" onSubmit={this.handleSubmitList} className={id ? 'edit' : 'create'}>
        {this.state.redirectHome && <Redirect to={`/boards/${this.props.initialValue.board_id}`} />}
        {!id && <h2>New List</h2>}

          <input class="list" type="text" value={this.state.list.name} onChange={this.handleInputChange} name="name" placeholder="List Name" />

          <input type="hidden" value={this.props.initialValue.board_id} onChange={this.handleInputChange} name="board_id" placeholder="Board id" />

          <button type='submit'>{id ? 'Edit' : 'Create'} List</button>
          <Link to='/'>Cancel</Link>

        </form>
        </div>
      )
  }
}
