import createRouter from 'location-info'

const { addRoutes, locationInfo } = createRouter({ trailingSlash: false })
addRoutes({
  home: '/',
})

export default locationInfo
