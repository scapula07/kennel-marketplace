import { auth,db } from "../firebase";
import axios from "axios";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"


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
                              deliveryStatus:"",
                              delivery
                            });
                      
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
       signContract:async function (order) {
        try{
             const ref =doc(db,"order",order?.id)
             const docSnap = await getDoc(ref);
             const res=  await updateDoc(doc(db,"orders",order?.id), {
                    contract:"signed",
                })
  

                return true

        }catch(e){
            console.log(e)
        }
        
   },
   sentPackage:async function (order) {
    try{
         const ref =doc(db,"order",order?.id)
         const docSnap = await getDoc(ref);
         const res=  await updateDoc(doc(db,"orders",order?.id), {
                deliveryStatus:"sent",
            })


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
   completeOrder:async function (order) {
    try{
         const ref =doc(db,"order",order?.id)
         const docSnap = await getDoc(ref);
         const res=  await updateDoc(doc(db,"orders",order?.id), {
                status:"completed",
         })


            return true

    }catch(e){
        console.log(e)
    }
   },
   cancelOrder:async function (order) {
    try{
         const ref =doc(db,"order",order?.id)
         const docSnap = await getDoc(ref);
         const res=  await updateDoc(doc(db,"orders",order?.id), {
                status:"cancelled",
         })


            return true

    }catch(e){
        console.log(e)
    }
   }

}