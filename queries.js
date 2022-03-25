const { request } = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'royalerp',
    password : 'root',
    port : 5432
})

//Login

const getLogin = (req,res) => {
    const {username,password} = req.body
    pool.query('select * from users where username=$1 and password=$2',[username,password],(error,result) => {
        if(error){
            throw error;
        }
        res.send({status:210,msg:'Success',data:result.rows});
        console.log(result.rows);
        
    })
}

//Position

const addPositions = (req,res) => {
    const {poscode,posname,posshort,poslevel,description,status} = req.body;
    pool.query('insert into positions(poscode,posname,posshort,poslevel,description,status) values ($1,$2,$3,$4,$5,$6)',
    [poscode,posname,posshort,poslevel,description,status],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Added with id ${result.id}`);
    })
}

const getPositions = (req,res) => {
    pool.query('select * from positions order by posid asc',(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

const getPositionsById = (req,res) => {
    const posid = parseInt(req.params.id);    
    pool.query('select * from positions where posid=$1',[posid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

const updatePosition = (req,res) => {
    const posid = parseInt(req.body.posid);
    const {poscode,posname,posshort,poslevel,description,status} = req.body;
    pool.query('update positions set poscode=$1,posname=$2,posshort=$3,poslevel=$4,description=$5,status=$6 where posid=$7',
    [poscode,posname,posshort,poslevel,description,status,posid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Position updated by id ${posid}`);
    })
}

const deletePosition = (req,res) => {
    const posid = parseInt(req.params.id);
    pool.query('delete from positions where posid=$1',[posid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(200).send(`Position deleted by id ${posid}`);
    })
}

//Department

const addDepartment = (req,res) => {
    const{deptcode,deptname,deptshort,deptlevel,positiondesc,status} = req.body;
    pool.query('insert into departments(deptcode,deptname,deptshort,deptlevel,positiondesc,status) values ($1,$2,$3,$4,$5,$6)',
    [deptcode,deptname,deptshort,deptlevel,positiondesc,status],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Added with id ${result.id}`);
    })
}

const getDepartment = (req,res) => {
    pool.query('select * from departments order by did asc',(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

const getDepartmentById = (req,res) => {
    const did = parseInt(req.params.id);
    pool.query('select * from departments where did=$1',[did],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
        console.log(result.rows);
    })
}

const updateDepartment = (req,res) => {
    const did = parseInt(req.body.did);
    const{deptcode,deptname,deptshort,deptlevel,positiondesc,status} = req.body;
    pool.query('update departments set deptcode=$1,deptname=$2,deptshort=$3,deptlevel=$4,positiondesc=$5,status=$6 where did=$7',
   [deptcode,deptname,deptshort,deptlevel,positiondesc,status,did],(error,result) => {
       if(error){
           throw error;
       }
       res.status(201).send(`Updated by id ${did}`);
   })
}

const deleteDepartment = (req,res) => {
    const did = parseInt(req.params.id);
    pool.query('delete from departments where did=$1',[did],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Department deleted by id ${did}`);
    })
}

//Employee

const addEmployees = (req,res) => {
    const{empcode,ename,did,posid,doj,qualification,experience,gender,contact,email,status,enddate,jobtype,image} = req.body;
    pool.query('insert into employees(empcode,ename,did,posid,doj,qualification,experience,gender,contact,email,status,enddate,jobtype,image) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)',
    [empcode,ename,did,posid,doj,qualification,experience,gender,contact,email,status,enddate,jobtype,image[0]],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Added with id ${result.id}`);
    })
}

const getEmployee = (req,res) => {
    pool.query('select * from employees order by empid asc',(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

const getEmployeeById = (req,res) => {
    const empid = parseInt(req.params.id);
    pool.query('select * from employees where empid=$1',[empid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

const updateEmployee = (req,res) => {
    const empid = parseInt(req.body.empid);
    const{empcode,ename,did,posid,doj,qualification,experience,gender,contact,email,status,enddate,jobtype,image} = req.body;
    pool.query('update employees set empcode=$1,ename=$2,did=$3,posid=$4,doj=$5,qualification=$6,experience=$7,gender=$8,contact=$9,email=$10,status=$11,enddate=$12,jobtype=$13,image=$14 where empid=$15',
    [empcode,ename,did,posid,doj,qualification,experience,gender,contact,email,status,enddate,jobtype,image[0],empid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Updated by id ${empid}`);
    })
}

