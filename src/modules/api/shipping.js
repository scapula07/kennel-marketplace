import axios from "axios"
import { AddressTo$ } from "shippo";
const baseUrl="https://kennel-stripe-apis.onrender.com"
export const shippingApi= {
   
    fetchPercel:async function () {
      try {
        const response = await fetch('https://api.goshippo.com/parcel-templates', {
          method: 'GET',
          headers: {
            'Authorization': 'ShippoToken shippo_test_b5b97e35b37732410ece14bc70a5776ac111d3d5',
            'Content-Type': 'application/json'
          }
        });
  
        const data = await response.json();
        return data?.results;
      } catch (e) {
        console.log(e);
        return null; // Return null or handle error as needed
      }
    },
    createPercel:async function (weight,token,customer) {
      try {
          const response = await fetch('https://api.goshippo.com/parcels/', {
            method: 'POST',
            headers: {
              'Authorization': 'ShippoToken shippo_test_b5b97e35b37732410ece14bc70a5776ac111d3d5',
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
              weight:weight,
              mass_unit: "lb",
              template: token,
              metadata:customer
            })
          });
      
          const data = await response.json();
          return data;
    
      }catch(e){
        console.log(e)
      }
    },
    createShipment:async function (addressTo,addressFrom,parcel){
    
 
          try {
            const response = await fetch('https://api.goshippo.com/shipments/', {
              method: 'POST',
              headers: {
                'Authorization': 'ShippoToken shippo_test_b5b97e35b37732410ece14bc70a5776ac111d3d5',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                address_to:addressTo,
                address_from:addressFrom,
                parcels: [parcel],
                async: false
              })
            });
        
            const data = await response.json();
            return data;
          } catch (e) {
            console.error(e);
            return null;
          }
        
        
   
        
   
    
        },
        getShippingRates:async function (shippingId){
            try{
                  const response = await fetch(`https://api.goshippo.com/shipments/${shippingId}/rates/USD`, {
                    method: 'GET',
                    headers: {
                      'Authorization': 'ShippoToken shippo_test_b5b97e35b37732410ece14bc70a5776ac111d3d5'
                    }
                  });
              
                  const data = await response.json();
                  return data;
          
            }catch(e){
              console.log(e)
            }
        }  
}