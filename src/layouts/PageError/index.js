import React, { PropTypes } from "react"

import styles from "./index.css"

const PageError = ({ error, errorText }) => (
  <div className={ styles.container }>
    <div className={ styles.text }>
      <p className={ styles.title }>
        <strong>{ error }</strong>
        { " " }
        { errorText }
      </p>
    </div>
  </div>
)

PageError.propTypes = {
  error: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  errorText: PropTypes.string,
}

PageError.defaultProps = {
  error: 404,
  errorText: "Page Not Found",
}

export default PageError