const deleteEmployee = (req,res) => {
    const empid = parseInt(req.params.id);
    pool.query('delete from employees where empid=$1',[empid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Employee deleted by id ${empid}`);
    })
}

//Courses

const addCourses = (req,res) => {
    const{cname,ccode,status} = req.body;
    pool.query('insert into courses(cname,ccode,status) values ($1,$2,$3)',
    [cname,ccode,status],(error,result) => {
        if(error){
            throw error;
        }
        res.status(200).send(`Added with id ${result.id}`);
    })
}

const getCourses = (req,res) => {
    pool.query('select * from courses order by cid asc',(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

const getCoursesById = (req,res) => {
    const cid = parseInt(req.params.id);
    pool.query('select * from courses where cid=$1',[cid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

const updateCourses = (req,res) => {
    const cid = parseInt(req.body.cid);
    const{cname,ccode,status} = req.body;
    pool.query('update courses set cname=$1,ccode=$2,status=$3 where cid=$4',
    [cname,ccode,status,cid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Updated by ID ${cid}`);
    })
}

const deleteCourses = (req,res) => {
    const cid = parseInt(req.params.id);
    pool.query('delete from courses where cid=$1',[cid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(200).send(`Deleted by ID ${cid}`)
    })
}

//Users

const addUsers = (req,res) => {
    const {empid,username,password,role,editiong,status,did} = req.body;
    pool.query('insert into users(empid,username,password,role,editiong,status,did) values($1,$2,$3,$4,$5,$6,$7)',
    [empid,username,password,role,editiong,status,did],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Added with ID ${result.id}`)
    })
}

const getUsers = (req,res) => {
    pool.query('select * from users order by uid asc',(error,result) => {
        if(error){
            throw error;
        }
        res.status(202).json(result.rows);
    })
}

const getUsersById = (req,res) => {
    const uid = parseInt(req.params.id);
    pool.query('select * from users where uid=$1',[uid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

const updateUsers = (req,res) => {
    const uid = parseInt(req.body.uid);
    const {empid,username,password,role,editiong,status,did} = req.body;
    pool.query('update users set empid=$1,username=$2,password=$3,role=$4,editiong=$5,status=$6,did=$7 where uid=$8',
    [empid,username,password,role,editiong,status,did,uid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Updated By Id ${uid}`);
    })
}

const deleteUsers = (req,res) => {
    const uid = parseInt(req.params.id);
    pool.query('delete from users where uid=$1',[uid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Deleted Id by ${uid}`);
    })
}

//Students

const addStudents = (req,res) => {
    const{scode,fn,mn,ln,gender,address,dob,doj,qualification,collegename,ref,mobile,email,inqdetail,typeofstudent,status,image} = req.body;
    pool.query('insert into students(scode,fn,mn,ln,gender,address,dob,doj,qualification,collegename,ref,mobile,email,inqdetail,typeofstudent,status,image) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)',
    [scode,fn,mn,ln,gender,address,dob,doj,qualification,collegename,ref,mobile,email,inqdetail,typeofstudent,status,image[0]],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Added with ID ${result.id}`);
    })
}

const getStudents = (req,res) => {
    pool.query('select * from students order by sid asc',(error,result) => {
        if(error){
            throw error;
        }
        res.status(200).json(result.rows);
    })
}

