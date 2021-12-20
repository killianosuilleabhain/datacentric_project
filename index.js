var express = require ('express')
var mySQLDAO = require('./mySQLDAO')
var mongoDAO = require('./mongoDAO')
var bodyParser = require('body-parser')

var app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:false}))

//Home Page
app.get('/', (req,res) => {
    mySQLDAO.getModules()
    .then((result) => {
        res.render('home')
    })
    .catch((error) =>{
        res.send(error)
    })
})

//Making the url listmodules
app.get('/listModules', (req,res) => {
    mySQLDAO.getModules()
    .then((result) => {
        res.render('showModule', {modules:result})
    })
    .catch((error) =>{
        res.send(error)
    })
})

//Studnent listS
app.get('/listStudents', (req,res) => {
    mySQLDAO.getStudents()
    .then((result) => {
        res.render('showStudent', {students:result})
    })
    .catch((error) =>{
        res.send(error)
    })
})

app.get('/listStudents/:student', (req,res) => {
    mySQLDAO.getStudent(req.params.student)
        .then((result) => {
            res.render(result)
        })
        .catch((error) =>{
            res.send(error)
        })
})

app.get('/listLecturers', (req, res) =>{
    res.redirect('/lecture')
})

app.get('/lecture', (req, res)=>{
    mongoDAO.getLecturers()
    .then((documents)=>{
        res.send(documents)
        res.render('showLecturers', {lecturers:result})
    })
    .catch((error) => {
        res.send(error)
    })
})

app.get('/addLecturer',(req,res)=>{
    res.render("addLecturer")
})

app.post('/addLecturer', (req, res) =>{
    mongoDAO.addLecturer(req.body._id, req.body.name, req.body.dept)
    .then((result) => {
        res.redirect("/lecturers")
    })
    .catch((error) => {
        if(error.message.includes("11000")){
            res.send("Error Lecturer With ID " + req.body._id+ "already exists")
        }else{
            reject(error.message)
        }
        
    })
})

app.listen(3000, () => {
    console.log("Listening on Port 3000")
})

