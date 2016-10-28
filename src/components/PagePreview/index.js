import React, { PropTypes } from "react"
import { Link } from "react-router"
import { formatDatestring } from "../../utils/date"

const PagePreview = ({ __url, title, date }) => {
  const pageDate = date ? new Date(date) : null
  let datestring = formatDatestring(pageDate)

  return (
    <div className="mb3">
      <Link className="f3" to={ __url }>
        { title }
      </Link>
      {
        pageDate &&
        <small className="db">
          { " " }
          <time key={ pageDate.toISOString() }>
            { datestring }
          </time>
        </small>
      }
    </div>
  )
}

PagePreview.propTypes = {
  __url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
}

export default PagePreview
