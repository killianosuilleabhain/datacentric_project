var mysql = require('promise-mysql')

var pool

mysql.createPool({
    connectionLimit : 3,
    host            : 'localhost',
    user            : 'root',
    password        : 'Shanacavass1',
    database        : 'collegedb'
  })
    .then((result) => {
        pool = result
    })
    .catch((error) => {
        console.log(error)
    })

var getModules = function(){
    return new Promise((reslove, reject) => { 
    pool.query('select * from module')
        .then((result)=>{
            reslove(result)
        })
        .catch((error)=>{
            reject(error)
        })
    })
}

var getStudents = function(sid){
    return new Promise((reslove, reject) => { 
    pool.query('select * from student')
        .then((result)=>{
            reslove(result)
        })
        .catch((error)=>{
            reject(error)
        })
    })
}

var getStudent = function(sid){
    return new Promise((resolve, reject) => {
        var myQuery = {
        sql: 'select * from student where sid = ?',
        values: [sid]
    }
    pool.query(myQuery)
    .then((result)=>{
        reslove(result)
    })
    .catch((error)=>{
        reject(error)
    })
    })
}

var deleteStudent = function(student_sid){
    return new Promise((resolve, reject) =>{
        var myQuery ={
            sql: 'delete from student where sid=?',
            values: [sid]
        }
        pool.query(myQuery)
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

    module.exports = {getModules, getStudents, getStudent, deleteStudent}