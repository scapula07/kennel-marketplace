import React,{useState,useEffect,useRef} from 'react'
import Layout from '../../layout'
import { FiSearch,FiArrowRight,FiSmile } from "react-icons/fi";
import breeder from "../../assets/breeder.png"
import { MdOutlineAttachment } from "react-icons/md";
import {doc,setDoc,
     addDoc,collection,
     getDoc,getDocs,
     query, where,updateDoc,orderBy,onSnapshot} from "firebase/firestore"
import { useRecoilValue } from 'recoil';
import { accountTypeState } from '../recoil/state';
import { db } from '../firebase';
import { BeatLoader, ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { calculateTime } from '../util';
import { uploadFile } from '../api/order';


 

export default function Messages() {
     useEffect(() => {
       
          window.scrollTo(0, 0);
     
        
      }, []);
     const currentUser=useRecoilValue(accountTypeState)
     const [currentChat,setCurrentChat] =useState({})
     const [conversations,setConversations]=useState([])
     const [url,setUrl]=useState("")
     const [file,setFile]=useState({})


     const [textsubmit,setTextsubmit]=useState(false)
     const [isLoading,setLoader]=useState(false)
     const [newMessage, setNewMessage] = useState("");
     const [areContacts,setContacts]=useState("")

     const hiddenFileInput = useRef()
     
     const handleClick = event => {
          hiddenFileInput.current.click()
     }


     const handleChange = async(e)=> {
          const dir = e.target.files[0]
          console.log(dir,"dir")
          if (dir) {
          setUrl(URL.createObjectURL(dir))
     

          }
          setFile(dir)
     

     }



   useEffect(()=>{
     const getConversations = async () => {
         try{
         
           console.log(currentUser?.id,"cur conv")
           const q = query(collection(db, "conversations"), where("members", "array-contains",currentUser?.id),orderBy("lastMessage", "desc"));
           const unsubscribe = onSnapshot(q, (querySnapshot) => {
             const convs= [];
             querySnapshot.forEach((doc) => {
                  console.log("qqqqqqqqqq")
                 convs.push({...doc?.data(),id:doc?.id});
                 console.log(doc?.id,"id")
              
             });
                console.log(convs,"convssssss")
                convs?.length===0 &&setContacts("No contact")
                convs?.length >0 &&setContacts("")
             setConversations(convs)
           })
           
     
        
          }catch(error){
           console.log(error)
         }
       };

       if(currentUser?.id?.length >0){
         getConversations();
       }
       
  
      },[currentUser?.id])  


      const send=async (e)=>{
          console.log(newMessage,"sending")
          if (newMessage?.length == 0) {
            return;
          }
          e.preventDefault();
          setLoader(true)
  
          console.log(currentUser,"user >.>>>")
           let img=""
          if(url?.length >0){
              img=await uploadFile(file)

          }
          
          const message = {
            sender:currentUser?.id,
            text: newMessage,
            img:img,
            conversationid:currentChat?.id,
            date:Number(Date.now()),
            time:new Date()
          };

         
       
   
            setTextsubmit(false)
          try{
            
                const docRef = await addDoc(collection(db, "messages"),message);
          
               const docSnap = await getDoc(docRef);
               await updateDoc(doc(db,"conversations",currentChat?.id), {
                     lastText:newMessage,
                     lastMessage:Number(new Date())
                  })
               docSnap?.exists()&& setNewMessage("")
               docSnap?.exists()&& setLoader(false)
               docSnap?.exists()&&setFile({})
               docSnap?.exists()&&setUrl("")
             
             
  
         
        
              }catch (err) {
                console.log(err)
                setLoader(false)
            }
        }
  

      
  return (
    <Layout>
                <div className='w-full flex justify-center h-screen py-8'>
                      <div className='flex bg-white w-4/6 h-full rounded-lg'>
                            <div className='w-2/5 border-r h-full flex-col px-6'>
                                  <div className='py-6 '>
                                     <h5 className='text-xl font-semibold'>All messages</h5>
                                  </div>
                                  <div className='border py-2 px-3 rounded-lg flex w-full justify-between'>
                                         <input
                                            placeholder='Search'
                                            className='outline-none border-0 w-full'
                                            />
                                            <FiSearch
                                            className='text-slate-600'
                                            />

                                        </div>
                                    
                                    <div className='flex flex-col py-4 space-y-8'>
                                         {conversations?.map((conv,index)=>{
                                                  console.log(index,"")
                                                 return(
                                                   <Contact 
                                                       conv={conv}
                                                       setCurrentChat={setCurrentChat}
                                                       index={index}
                                                       currentUser={currentUser}
                                                    />
                                                 )
                                            })
                                           }

                                          {conversations?.length ===0&&areContacts?.length ==0&&
                                             <div className='w-full flex justify-center py-10 '>
                                                  <ClipLoader 
                                                       color={"orange"}
                                                       loading={true}
                                                       size={12}
                                                  />
                                             </div>
                                             }
                                                       
                                                       {conversations?.length ===0&&areContacts?.length >0&&
                                                       <div className='w-full flex justify-center  py-10'>
                                                       <h5 className="text-sm">No contacts</h5>
                                                       </div>
                                                       }

                                    </div>


                            </div>

                           <div className='w-full h-full flex flex-col relative  '>
                                  <div className='flex items-center justify-between absolute top-0 py-4 border-b w-full px-5 '>
                                  {currentChat?.id?.length >0&&
                                        <div className='flex items-center space-x-6'>
                                        {currentChat?.img?.length >0?
                                             <img
                                                 src={currentChat?.img} 
                                                 className="h-10 w-10 rounded-full"
                                             />
                                                  :
                                                  <h5 className='rounded-full bg-orange-400 text-white text-lg font-semibold h-10 w-10 flex items-center justify-center'>{currentChat?.name?.slice(0,1)}</h5>
                                                       
                                             }
                                             

                                            <h5 className='text-lg font-light'>{currentChat?.name}</h5>


                                        </div>

                                       }

                                        <div className='flex items-center space-x-8 justify-end'>
                                                  {/* <button className='text-blue-600 py-1.5 text-sm space-x-4 px-4 rounded-lg flex justify-center space-x-4 items-center  border border-blue-600 ' >
                                                        Archive
                                                

                                                    </button> */}
                                             {currentChat?.id?.length >0&&
                                                   
                                                    <button className='text-blue-600 py-1.5 text-sm space-x-4 px-4 rounded-lg flex justify-center space-x-4 items-center  border border-blue-600 ' >
                                                        <span>Go to seller page</span>
                                                        <FiArrowRight
                                                            className='text-xl' 
                                                        />
                                                

                                                    </button>
                                                            }
                                             

                                        </div>
                                    
                                    </div>

                                    <div className=' h-full pt-20 flex flex-col   '>
                                          <div className=' h-4/5 w-full overflow-y-scroll'>
                                                <ChatBox
                                                    currentChat={currentChat}
                                                    currentUser={currentUser}
                                                 />

                                                 

                                          </div>
                                          <div className=' h-1/3 w-full px-6 py-3'>
                                              <div className='flex flex-col border rounded-xl bg-white h-full px-6 py-2 space-y-2' >
                                                  {url?.length==0?
                                                          <input 
                                                          placeholder='Enter a message'
                                                          className='outline-none text-black'
                                                          value={newMessage}
                                                          onChange={(e)=>setNewMessage(e.target.value)}
                                                          
                                                       />
                                                       :
                                                       <div className='flex flex-col space-y-1 '>
                                                            <img 
                                                             src={url}
                                                             className="w-8 h-8"
                                                            />
                                                            <h5 className='text-xs font-semibold'>
                                                              {file?.name}

                                                            </h5>

                                                            <input 
                                                                 placeholder='Enter caption'
                                                                 className='outline-none text-black text-xs'
                                                                 value={newMessage}
                                                                 onChange={(e)=>setNewMessage(e.target.value)}
                                                          />
                                                          
                                                       </div>

                                                  }
                                               
                                                   <div className='flex justify-end'>
                                                        <div className='flex items-center space-x-2'>
                                                              {/* <FiSmile 
                                                                 className='text-slate-700 text-2xl'
                                                               
                                                               /> */}
                                                              <MdOutlineAttachment
                                                                    className='text-slate-700 text-2xl'
                                                                    onClick={handleClick}
                                                               />
                                                                     <input
                                                                           type="file"
                                                                           className='hidden'
                                                                           ref={hiddenFileInput}
                                                                           onChange={handleChange}
                                                                           />

                                                      {isLoading?
                                                                 <BeatLoader
                                                                 color={"rgba(62, 51, 221, 1)"}
                                                                 loading={true}
                                                                 size="6"
                                                                 
                                                                 />
                                                                 :

                                                              <button className='py-2 px-4 text-sm rounded-lg text-white bg-green-900 rounded-lg'
                                                              onClick={send}
                                                              >
                                                                 Send
                                                              </button>
                                                            }

                                                        </div>

                                                   </div>

                                              </div>
                                             

                                         </div>

                                    </div>
                            
                            </div>

                      </div>

                </div>

    </Layout>

  )
}






const Contact=({conv,setCurrentChat,index,currentUser})=>{
     const [receiver,setReceiver]=useState({})
     const [products,setProducts]=useState([])

   
    
       useEffect(()=>{
       
         if(conv?.members?.length != undefined){
              const id=conv?.members?.filter(u=>u !=currentUser?.id)
           const unsub = onSnapshot(doc(db,"users",id[0]), (doc) => {
             console.log(doc.data(),"daa")
             const { id, ...rest } = doc.data()
             setReceiver({...rest,receiverId:doc?.id})

           if(index==0){
               console.log("here")
               setCurrentChat({...conv,...{...rest,receiverId:doc?.id}})
            }


            });
           }
          },[])

   
         
       console.log(conv,"oo")
      return(

          <div className='w-full flex flex-col space-y-1 hover:bg-slate-100 rounded-lg px-2 py-1 border-b border-slate-100' 
            onClick={()=>setCurrentChat({...conv,...receiver})}
          >
          <div className='w-full flex items-center space-x-3'>
               <div className='flex items-center space-x-2'>
                    <h5 className='h-2 w-2 rounded-full bg-green-900'></h5>
                    {receiver?.img?.length >0?
                          <img
                          src={receiver?.img} 
                         className="h-10 w-10 rounded-full"
                        />
                        :
                        <h5 className='rounded-full bg-orange-400 text-white text-lg font-semibold h-10 w-10 flex items-center justify-center'>{receiver?.name?.slice(0,1)}</h5>
                         }
                   
               </div>

               <div className='flex flex-col '>
                    <h5 className='text-slate-700 text-sm font-semibold'>{receiver?.name}</h5>
                    <h5 className='text-xs font-light text-slate-600'>{calculateTime(conv?.lastMessage)}</h5>
                    
               </div>
            

          </div>

          <div className='w-full'>
            <p className=' text-xs font-light text-slate-800'>{conv?.lastText?.slice(0,100)}...</p>
          </div>

   </div>


      )
}






const ChatBox=({currentChat,currentUser})=>{
     const chatRef= useRef(null);
     const [msgs,setMsg]=useState([])

     useEffect(()=>{
          if(currentChat?.id?.length >0){
            console.log(currentChat?.id,"chat id")
             const q = query(collection(db, "messages"), where("conversationid", "==", currentChat?.id),orderBy("date", "asc"));
            // const q = query(collection(db, "messages"), where("conversationid", "==", currentChat?.id));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const msgs= [];
                querySnapshot.forEach((doc) => {
                    msgs.push({...doc?.data(),id:doc?.id});
                });
              
                setMsg(msgs)
              });
            return () => {
                unsubscribe()
   
            };
        }
        
     
    }

    ,[currentChat?.id])  

    useEffect(() => {
     if (chatRef.current) {
       chatRef.current.scrollTop = chatRef.current.scrollHeight;
     }
   },[msgs])



      return(
          <div className='flex flex-col py-4 overflow-y-scroll space-y-6 h-full'  ref={chatRef}>
               {msgs?.map((msg,index)=>{
                     return(

                         <div className={`flex ${msg?.sender !=currentUser?.id?`justify-start` :`justify-end`} w-full`}>
                                  <Msg
                                      msg={msg}
                                      currentChat={currentChat}
                                      currentUser={currentUser}
                                      index={index}
                                   />
                         </div>
                       
                     )
               })

               }


                    {msgs?.length===0&&
                    <div className='flex justify-center py-6'>
                         <h5 className='text-sm font-light '>No messages</h5>
                    </div>

                    }

          </div>
      )
}





