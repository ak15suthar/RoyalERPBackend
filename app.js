const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const multer = require('multer');
const path = require('path');
const db = require('./queries');
const cors = require('cors');
//const { getManageBatch, getMailStudent } = require('./queries');
const app = express();
const port = 3131;
const DIR = './uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({ storage: storage });
app.use(cors());
app.use(bodyparser.json());
// Nodemailer

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(
    bodyparser.urlencoded({
        extended: true
    })
)

// Email

app.post('/sendFormData', (req, res) => {
    console.log(req.body, 'data of form');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: 'true',
        port: '465',
        auth: {
            user: 'ak15suthar@gmail.com', // must be Gmail from this link =>  https://myaccount.google.com/apppasswords
            pass: 'kggg nqlv yteb loto'    //(1) go to google setting in security option and enable 2step verification then 					//select custom and gen password from there 
        }
    });

    var mailOptions = {
        from: 'ak15suthar@gmail.com',
        to: 'req.body.email', // must be Gmail
        cc: ` ${req.body.name} <${req.body.email}>`,
        subject: 'Sending Email from Abhishek using Node.js',
        html: `
        <div class="card">
            <div class="view overlay">
                <a href="${req.body.grplink}">
                    <img src="https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2018/12/WhatsApp-hed-796x419.jpg" style="width:300px">
                </a>
            </div>

            <div class="card-body">
                <h1 style="color:black">${req.body.fn}&nbsp;${req.body.ln}</h1>
                <h3 style="color:black">Batch Name : ${req.body.bname}</h3>
                <h3 style="color:black">Batch Type : ${req.body.type}</h3>
                <h3 style="color:black">Faculty Name : ${req.body.username}</h3>

                <button type="button" style="
                background-color: red;
                padding: 16px 32px;
                text-align: center;
                text-decoration: none;
                border-radius:6px;
                font-weight:bold;
                "><a href="${req.body.grplink}" style="color:white;">Join Group</a></button>
            </div>
        </div>
                 `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({
                message: 'successfuly sent!'
            })
        }
    });

});


//Image path

app.get('/uploads/:imagename', function (req, res) {
    res.sendFile(__dirname + '/uploads/' + req.params.imagename);
})

//Login
app.post('/getLogin', db.getLogin);

//Session 
app.post("/addSession",db.addSession);

//Get Session
app.get('/getSessionById/:id',db.getSessionById);

//Image
app.post('/upload', upload.single('image'), db.upload);
app.post('/uploadStudent', upload.single('image'), db.uploadStudent);

//Position
app.post('/addPositions', db.addPositions);
app.get('/getPositions', db.getPositions);
app.get('/getPositionsById/:id', db.getPositionsById);
app.put('/updatePosition', db.updatePosition);
app.delete('/deletePosition/:id', db.deletePosition);

//Department
app.post('/addDepartment', db.addDepartment);
app.get('/getDepartment', db.getDepartment);
app.get('/getDepartmentById/:id', db.getDepartmentById);
app.put('/updateDepartment', db.updateDepartment);
app.delete('/deleteDepartment/:id', db.deleteDepartment);

//Employee
app.post('/addEmployees', db.addEmployees);
app.get('/getEmployee', db.getEmployee);
app.get('/getEmployeeById/:id', db.getEmployeeById);
app.put('/updateEmployee', db.updateEmployee);
app.delete('/deleteEmployee/:id', db.deleteEmployee);

//Courses
app.post('/addCourses', db.addCourses);
app.get('/getCourses', db.getCourses);
app.get('/getCoursesById/:id', db.getCoursesById);
app.put('/updateCourses', db.updateCourses);
app.delete('/deleteCourses/:id', db.deleteCourses);

//Users
app.post('/addUsers', db.addUsers);
app.get('/getUsers', db.getUsers);
app.get('/getUsersById/:id', db.getUsersById);
app.put('/updateUsers', db.updateUsers);
app.delete('/deleteUsers/:id', db.deleteUsers);

//Students
app.post('/addStudents', db.addStudents);
app.get('/getStudents', db.getStudents);
app.get('/getStudentsById/:id', db.getStudentsById);
app.put('/updateStudents', db.updateStudents);
app.delete('/deleteStudents/:id', db.deleteStudents);

// Batches
app.post('/addBatch', db.addBatch);
app.get('/getBatch', db.getBatch);
app.get('/getBatchById/:id', db.getBatchById);
app.put('/updateBatch', db.updateBatch);
app.delete('/deleteBatch/:id', db.deleteBatch)
app.get('/getBatchByUserId/:id', db.getBatchByUserId)

// Join
app.get('/getGenDetail', db.getGenDetail);
app.get('/getClubDetail', db.getClubDetail);
app.get('/getOnetooneDetail', db.getOnetooneDetail);

// Manage Batch
app.post('/addManageBatch', db.addManageBatch);
app.get('/getManageBatch', db.getManageBatch);
app.get('/getManageBatchById/:id', db.getManageBatchById);
app.put('/updateManageBatch', db.updateManageBatch);
app.delete('/deleteManageBatch/:id', db.deleteManageBatch);

// Different type of Batch
app.get('/getGenStudent', db.getGenStudent);
app.get('/getClubStudent', db.getClubStudent);
app.get('/getOnetooneStudent', db.getOnetooneStudent);

// Get Batch Student in Faculty
app.get('/getBatchStudent/:id', db.getBatchStudent);

// Count
app.get('/countStudent', db.countStudent);
app.get('/countFaculties', db.countFaculties);
app.get('/countCourses', db.countCourses);

// Get mail student
app.get('/getMailStudent/:id', db.getMailStudent);


app.get('/', (req, res) => {
    res.json({ info: 'Node.js , Express and Postgre API of Royal ERP System ' })
})

app.set('port',port);

app.listen(port, () => {
    console.log(`App is running on port ${port}`)

})