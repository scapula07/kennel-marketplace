import axios from "axios"

export const stripeApi= {
    createAccount:async function () {
          try{
              
        const url=`http://localhost:3003/api/v1/stripe/get-link`
    

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
    checkout:async function (order) {
        try{
                          
          const url=`http://localhost:3003/api/v1/stripe/payment`
      

          const config = {
              headers:{
                  'Content-Type': 'application/json',
                  },
              };

          
            
          
              const response= await axios.post(
                      url,
                      {
                        product:order?.products[0],
                        accountId:"acct_1OzRG4P0mVZ3h5tm"
                      },
                      config
                )
                return response
         }catch(e){
              console.log(e)
         }

    }
}