const getStudentsById = (req,res) => {
    const sid = parseInt(req.params.id);
    pool.query('select * from students where sid=$1',[sid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

const updateStudents = (req,res) => {
    const sid = parseInt(req.body.sid);
    const{scode,fn,mn,ln,gender,address,dob,doj,qualification,collegename,ref,mobile,email,inqdetail,typeofstudent,status,image} = req.body;
    pool.query('update students set scode=$1,fn=$2,mn=$3,ln=$4,gender=$5,address=$6,dob=$7,doj=$8,qualification=$9,collegename=$10,ref=$11,mobile=$12,email=$13,inqdetail=$14,typeofstudent=$15,status=$16,image=$17 where sid=$18',
    [scode,fn,mn,ln,gender,address,dob,doj,qualification,collegename,ref,mobile,email,inqdetail,typeofstudent,status,image[0],sid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Updated by ID ${sid}`);
    })
}

const deleteStudents = (req,res) => {
    const sid = parseInt(req.params.id);
    pool.query('delete from students where sid=$1',[sid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Deleted by ID ${sid}`);
    }) 
}

// Upload Image

const upload = (req,res) => {
    if(!req.file){
        console.log('No file recevide');
        return res.send({success:false})
    }
    else{
        return res.send({
            success:true,name:req.file.filename
        })
    }
}

const uploadStudent = (req,res) => {
    if(!req.file){
        console.log('No file recevied');
        return res.send({success:false})
    }
    else{
        return res.send({
            success:true,name:req.file.filename
        })
    }
}

// Batch

const  addBatch = (req,res) => {
    const {bcode,bname,cid,startdate,enddate,status,starttime,endtime,uid,type,grplink} = req.body;
    pool.query('insert into batches(bcode,bname,cid,startdate,enddate,status,starttime,endtime,uid,type,grplink) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
    [bcode,bname,cid,startdate,enddate,status,starttime,endtime,uid,type,grplink],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Added with Id ${result.id}`)
    })
}

const getBatch = (req,res) => {
    pool.query('select * from batches order by bid asc',(error,result) => {
        if(error){
            throw error;
        }
        res.status(200).send(result.rows);
    })
}

const getBatchById = (req,res) => {
    const bid = parseInt(req.params.id);
    pool.query('select * from batches where bid=$1',[bid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(result.rows);
    })
}

const getBatchByUserId = (req,res) => {
    const uid = parseInt(req.params.id);
    pool.query('select * from batches where uid=$1',[uid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(result.rows);
    })
}

const updateBatch = (req,res) => {
    const bid = parseInt(req.body.bid);
    const {bcode,bname,cid,startdate,enddate,status,starttime,endtime,type,grplink} = req.body;
    pool.query('update batches set bcode=$1,bname=$2,cid=$3,startdate=$4,enddate=$5,status=$6,starttime=$7,endtime=$8,type=$9,grplink=$10 where bid=$11',
    [bcode,bname,cid,startdate,enddate,status,starttime,endtime,type,grplink,bid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(200).send(`Updated by ID ${bid}`);
    })
}

const deleteBatch = (req,res) => {
    const bid = parseInt(req.params.id);
    pool.query('delete from batches where bid=$1',[bid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Deleted by ID ${bid}`);
    }) 
}

// Manage Batch

const addManageBatch = (req,res) => {
    const {bid,sid,status} = req.body;
    pool.query('insert into batchstudent(bid,sid,status) values ($1,$2,$3)',
    [bid,sid,status],(error,result) => {
        if(error){
            throw error;
        }
        res.status(200).send(`Added with ${result.id}`);
    })
}

