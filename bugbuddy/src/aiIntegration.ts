import axios from 'axios';


async function getAIResponse(prompt: string): Promise<string> {
   const apiURl = 'http://localhost:3000';


   try{
       const response = await axios.post(apiURl, {prompt});
       return response.data.bot.trim;
   }
   catch(error){
       console.error("Error in getAIResponse");
       return 'Something went wrong';
   }
}


export {getAIResponse};

