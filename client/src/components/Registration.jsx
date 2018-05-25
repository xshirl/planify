import React, { Component } from 'react';

class Registration extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      pw_digest: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


handleInputChange(e) {
  const {name, value} = e.target;
  this.setState({
    [name]: value
  });
}
handleSubmit(e) {
  e.preventDefault();
  this.props.onSubmit(this.state);
  this.setState({
    username: '',
    email: '',
    pw_digest: ''
  });
}

render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>

        <input
        type='text'
        onChange={this.handleInputChange}
        value={this.state.username}
        name='username'
        placeholder="username"
        />
      </label>
      <label>

      <input
        type='text'
        onChange={this.handleInputChange}
        value={this.state.email}
        name='email'
        placeholder="email"
      />
      </label>
      <label>

      <input
        type='password'
        onChange={this.handleInputChange}
        value={this.state.password}
        name='pw_digest'
        placeholder="password"
      />
      </label>
      <button type='submit'>Register</button>
    </form>
  )
}
}
export default Registration;
