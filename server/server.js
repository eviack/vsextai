import OpenAI from "openai";
import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";


dotenv.config();


const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY
});


const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
   res.status(200).send({
       message: 'working fine'
   });
})


app.post('/', async(req, res) => {
   try{
       const prompt = req.body.prompt
       const response = await openai.completions.create({
           model: "gpt-3.5-turbo-instruct",
           prompt: "write a function in python to add two numbers",
           temperature: 0,
           max_tokens: 3000,
           top_p: 1,
           frequency_penalty: 0.5,
           presence_penalty: 0,
       })
       res.status(200).send({
           bot: response.choices[0].text
       })


   }
   catch(error){
       console.log(error)
       res.status(500).send({error})
   }
})


app.listen(3000, () => {
   console.log("Server is running on port http://localhost:3000")
})

