import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const apiJobsStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobs extends Component {
  state = {
    profileData: [],
    jobsData: [],
    checkboxInputs: [],
    radioInput: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    apiJobsStatus: apiJobsStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const profileOptions = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const profileResponse = await fetch(profileApiUrl, profileOptions)

    if (profileResponse.ok === true) {
      const fetchedDataProfile = [await profileResponse.json()]
      const updatedDataProfile = fetchedDataProfile.map(eachItem => ({
        name: eachItem.profile_details.name,
        profileImageUrl: eachItem.profile_details.profile_image_url,
        shortBio: eachItem.profile_details.short_bio,
      }))
      this.setState({
        profileData: updatedDataProfile,
        responseSuccess: true,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getJobDetails = async () => {
    this.setState({apiJobsStatus: apiJobsStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {checkboxInputs, radioInput, searchInput} = this.state
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs}&minimum_package=${radioInput}&search=${searchInput}`
    const jobsOptions = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobsResponse = await fetch(jobsApiUrl, jobsOptions)
    if (jobsResponse.ok === true) {
      const fetchedJobsData = await jobsResponse.json()
      const updatedJobsData = fetchedJobsData.jobs.map(eachJObItem => ({
        companyLogoUrl: eachJObItem.company_logo_url,
        employmentType: eachJObItem.employment_type,
        id: eachJObItem.id,
        jobDescription: eachJObItem.job_description,
        location: eachJObItem.location,
        packagePerAnnum: eachJObItem.package_per_annum,
        rating: eachJObItem.rating,
        title: eachJObItem.title,
      }))
      this.setState({
        jobsData: updatedJobsData,
        apiJobsStatus: apiJobsStatusConstants.success,
      })
    } else {
      this.setState({apiJobsStatus: apiJobsStatusConstants.failure})
    }
  }

  getRadioOption = event => {
    this.setState({radioInput: event.target.id}, this.getJobDetails)
  }

  getInputOption = event => {
    const {checkboxInputs} = this.state
    const inputNotInList = checkboxInputs.filter(
      eachItem => eachItem === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, event.target.id],
        }),
        this.getJobDetails,
      )
    } else {
      const filteredData = checkboxInputs.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState(
        prevState => ({checkboxInputs: filteredData}),
        this.getJobDetails,
      )
    }
  }

  getProfileView = () => {
    const {profileData, responseSuccess} = this.state
    if (responseSuccess) {
      const {name, profileImageUrl, shortBio} = profileData[0]
      return (
        <div className="profile-container">
          <img src={profileImageUrl} className="profile-icon" alt="profile" />
          <h1 className="profile-name">{name}</h1>
          <p className="short-bio">{shortBio}</p>
        </div>
      )
    }
    return null
  }

  onClickRetry = () => {
    this.getProfileDetails()
  }

  getProfileFailureView = () => (
    <div className="failure-button-container">
      <button
        className="failure-button"
        type="button"
        onClick={this.onClickRetry()}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getProfileView()
      case apiStatusConstants.failure:
        return this.getProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  onClickRetryJobs = () => {
    this.getJobDetails()
  }

  getJobsFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="failure-view-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="failure-button"
        type="button"
        onClick={this.onClickRetryJobs}
      >
        Retry
      </button>
    </div>
  )

  getJobsView = () => {
    const {jobsData} = this.state
    const noJobs = jobsData.length === 0
    return noJobs ? (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="no-jobs-heading">No jobs found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    ) : (
      <ul className="jobs-list-container">
        {jobsData.map(eachItem => (
          <JobItem key={eachItem.id} jobDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderJobs = () => {
    const {apiJobsStatus} = this.state

    switch (apiJobsStatus) {
      case apiJobsStatusConstants.success:
        return this.getJobsView()
      case apiJobsStatusConstants.failure:
        return this.getJobsFailureView()
      case apiJobsStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderJobTypes = () => (
    <ul className="job-types-container">
      {employmentTypesList.map(eachType => (
        <li className="checkbox-container" key={eachType.employmentTypeId}>
          <input
            type="checkbox"
            id={eachType.employmentTypeId}
            className="checkbox"
            onChange={this.getInputOption}
          />
          <label className="label" htmlFor={eachType.employmentTypeId}>
            {eachType.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderSalaryRanges = () => (
    <ul className="salary-ranges-container">
      {salaryRangesList.map(eachItem => (
        <li className="list-item" key={eachItem.salaryRangeId}>
          <input
            id={eachItem.salaryRangeId}
            className="radio"
            type="radio"
            onChange={this.getRadioOption}
            name="option"
          />
          <label className="label" htmlFor={eachItem.salaryRangeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitSearchInput = () => {
    this.getJobDetails()
  }

  onEnterSearchBar = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <Header />
        <div className="small-device-search">
          <input
            type="search"
            value={searchInput}
            placeholder="Search"
            className="search-input"
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onEnterSearchBar}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
            onClick={this.onSubmitSearchInput}
          >
            <AiOutlineSearch className="search-icon" />
          </button>
        </div>
        <div className="all-jobs-container">
          <div className="profile-and-filters-container">
            {this.renderProfile()}
            <hr className="line" />
            <h1 className="employment-type-heading">Type of Employment</h1>
            {this.renderJobTypes()}
            <hr className="line" />
            <h1 className="employment-type-heading">Salary Range</h1>
            {this.renderSalaryRanges()}
          </div>
          <div className="jobs-container">
            <div className="large-device-search">
              <input
                type="search"
                value={searchInput}
                placeholder="Search"
                className="search-input"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchBar}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onSubmitSearchInput}
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default AllJobs