const getManageBatch = (req,res) => {
    pool.query('select * from batchstudent order by bsid asc',(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

const getManageBatchById = (req,res) => {
    const bsid = parseInt(req.params.id);
    pool.query('select * from batchstudent where bsid=$1',[bsid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

const updateManageBatch = (req,res) => {
    const bsid = parseInt(req.body.bsid);
    const {bid,sid,status} = req.body;
    pool.query('update batchstudent set bid=$1,sid=$2,status=$3 where bsid=$4',
    [bid,sid,status,bsid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).send(`Updated by ${bsid}`);
    })
}

const deleteManageBatch = (req,res) => {
    const bsid = parseInt(req.params.id);
    pool.query('delete from batchstudent where bsid=$1',[bsid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(200).send(`Deleted by ${bsid}`)
    })
}

// Join

const getGenDetail = (req,res) => {
    const type = "General";
    pool.query('select bname bn,username un,type bt,startdate st,bid from batches join users on (batches.uid=users.uid) where batches.type=$1',[type],(error,result) => {
        if(error){
            throw error;
        }
        res.status(200).json(result.rows);
    })
}

const getClubDetail = (req,res) => {
    const type = "Club";
    pool.query('select bid,bname bn,username un,type bt,startdate st from batches join users on (batches.uid=users.uid) where batches.type=$1',[type],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

const getOnetooneDetail = (req,res) => {
    const type = "One To One";
    pool.query('select bname bn,username un,type bt,startdate st,bid from batches join users on (batches.uid=users.uid) where batches.type=$1',[type],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

// Different type of Batch

const getGenStudent = (req,res) => {
    const type = "General";
    pool.query('select * from students where typeofstudent=$1 order by sid asc',[type],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

const getClubStudent = (req,res) => {
    const type = "Club";
    pool.query('select * from students where typeofstudent=$1 order by sid asc',[type],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

const getOnetooneStudent = (req,res) => {
    const type = "One To One";
    pool.query('select * from students where typeofstudent=$1 order by sid asc',[type],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

// Get Batch Student in Faculty

const getBatchStudent = (req, res) => {
    const bid = parseInt(req.params.id);
    pool.query("select * from batchstudent join batches using(bid) join students using(sid) where bid=$1", [bid], (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows);
    });
};

// Count 

const countStudent = (req,res) => {
    pool.query('select count(*) as stud from students',(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

const countFaculties = (req,res) => {
    const did = 7;
    pool.query('select count(*) as fac from users where did=$1',[did],(error,result) => {
        if(error){
            throw error;
        }
        res.status(200).json(result.rows);
    })
}

const countCourses = (req,res) => {
    pool.query('select count(*) as cou from courses',(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
}

// Get mail student

const getMailStudent = (req,res) => {
    const bsid = parseInt(req.params.id);
    pool.query('select * from users join batches using(uid) join batchstudent using(bid) join students using(sid) where batchstudent.bsid=$1',
    [bsid],(error,result) => {
        if(error){
            throw error;
        }
         console.log(result.rows);
        
        res.status(201).json(result.rows);
    })
}

// Get Session  

const addSession = (req,res) => {
    const {uid,stime,etime,mon,tue,wed,thu,fri,sat,sun,status} = req.body;
    pool.query('insert into timetable(uid,stime,etime,mon,tue,wed,thu,fri,sat,sun,status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
    [uid,stime,etime,mon,tue,wed,thu,fri,sat,sun,status],(error,request) => {
        if(error){
            throw error;
        }
        res.status(200).send(`Added with `);
    })
} 

const getSessionById = (req,res) => {
    const uid = parseInt(req.params.id);
    pool.query("select s.stime,s.etime,b1.bname mon,b2.bname tue,b3.bname wed,b4.bname thu,b5.bname fri,b6.bname sat,b7.bname sun,s.status from timetable s join batches b1 on (s.mon=b1.bid) join batches b2 on (s.tue=b2.bid) join batches b3 on(s.wed=b3.bid) join batches b4 on(s.thu=b4.bid) join batches b5 on (s.fri=b5.bid) join batches b6 on(s.sat=b6.bid) join batches b7 on(s.sun=b7.bid) where s.uid=$1 order by s.sessid asc",
    [uid],(error,result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows);
    })
    
}

module.exports = {
    addPositions,
    getPositions,
    getPositionsById,
    updatePosition,
    deletePosition,
    addDepartment,
    getDepartment,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
    addEmployees,
    getEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    addCourses,
    getCourses,
    getCoursesById,
    updateCourses,
    deleteCourses,
    addUsers,
    getUsers,
    getUsersById,
    updateUsers,
    deleteUsers,
    upload,
    uploadStudent,
    addStudents,
    getStudents,
    getStudentsById,
    updateStudents,
    deleteStudents,
    getLogin,
    addBatch,
    getBatch,getBatchById,
    updateBatch,
    deleteBatch,
    addManageBatch,
    getManageBatch,
    getManageBatchById,
    updateManageBatch,
    deleteManageBatch,
    getBatchByUserId,
    getGenDetail,
    getClubDetail,
    getOnetooneDetail,
    getGenStudent,
    getClubStudent,
    getOnetooneStudent,
    getBatchStudent,
    countStudent,
    countFaculties,
    countCourses,
    getMailStudent,
    addSession,
    getSessionById
}