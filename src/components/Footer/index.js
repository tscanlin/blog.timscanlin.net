import React from "react"

const Footer = () => {
  const now = new Date()

  return (
    <footer className="tc">
      <p>
        <span>&copy; </span>
        <span>{now.getFullYear()} </span>
        <span>Tim Scanlin</span>
      </p>
    </footer>
  )
}

export default Footer
