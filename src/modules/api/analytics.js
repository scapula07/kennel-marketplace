import axios from "axios"


const baseUrl="https://kennel-stripe-apis-2kmp.onrender.com"

export const analyticApi= {
   userAnalytics:async function () {
         try{
            const url=`${baseUrl}/api/v1/stripe/get-report-users`
    

             const config = {
                headers:{
                    'Content-Type': 'application/json',
                    },
                };
    
            
               
            
                const response= await axios.get(
                        url,
                        config
                   )
                  return response

         }catch(e){
            console.log(e)
         }
    },
    productAnalytics:async function () {
        try{
            const url=`${baseUrl}/api/v1/stripe/get-report-products`
    

            const config = {
               headers:{
                   'Content-Type': 'application/json',
                   },
               };
   
           
              
           
               const response= await axios.get(
                       url,
                       config
                  )
                 return response
        }catch(e){
           console.log(e)
        }
   },
   locationAnalytics:async function () {
      try{
         const url=`${baseUrl}/api/v1/stripe/get-report-cities`
 

          const config = {
             headers:{
                 'Content-Type': 'application/json',
                 },
             };
 
         
            
         
             const response= await axios.get(
                     url,
                     config
                )
               return response

      }catch(e){
         console.log(e)
      }
 },
}