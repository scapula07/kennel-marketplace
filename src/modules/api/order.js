import { auth,db } from "../firebase";
import axios from "axios";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { sendEmail } from "./email";

const uploadFile=async(file)=>{
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
              console.log(products,"products")
              const orders = {};
           try{
                        // products.forEach(product => {
                        //     const vendor = product.vendor;
                        //     if (!orders[vendor]) {
                        //     orders[vendor] = [];
                        //     }
                        //     orders[vendor].push(product);
                        // });
                        // const ordersArray = Object.values(orders);
                        // console.log(ordersArray,"aordr arr")

                        // const orderPromises = products.map(async (orderProducts) => {
                        //     const total = orderProducts.reduce((acc, curr) => acc + parseFloat(curr.price), 0); // Calculate total price for the order
                        
                        //     const snap = await addDoc(collection(db, "orders"), {
                        //       products: orderProducts,
                        //       creator: user?.id,
                        //       vendor: orderProducts[0].vendor, // Assuming all products in the order have the same vendor
                        //       status: "active",
                        //       total: total.toFixed(2), // Round total to 2 decimal places
                        //       paid: false,
                        //       contract: "waiting",
                        //       time: Number(new Date()),
                        //       delivery
                        //     });
                        
                        //     return snap;
                        //   });
                        
                        //   return Promise.all(orderPromises);

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
                              delivery
                            });
                                        try{
                                            sendEmail(user?.email,`Kennel Breeder,Order confirmed!!`,`Order id:${snap?.id},Product name:${product?.name},amount:${product?.price}`)
                                        }catch(e){
                                            console.log(e)
                                        }

                            return snap;
                          });


                      
                          return Promise.all(orderPromises);
                  
                        }catch(e){
                            console.log(e)
                        }

       },
       uploadContract:async function (order,file) {
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
    
                    return true

            }catch(e){
                console.log(e)
            }
       },
       signContract:async function (order,vendor,product) {
        try{
             const ref =doc(db,"order",order?.id)
             const docSnap = await getDoc(ref);
             const res=  await updateDoc(doc(db,"orders",order?.id), {
                    contract:"signed",
                })
  
             
             try{
                   sendEmail(vendor?.email,`Kennel Breeder,Contract has been signed!!!`,`Order id:${docSnap?.id},Product name:${product?.name},amount:${product?.price} , Please message seller on app to discuss how to receive your package.`)
                  }catch(e){
                    console.log(e)
              }
                return true

        }catch(e){
            console.log(e)
        }
        
   },
   sentPackage:async function (order,customer) {
    try{
         const ref =doc(db,"order",order?.id)
          const docSnap = await getDoc(ref);
          const res=  await updateDoc(doc(db,"orders",order?.id), {
                deliveryStatus:"sent",
            })

            try{
                sendEmail(customer?.email,`Kennel Breeder,Your Package has been sent!`,`Order id:${docSnap?.id}, Please message seller on app to discuss how to receive your package.`)
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
            sendEmail(user?.email,`Kennel Breeder,Order is complete`,`Order id:${docSnap?.id} , Please leave a review!  Dispute or for product return,please contact seller on app or report to admin.Phoen number +11111111111 `)
              }catch(e){
                console.log(e)
          }


            return true

    }catch(e){
        console.log(e)
    }
   },
   cancelOrder:async function (order,user) {
    try{
         const ref =doc(db,"order",order?.id)
         const docSnap = await getDoc(ref);
         const res=  await updateDoc(doc(db,"orders",order?.id), {
                status:"cancelled",
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
   }

}


