import axios from "axios"


export const sendEmail=async(to,text,msg)=>{
       try{
             const url=`http://localhost:3003/api/v1/stripe/send-email`


                const config = {
                    headers:{
                        'Content-Type': 'application/json',
                        },
                    };

        
          
        
                 const response= await axios.post(
                        url,
                        {
                            receiver:to,
                            subject:text,
                            message:msg
                        },
                        config
                  )

                  return true

        }catch(e){
           console.log(e)
           throw new Error(e)
        }
}