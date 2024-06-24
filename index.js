
const express = require('express');
const cors = require('cors');
require('dotenv').config();


// Initilaize App
const app = express();
app.use(express.json());
app.use(cors());



//AI INILIALIZATION
//------------------------------------------------------------------------------------
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyDf9OOV_-aa2tfMs83Fw6pSxUE6Oy2km3Q');
//------------------------------------------------------------------------------------


app.post("/fetchdata" ,async(req,res)=> {
  try {
    const prompt = req.body.prompt;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text)
  } catch (error) {
    console.log("server error")
     res.send("Server error")
}
})


//Activating port
app.listen(5000, () => {
    console.log("API SERVER IS ONLINE");
});
