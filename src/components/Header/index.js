import {Link, withRouter} from 'react-router-dom'
import {ImHome} from 'react-icons/im'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcase} from 'react-icons/bs'
import Cookies from 'js-cookie'

import './index.css'

const websiteLogo = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <div className="logo-container">
        <Link to="/">
          <img src={websiteLogo} alt="website logo" className="website-logo" />
        </Link>
      </div>

      <ul className="header-icons-small-device">
        <li>
          <Link to="/" className="link-item">
            <ImHome className="header-icon" />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link-item">
            <BsBriefcase className="header-icon" />
          </Link>
        </li>
        <li>
          <FiLogOut className="header-icon" onClick={onClickLogout} />
        </li>
      </ul>

      <ul className="header-options-large-device">
        <Link to="/" className="link-item">
          <li className="nav-option">Home</li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li className="nav-option">Jobs</li>
        </Link>
      </ul>
      <div>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
