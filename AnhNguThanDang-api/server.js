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

//xoa cai nay phai tu khai bao
server.delete('/deleteCourseDetails', (req, res) => {
  const courseId = req.query.course_id; // Lấy course_id từ tham số query

  const db = router.db;
  const detailCourse = db.get('detailCourse');
  
  // Xóa các mục trong detailCourse có course_id bằng với courseId
  detailCourse.remove({ course_id: parseInt(courseId) }).write();

  res.status(200).json({ message: `Deleted detailCourse with course_id ${courseId}` });
});

server.get('/getCourseDetail', (req, res) => {
    // Lấy courseId từ params
	//querry -> tham so sau ? login?course_id=3
    const course_id = parseInt(req.query.course_id);
    
   
    const db = router.db;
    const detailCourse = db.get('detailCourse').filter({ course_id: course_id }).value();
	//filter tim kiem nhieu phan tu -> tra ve nhieu phan tu

    res.json(detailCourse);
});

server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db;
  
  //find tim kiem 1 phan tu -> tra ve 1 phan tu
  const admin = db.get('admin').find({ email: email, password: parseInt(password) }).value();

  if (admin) {
    res.status(200).json({ message: 'Đăng nhập thành công'});
  } else {
    res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
  }
});

server.post("/courses",(req, res, next) => {
  let date = new Date()
  req.body.createdAt = date.toISOString()
  
  // Continue to JSON Server router
  next()
})
server.post("/products",(req,res, next) => {
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