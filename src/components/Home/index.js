import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  const onClickFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <>
      <div className="home-container">
        <Header />
        <div className="home-page">
          <div className="home-page-content">
            <h1 className="home-page-heading">
              Find The Job That Fits Your Life
            </h1>
            <p className="home-page-description">
              Millions of people are searching for jobs,salary
              information,company reviews.Find the job that fits your abilities
              and potential.
            </p>
            <Link to="/jobs">
              <button
                type="button"
                className="button"
                onClick={onClickFindJobs}
              >
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home
