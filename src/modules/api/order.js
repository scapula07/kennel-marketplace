import { auth,db } from "../firebase";
import axios from "axios";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { sendEmail } from "./email";

export const uploadFile=async(file)=>{
    console.log("Uploading")
    const storage = getStorage();
    const fileId=Math.random().toString(36).substring(2,8+2);
    const storageRef = ref(storage, `/${fileId}`);
    console.log(storageRef,"shote")
    const snapshot=await uploadBytes(storageRef, file)

    return `https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`

}

export const orderApi= {
    create:async function (products,user,delivery,total) {

              const orders = {};
            
           try{
                  
                        const orderPromises = products.map(async (product) => {
                            const total = parseFloat(product.price); // Total price for the order is just the price of the product
                      
                            const snap = await addDoc(collection(db, "orders"), {
                              products:[product], // Place the product in an array to match the structure of orders
                              creator: user?.id,
                              vendor: product.vendor, // Assuming each product has a vendor
                              status: "active",
                              total: total.toFixed(2), // Round total to 2 decimal places
                              paid: false,
                              contract: "waiting",
                              time: Number(new Date()),
                              deliveryStatus:"pending",
                              shipmentId:"",
                              delivery
                            });


                              try{
                                const ref=doc(db,product?.type==="product"?"products":"services",product?.id)
                                const docSnap = await getDoc(ref);
                                const newQty=Number(docSnap?.data()?.qty)-Number(product?.qty)
                                if(product?.type==="product"){
                                    await updateDoc(doc(db,"products",product?.id),
                                      {
                                        qty:newQty
                                    
                                      })

                                   }
                          
                                    await addDoc(collection(db, "notifications"), {
                                          type:"Order update",
                                          to:product.vendor,
                                          from:user,
                                          order:snap?.id,
                                          product:product,
                                          msg:"New order",
                                          date:new Date()
                                    });
                                    await updateDoc(doc(db, "misc",product.vendor), {
                                       notifications:true,
                                    });
                                    await updateDoc(doc(db,"misc",user?.id), {
                                      cart:[]
                                    })
                                    sendEmail(user?.email,user?.name,'created',snap?.id,`has been confirmed!!,Product name:${product?.name},amount:${product?.price}`)
                               }catch(e){
                                    console.log(e)
                                    throw new Error(e)
                              }

                            return snap;
                          });


                      
                          return Promise.all(orderPromises);
                  
                        }catch(e){
                            console.log(e)
                            throw new Error(e)
                        }

       },
       uploadContract:async function (order,file,product,user,customer) {
            try{
                const url=await uploadFile(file)
                 console.log(url,"uu")

                const ref =doc(db,"order",order?.id)
                const docSnap = await getDoc(ref);
                 const res=  await updateDoc(doc(db,"orders",order?.id), {
                        contract:"sent",
                        file:url
                    })
                    console.log(res,"resss")
                    await addDoc(collection(db, "notifications"), {
                      type:"Order update",
                      to:order?.creator,
                      from:user,
                      order:order?.id,
                      product:{img:product?.images[0]},
                      msg:"Contract sent! Your order has been confirmed!!",
                      date:new Date()
                  });

                  await updateDoc(doc(db, "misc",order?.creator), {
                    notifications:true,
             
                 });
                 sendEmail(customer?.email,customer?.name,',contract sent',order?.id,`contract has been sent!!`,`Order id:${order?.id},Product name:${product?.name},amount:${product?.price}`)
    
                    return true

            }catch(e){
                console.log(e)
            }
       },
       signContract:async function (order,vendor,product,user) {
        try{
             const ref =doc(db,"order",order?.id)
             const docSnap = await getDoc(ref);
             const res=  await updateDoc(doc(db,"orders",order?.id), {
                    contract:"signed",
                })
  
                await addDoc(collection(db, "notifications"), {
                  type:"Order update",
                  to:vendor?.id,
                  from:user,
                  order:order?.id,
                  product:{img:product?.images[0]},
                  msg:"Contract sent",
                  date:new Date()
              });

              await updateDoc(doc(db, "misc",vendor?.id), {
                notifications:true,
                })
             
             try{
                   sendEmail(vendor?.email,vendor?.name,',contract signed',order?.id,`contract has been signed!!!`,`Order id:${docSnap?.id},Product name:${product?.name},amount:${product?.price} , Please message seller on app to discuss how to receive your package.`)
                  }catch(e){
                    console.log(e)
              }
                return true

        }catch(e){
            console.log(e)
        }
        
   },
   sentPackage:async function (order,customer,user,product) {
    try{
         const ref =doc(db,"order",order?.id)
          const docSnap = await getDoc(ref);
          const res=  await updateDoc(doc(db,"orders",order?.id), {
                deliveryStatus:"sent",
            })
            await addDoc(collection(db, "notifications"), {
              type:"Order update",
              to:order?.creator,
              from:user,
              order:order?.id,
              product:{img:product?.images[0]},
              msg:"Your package is on the way",
              date:new Date()
          });

          await updateDoc(doc(db, "misc",order?.creator), {
            notifications:true,
            })
            try{
                 sendEmail(customer?.email,customer?.name,'delivery is on the way',order?.id,`,Your Package has been sent!`,`Order id:${docSnap?.id}, Please message seller on app to discuss how to receive your package.`)
                  }catch(e){
                    console.log(e)
              }
    


            return true

    }catch(e){
        console.log(e)
    }
   },
   deliveredPackage:async function (order) {
    try{
         const ref =doc(db,"order",order?.id)
         const docSnap = await getDoc(ref);
         const res=  await updateDoc(doc(db,"orders",order?.id), {
                deliveryStatus:"delivered",
            })


            return true

    }catch(e){
        console.log(e)
    }
   },
   completeOrder:async function (order,user) {
    try{
         const ref =doc(db,"order",order?.id)
         const docSnap = await getDoc(ref);
         const res=  await updateDoc(doc(db,"orders",order?.id), {
                status:"completed",
         })


         try{
            sendEmail(user?.email,user?.name,'completed',order?.id,`, is completed`,`Order id:${docSnap?.id} , Please leave a review!  Dispute or for product return,please contact seller on app or report to admin.Phone number +11111111111 `)
              }catch(e){
                console.log(e)
          }


            return true

    }catch(e){
        console.log(e)
    }
   },
   cancelOrder:async function (order,user,product,reason) {
    try{
         const ref =doc(db,"order",order?.id)
         const docSnap = await getDoc(ref);
         const res=  await updateDoc(doc(db,"orders",order?.id), {
                status:"cancelled",
         })
         await addDoc(collection(db, "notifications"), {
          type:"Order update",
          to:order?.vendor,
          from:user,
          order:order?.id,
          product:{img:product?.images[0]},
          msg:`Cancelled!${reason}`,
          date:new Date()
      });

        await updateDoc(doc(db, "misc",order?.vendor), {
           notifications:true,
         })
            try{
            sendEmail(user?.email,`Kennel Breeder,Order cancelled!!`,`Order id:${docSnap?.id}`)
              }catch(e){
                console.log(e)
              }

            return true

    }catch(e){
        console.log(e)
    }
   },
   updateOrderShipment:async function (order,shipmentId) {
    try{
         const ref =doc(db,"order",order?.id)
         const docSnap = await getDoc(ref);
         const res=  await updateDoc(doc(db,"orders",order?.id), {
                shipmentId:shipmentId,
         })

        return true

    }catch(e){
        console.log(e)
    }
  },
  updateDeliveryRate:async function (order,rate) {
    try{
         const ref =doc(db,"order",order?.id)
         const docSnap = await getDoc(ref);
         const res=  await updateDoc(doc(db,"orders",order?.id), {
                rate:rate,
         })

        return true

    }catch(e){
        console.log(e)
    }
  }


}


