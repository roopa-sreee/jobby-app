import {MdLocationOn} from 'react-icons/md'

import {AiFillStar} from 'react-icons/ai'
import {BsBriefcase} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJobData} = props
  const {
    companyLogoUrl,
    jobDescription,
    employmentType,
    location,
    rating,
    title,
  } = similarJobData

  console.log(similarJobData)

  return (
    <li className="similar-job-item-container">
      <div className="img-job-title-container">
        <img
          className="company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="title-job-rating-container">
          <h1 className="job-title">{title}</h1>
          <div className="star-job-rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating-job-text">{rating}</p>
          </div>
        </div>
      </div>
      <div className="second-part-job-container">
        <h1 className="description-job-heading">Description</h1>
        <p className="description-job-text">{jobDescription}</p>
      </div>
      <div className="location-job-details-type-container">
        <div className="location-icon-name-container">
          <MdLocationOn className="location-icon" />
          <p className="location-job">{location}</p>
        </div>
        <div className="employment-type-container">
          <BsBriefcase className="location-icon" />
          <p className="job-Type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
