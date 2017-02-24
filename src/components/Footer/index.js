import React from "react"

const Footer = () => {
  const now = new Date()

  return (
    <footer className="center w5 f6 tc bt b--light-gray mt4">
      <p>
        <a href="/feed.xml">feed</a>
      </p>
      <p>
        <span>&copy; </span>
        <span>{now.getFullYear()} </span>
        <span>Tim Scanlin</span>
      </p>
    </footer>
  )
}

export default Footer
