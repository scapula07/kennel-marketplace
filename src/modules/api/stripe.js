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
    retrieveAccount:async function (user) {
          try{
              
        const url=`http://localhost:3003/api/v1/stripe/get-Account`


        const config = {
            headers:{
                'Content-Type': 'application/json',
                },
            };

        
          
        
            const response= await axios.post(
                    url,
                    {
                        accountId:user?.payments[0]?.accountId
                    },
                    config
              )
              return response
              
          }catch(e){
            console.log(e)
          }

    },
    completeOnboarding:async function (user) {
                try{
                    
              const url=`http://localhost:3003/api/v1/stripe/get-onboarding-link`


              const config = {
                  headers:{
                      'Content-Type': 'application/json',
                      },
                  };

              
                
              
                  const response= await axios.post(
                          url,
                          {
                              accountId:user?.payments[0]?.accountId
                          },
                          config
                    )
                    return response
                    
                }catch(e){
                  console.log(e)
                }

          },

    checkout:async function (vendor,product,order) {
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
                        product:product,
                        accountId:vendor?.payments[0]?.accountId,
                        qty:order?.products[0]?.qty,
                        orderId:order?.id
                      },
                      config
                )
                return response
         }catch(e){
              console.log(e)
         }

    }
}