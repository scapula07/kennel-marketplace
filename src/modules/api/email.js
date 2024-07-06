import axios from "axios"

const baseUrl="https://kennel-stripe-apis.onrender.com"
export const sendEmail=async(to,text,msg)=>{
       try{
             const url=`${baseUrl}/api/v1/stripe/send-email`


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