const Msg=({msg,currentChat,currentUser,index})=>{
        
      
         
      return(
        <div className='flex flex-col space-y-2'>
           {msg?.img?.length >0 &&
               
               <div className={`flex px-4 ${msg?.sender !=currentUser?.id?`justify-start` :`justify-end`} w-full`}>
                    <img src={msg?.img}
                     className="w-16 h-16 rounded-sm"
                    />
               </div>
                }
             
 
          <div className='flex px-4 space-x-2'>
               {msg?.sender !=currentUser?.id&&
                     <> 
                     {currentChat?.img?.length >0?
                         <img 
                         src={currentChat?.img}
                         className="h-6 w-6 rounded-full"
                         />
                         :
                         <h5 className='rounded-full bg-orange-400 text-white text-xs font-semibold h-6 w-6 flex items-center justify-center'>{currentChat?.name?.slice(0,1)}</h5>
                    
     
     
                    }
                    </>

               }
            


                <div className={`flex flex-col w-11/12 ${msg?.sender !=currentUser?.id?'bg-blue-100 px-6 py-1.5 rounded-lg text-slate-600 font-light':"bg-slate-100 px-6 py-1.5 rounded-lg text-slate-600 font-light"}`}>
                   <p>{msg?.text}</p>
                </div>
               
               
              

          </div>
          <h5  className={`flex text-xs text-slate-600 px-4 ${msg?.sender !=currentUser?.id?`justify-start` :`justify-end`} w-full`}>
               {calculateTime(msg?.time)}
               </h5>
          </div>
      )
}