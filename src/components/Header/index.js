import React, { PropTypes } from "react"
import { Link } from "react-router"
// import Svg from "react-svg-inline"

// import twitterSvg from "../icons/iconmonstr-twitter-1.svg"
// import gitHubSvg from "../icons/iconmonstr-github-1.svg"

// import styles from "./index.css"
// { metadata: { pkg } }

const Header = () => (
  <header>
    <nav
        style={{ backgroundColor: "rgba(250,250,255,0)" }}
        className="mw8 center tc pv2"
      >
      <div className="dib w-100 pa2">
        <Link className="f2 no-underline" to="/">
          { "Tim Scanlin" }
        </Link>
      </div>
      <div className="dib w-100">
        <Link className="pa1 mh1" to="/">
          { "Blog" }
        </Link>
        <a className="pa1 mh1" href="http://timscanlin.net">
          { "About" }
        </a>
        <a className="pa1 mh1" href="https://github.com/tscanlin/">
          { "Github" }
        </a>
      </div>
    </nav>
  </header>
)

Header.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Header
