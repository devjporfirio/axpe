const next = require('next')
const http = require('http')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const port = 3000
const handleNextRequests = app.getRequestHandler()

app.prepare().then(() => {
  const server = new http.Server((req, res) => {
    // if (req.headers.host === 'my-app.com') {
    //   app.setAssetPrefix('http://cdn.com/myapp')
    // } else {
    app.setAssetPrefix('')
    // }

    handleNextRequests(req, res)
  })

  server.listen(port, err => {
    console.log(`port here ${port}`)
    if (err) {
      throw err
    }

    console.log(`> Ready on http://localhost:${port}`)
  })
})