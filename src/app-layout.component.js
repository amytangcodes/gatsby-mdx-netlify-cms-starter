import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import { Header, Menu } from "./components"
import Auth from './core/auth.service'
import "./app.css"

export const AppLayout = ({ children, pageContext }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const auth = new Auth();

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated())
  })

  return (
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
      render={data => {
        return (
          <>
            <Header siteTitle={data.site.siteMetadata.title}/>
            <Menu/>
            <div
              style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `0px 1.0875rem 1.45rem`,
                paddingTop: 0,
              }}
            >
              <main>
                {isAuthenticated ? children : <button type="button" onClick={() => auth.login()}>Login</button> }
              </main>
              <footer>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.org">Gatsby</a>
              </footer>
            </div>
          </>
        )
      }
      }
    />
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout
