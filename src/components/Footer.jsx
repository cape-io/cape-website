import React, { PropTypes } from 'react'

function FooterEl({ siteId }) {
  return (
    <footer>
      <p>Footer</p>
      {siteId && <p>{siteId}</p>}
    </footer>
  )
}
FooterEl.defaultProps = {
}
FooterEl.propTypes = {
  siteId: PropTypes.string,
}
export default FooterEl
