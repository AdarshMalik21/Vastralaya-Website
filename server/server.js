import express from 'express'

const app = express();
const PORT = 8000;

app.get('/',(req,res) =>{
    res.end("Server started successfully")
})
app.listen(PORT)