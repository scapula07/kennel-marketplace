import React,{useState,useEffect,useRef} from 'react'
import Layout from '../../layout'
import { IoCameraOutline } from "react-icons/io5";
import {doc,setDoc,
    addDoc,collection,
    getDoc,getDocs,
    query, where,updateDoc,orderBy,onSnapshot} from "firebase/firestore"
import { useRecoilValue } from 'recoil';
import { accountTypeState } from '../recoil/state';
import { db } from '../firebase';
import { profileApi } from '../api/profile';
import { ClipLoader } from 'react-spinners';
import {BeatLoader } from 'react-spinners';


export default function Profile() {
       useEffect(() => {
          window.scrollTo(0, 0);
      }, []);
       const [profile,setProfile]=useState()
       const currentUser=useRecoilValue(accountTypeState)
       const [url,setUrl]=useState("")
       const [file,setFile]=useState({})
       const [isLoading,setLoader]=useState(false)
       const [loading,setLoading]=useState(false)

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
       
        if(currentUser?.id?.length != undefined){
          const unsub = onSnapshot(doc(db,"users",currentUser?.id), (doc) => {
            console.log(doc.data(),"daa")
        
            setProfile({...doc.data(),id:doc?.id})
           });
          }
         },[])



         const upload=async()=>{
                setLoader(true)
                try{
                    const res=await profileApi.updateImg(currentUser,profile,file)
                    setLoader(false)
                 }catch(e){
                    console.log(e)
                    setLoader(false)
                 }

         }

         const saveProfile=async()=>{
            setLoading(true)
             try{
                 const res=await profileApi.saveChanges(currentUser,profile,file)
                 setLoading(false)
             }catch(e){
                console.log(e)
                setLoading(false)
             }

              }
       const saveEmail=async()=>{
                setLoading(true)
                 try{
                     const res=await profileApi.updateImg(currentUser,profile,file)
                     setLoading(false)
                 }catch(e){
                    console.log(e)
                    setLoading(false)
                 }
    
         }

  return (
    <Layout>
            <div className='w-full h-full flex justify-center py-10'>
                 <div className='flex flex-col w-4/6 space-y-10'> 
                         <div className='flex w-full justify-between '>
                              <h5 className='text-4xl font-semibold '>Account information</h5>
                              {loading?
                                  <ClipLoader 
                                    color="black"
                                
                                    />
                                    :
                              <button className='text-blue-600 py-1.5 text-sm px-4 rounded-lg border border-blue-600' onClick={saveProfile}>Save changes</button>
                              }
                          </div>


                          <div className='py-10 flex flex-col space-y-4'>
                                  <div className='border-b flex justify-between py-4'>
                                        <h5 className='text-xl text-slate-600 font-light'>Username</h5>

                                        <div className='flex items-center w-1/2 space-x-6 '>
                                                 <div className='flex flex-col w-1/2 space-y-2'>
                                                       <label className='font-light text-slate-600'>Full name</label>
                                                       <input 
                                                          placeholder={`${profile?.name}`}
                                                          value={profile?.name}
                                                          className="border rounded-lg py-2 w-full px-4"
                                                          onChange={(e)=>setProfile({...profile,name:e.target.value})}
                                                       />

                                                 </div>
                                            

                                        </div>

                                   </div>




                                            <div className='border-b flex justify-between py-4'>
                                                    <h5 className='text-xl text-slate-600 font-light'>Your photo</h5>

                                                    <div className='flex w-1/2 space-x-6 '>
                                                            <div className='flex flex-col w-1/2 space-y-2'>
                                                                {url?.length ==0&&profile?.img?.length >0?
                                                                    <div>
                                                                        <img 
                                                                        src={profile?.img}
                                                                        onClick={handleClick}
                                                                        className="rounded-full  h-24 w-24"
                                                    
                                                                                />

                                                                            <input
                                                                            type="file"
                                                                            className='hidden'
                                                                            ref={hiddenFileInput}
                                                                            onChange={handleChange}
                                                                            />
                                                                            </div>
                                                                            :
                                                                    <>
                                                                  
                                                                     {url?.length ==0?
                                                                            <div className='flex items-center justify-center h-24 w-24 rounded-full border'
                                                                            onClick={handleClick}
                                                                            >
                                                                                <IoCameraOutline 
                                                                                    className='text-xl text-slate-600 font-light'
                                                                                />

                                                                                <input
                                                                                    type="file"
                                                                                    className='hidden'
                                                                                    ref={hiddenFileInput}
                                                                                    onChange={handleChange}
                                                                                    />

                                                                            </div>
                                                                             :
                                                                       <div>
                                                                              <img 
                                                                                src={url}
                                                                                onClick={handleClick}
                                                                                className="rounded-full  h-24 w-24"
                                                                    
                                                                                />

                                                                         <input
                                                                            type="file"
                                                                            className='hidden'
                                                                            ref={hiddenFileInput}
                                                                            onChange={handleChange}
                                                                            />
                                                                    </div>
                                                                 
                                                                    
                                                                    }
                                                                </>}


                                                            </div>
                                                            <div className='flex space-x-6 justify-end w-1/2'>
                                                                <div className='flex space-x-6 justify items-center'>
                                                                        <h5>Delete</h5>
                                                                        {isLoading?
                                                                             <BeatLoader 
                                                                                color="black"
                                                                                size={"8"}
                                                                             />
                                                                                :
                                                                               <h5 className='text-blue-600' onClick={upload}>Update</h5>

                                                                        }
                                                                    

                                                                </div>
                                                             


                                                            </div>

                                                    </div>

                                            </div>



                                <div className='border-b flex justify-between py-4'>
                                        <h5 className='text-xl text-slate-600 font-light'>Your Phone number</h5>

                                        <div className='flex  w-1/2 space-x-6 '>
                                                 <div className='flex flex-col w-1/2 space-y-2'>
                                                       <label className='font-light text-slate-600'>Phone number</label>
                                                       <input 
                                                          placeholder=''
                                                          value={profile?.phone}
                                                          className="border rounded-lg py-2 w-full px-4"
                                                          onChange={(e)=>setProfile({...profile,phone:e.target.value})}
                                                       />

                                                 </div>
                                                
                                        </div>

                                   </div>



                                   <div className='border-b flex justify-between py-4'>
                                        <h5 className='text-xl text-slate-600 font-light'>Your Email</h5>

                                        <div className='flex  w-1/2 space-x-6 '>
                                                 <div className='flex flex-col w-1/2 space-y-2'>
                                                       <label className='font-light text-slate-600'>Email</label>
                                                       <input 
                                                          placeholder={`${profile?.email}`}
                                                          value={profile?.email}
                                                          className="border rounded-lg py-2 w-full px-4"
                                                          onChange={(e)=>setProfile({...profile,emaile:e.target.value})}
                                                       />

                                                 </div>

                                                 <div className='w-1/2 justify-end flex '>
                                                      <h5 className='text-blue-600'>Edit email</h5>
                                                 </div>

                                                 
                                        </div>

                                   </div>



                                   <div className='border-b flex justify-between py-4'>
                                        <h5 className='text-xl text-slate-600 font-light'>Your password</h5>

                                        <div className='flex  w-1/2 space-x-6 '>
                                                 <div className='flex flex-col w-1/2 space-y-2'>
                                                       <label className='font-light text-slate-600'>Password</label>
                                                       <input 
                                                          placeholder=''
                                                          value={""}
                                                          className="border rounded-lg py-2 w-full"
                                                       />

                                                 </div>

                                                 <div className='w-1/2 justify-end flex '>
                                                      <h5 className='text-blue-500'>Edit password</h5>
                                                 </div>

                                                 
                                        </div>

                                   </div>




                                   <div className='border-b flex justify-between py-4'>
                                        <h5 className='text-xl text-slate-600 font-light'>Your Bio</h5>

                                        <div className='flex  w-1/2 space-x-6 '>
                                                 <div className='flex flex-col w-full space-y-2'>
                                                       <label className='font-light text-slate-600'>Bio</label>
                                                       <textarea 
                                                          placeholder=''
                                                          value={profile?.bio}
                                                          className="border rounded-lg py-2 w-full px-4"
                                                          onChange={(e)=>setProfile({...profile,bio:e.target.value})}
                                                       />

                                                 </div>



                                                 
                                        </div>

                                   </div>



                          </div>


                 </div>
                
              </div>

    </Layout>

  )
}
