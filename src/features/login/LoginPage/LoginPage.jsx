import { connect } from 'react-redux';
import { authenticateUser } from '../../login/LoginPage/action';
import React from 'react';
import TextField from '../../../components/TextField';
import styled, { css } from 'styled-components';

const mapDispatchToProps = (dispatch) => ({
  onHandleLogin: (username, userpassword) => {
    console.log(`username =>${username}`);
    console.log(`userpassword =>${userpassword}`);
    console.log(`environment value =>${process.env.REACT_APP_API_ENDPOINT}`);
    const data = dispatch(authenticateUser(username, userpassword));
    console.log(`data in onHandleLogin${data}`);
  }
});

function mapStateToProps(state, ownProps) {
  return {
    loginTypesProps: state.loginTypes
  };
}

class LoginPage extends React.Component {
  constructor() {
    super();
    this.handleChange = (event) => {
      this.setState({
        [event.target.name]: [event.target.value]
      });
    };
    this.handleLogin = () => (ev) => {
      ev.preventDefault();
      this.props.onHandleLogin(this.state.username, this.state.userpassword);
    };
  }

  render() {
    return (<div>Login Page
            <br />
      <b>UserName :</b>
      <div><TextField textfieldname="username" handleChange={this.handleChange} /></div>
      <br />
      <b>Password :</b>
      <div><TextField textfieldname="userpassword" handleChange={this.handleChange} /></div>
      <br />
      <Button onClick={this.handleLogin()}>Login</Button>
    </div>);
  }
}

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;

  ${(props) => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
