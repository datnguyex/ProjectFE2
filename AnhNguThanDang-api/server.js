const jsonServer = require('json-server')
const multer  = require('multer')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Lưu trữ tệp tin vào thư mục public/images
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    // Tạo tên tệp tin mới dựa trên thời gian và tên gốc của tệp
    let date = new Date()
    let newFilename = date.getTime() + "-" + file.originalname
    req.body[file.fieldname] = newFilename
    cb(null, newFilename)
  }
})


const bodyParser = multer({ storage: storage }).any()

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(bodyParser)
server.post("/courses",(req, res, next) => {
  let date = new Date()
  req.body.createdAt = date.toISOString()
  
  

  // Continue to JSON Server router
  next()
})
server.post("/products",(req, res, next) => {
  let date = new Date()
  req.body.createdAt = date.toISOString()
  
  

  // Continue to JSON Server router
  next()
})



// Use default router
server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running')
})