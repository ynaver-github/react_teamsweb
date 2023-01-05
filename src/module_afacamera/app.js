import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import linkImage from './Thinq.jpg'

const StyledNav = styled.nav`
  padding: 1.5rem;
  li {
    display: block;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
  h1 {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
    font-weight: bold;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
`


function App() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0px 0px 0px 0px';
    return () => {
      document.body.style.overflow = 'auto' // cleanup or run on page unmount
      document.body.style.margin = '8px';
    }
  }, []);

  return (
    <div style={{
      display: "block",
      width: "100%",
      height: "100%",
    }}>
      <Link to={`/main-activity`}>
        <img src={linkImage} alt='ThinQ' style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }} />
      </Link>
    </div>
  )
}

export default App
