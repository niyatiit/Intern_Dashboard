import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { DB } from './config/db.js';

const app = express();
const port = process.env.PORT || 3000
DB();


app.use(express.json())
app.use(cors({credentials : true}))

app.get("/",(req,res)=>{
  res.send("Welcome To server File")
})


// Import all the router
import {router} from "./routes/user.route.js"

// Create the Link Here
app.use("/api/auth",router)



app.listen(port ,()=>{
  console.log(`Server is running the port 3000`);
  
})