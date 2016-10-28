import React, { PropTypes } from "react"

import Page from "../Page"
import { formatDatestring } from "../../utils/date"

const Post = (props) => {
  // it's up to you to choose what to do with this layout ;)
  const pageDate = props.head.date ? new Date(props.head.date) : null
  const datestring = formatDatestring(pageDate)

  return (
    <Page
      { ...props }
      header={
        <header>
          {
          pageDate &&
          <time key={ pageDate.toISOString() }>
            { datestring }
          </time>
        }
        </header>
      }
    />
  )
}

Post.propTypes = {
  head: PropTypes.object.isRequired,
}

export default Post
