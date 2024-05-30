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
//server.get('/getCourseByKeyWord', (req, res) => {
  //  const keyWord = req.query.course_name; // Sử dụng req.query để lấy dữ liệu từ query string
    //const db = router.db;
    //const courses = db.get('courses').filter(course => course.course_name.includes(keyWord)).value(); // Sử dụng includes để tìm kiếm các khóa học có course_name chứa keyWord

    //res.json(courses);
//});
const _ = require('lodash');
server.get('/getCourseByKeyWord', (req, res) => {
    const keyWord = req.query.course_name;
    const db = router.db;
    const courses = db.get('courses').filter(course => _.includes(_.toLower(course.course_name), _.toLower(keyWord))).value();
    
    res.json(courses);
});

server.get('/getLecturerByKeyWord', (req, res) => {
    const keyWord = req.query.lecturer_name;
    const db = router.db;
    const lectures = db.get('lecturers').filter(lecture => _.includes(_.toLower(lecture.lecturer_name), _.toLower(keyWord))).value();
    
    res.json(lectures);
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