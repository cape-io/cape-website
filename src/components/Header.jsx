import React, { PropTypes } from 'react'

function HeaderEl({ siteName }) {
  return (
    <header id="siteHeader">
      <p>header</p>
      {siteName && <p>{siteName}</p>}
    </header>
  )
}
HeaderEl.propTypes = {
  siteName: PropTypes.string,
}
HeaderEl.defaultProps = {
}
export default HeaderEl
