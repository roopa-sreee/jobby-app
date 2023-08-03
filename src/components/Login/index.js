import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 30, path: '/'})
      history.replace('/')
    } else {
      this.setState({
        isSubmitError: true,
        errorMsg: data.error_msg,
      })
    }
  }

  render() {
    const {username, password} = this.state

    const {isSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-route-container">
        <div className="login-route">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onClickLogin}>
            <label htmlFor="username" className="login-label">
              USERNAME
            </label>
            <br />
            <input
              id="username"
              className="input-field"
              value={username}
              placeholder="Username"
              type="text"
              onChange={this.onChangeUsername}
            />
            <br />
            <label htmlFor="password" className="login-label">
              PASSWORD
            </label>
            <br />
            <input
              id="password"
              className="input-field"
              value={password}
              placeholder="Password"
              type="password"
              onChange={this.onChangePassword}
            />
            <br />
            <button className="login-button" type="submit">
              Login
            </button>
            {isSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
