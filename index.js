const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());//req.body

//ROUTES

//create a StudentList
app.post('/students', async(req,res)=> {
    try{
       const {first_name, last_name, book_name, author, borrowed_by,date_of_borrow, expected_data_of_return} = req.body;
     const newStudent = await pool.query("INSERT INTO booksList (first_name, last_name, book_name, author, borrowed_by,date_of_borrow, expected_data_of_return) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *", [first_name, last_name, book_name, author, borrowed_by,date_of_borrow, expected_data_of_return]
     );

     res.json(newStudent.rows[0]);
    }catch(err) {
        console.log(err);
    }
})
//Get All Students
app.get('/students', async(req,res)=> {
    try{
        const allStudents = await pool.query("SELECT * FROM booksList");
        res.json(allStudents.rows);
    }catch(err){
        console.log(err)
    }
})
//Get a Student
app.get('/students/:id', async(req,res)=> {
    try{
        const {id} = req.params;
        const studends = await pool.query("SELECT * FROM booksList WHERE s_no = $1", [id]);
        res.json(studends.rows[0]);
    }catch(err){
        console.log(err);
    }
})
//Update a Students
app.put('/students/:id', async(req,res)=> {
     try {
         const {id} = req.params;
         const {first_name, last_name, book_name, author, borrowed_by,date_of_borrow, expected_data_of_return} = req.body;
         const updateStudents = await pool.query("UPDATE booksList SET (first_name, last_name, book_name, author, borrowed_by,date_of_borrow, expected_data_of_return) = ($1,$2,$3,$4,$5,$6,$7)  WHERE s_no = $8", [first_name, last_name, book_name, author, borrowed_by,date_of_borrow, expected_data_of_return, id]);
         res.json("Student Book List Updated!!")
     }catch(err){
         console.log(err);
     }
})
//Delete a Students
app.delete('/students/:id', async(req,res)=> {
    try{
        const {id} = req.params;
        const delStudends = await pool.query("DELETE FROM booksList WHERE s_no = $1", [id]);
        res.json("Student BookList Deleted!!");
    }catch(err){
        console.log(err);
    }
})
//Port Listening
app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
});