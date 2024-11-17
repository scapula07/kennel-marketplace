import React,{useState,useEffect,useRef} from 'react'
import bg from "../../assets/imgbg.png"

import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { ClipLoader } from 'react-spinners';
import { useRecoilState } from 'recoil';
import { accountTypeState } from '../recoil/state';
import { breederApi } from '../api/breeders';
import { stripeApi } from '../api/stripe';
import { MdOutlineCameraAlt } from "react-icons/md";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import { alertTypeState } from '../recoil/state';



export default function Breader() {
  const [currentUser,setcurrentUser]=useRecoilState(accountTypeState)
  const [profile,setProfile]=useState({tags:[{label:"",value:""}],phone:'',bio:"",animal:[{label:"",value:""}],})
  const [url,setUrl]=useState("")
  const [file,setFile]=useState({})
  const [loader,setLoader]=useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [num,setNum]=useState(1)
  const [alert,setAlert]=useRecoilState(alertTypeState)
  let navigate = useNavigate();
  
  useEffect(()=>{
     setProfile({...currentUser})
  },[currentUser])

  console.log(profile,"prrofo")

 



  const create=async()=>{
    setErrorMsg(null)
      if (profile?.name?.length < 3) {
        setErrorMsg('Business name is required! ');
        setNum(1)
        setLoader(false);
        return;
      }
      if (profile?.bio?.length < 3) {
        setErrorMsg('Business name is required! ');
        setNum(1)
        setLoader(false);
        return;
      }

      if (profile?.tags?.length === 0) {
        setErrorMsg('Select a product type or service');
        setNum(2)
        setLoader(false);
        return;
      }
      if (profile?.phone?.length < 3) {
        setErrorMsg('Phone number is required!');
        setNum(1)
        setLoader(false);
        return;
      }
      
      if (profile?.img?.length ==0 && url?.length ==0 ) {
        setErrorMsg('Profile image is required!');
        setNum(1)
        setLoader(false);
        return;
      }
      if (profile?.animal?.label?.length ==0 ) {
        setErrorMsg('Select your breed specialty');
        setNum(1)
        setLoader(false);
        return;
      }

      


     try{
           setLoader(true)
         
          const user=await breederApi.createBreeder(profile,file)
       
          console.log(user)
          user?.status&&localStorage.clear();
          user?.status&&localStorage.setItem('user',JSON.stringify(user?.data));
          setcurrentUser(user?.data)
          setLoader(false)
          setAlert({text:"Successfull!",color:"success"})
          user?.status&& navigate(`/admin-seller/kyc`)

     }catch(e){
         setLoader(false)
         setErrorMsg("Something went wrong !.Try again")
      }
  }

  console.log(profile?.img?.length ==0 || url?.length ==0,url?.length ==0,profile?.img?.length ==0,"url")
  return (
    <div className='w-full h-screen relative'>
         <img
            src={bg}
            className="w-full h-full blur-sm"
          />

          <div className='absolute top-0 w-full h-full '>
              <div className='w-full h-full flex items-center justify-center relative z-30 px-4 md:px-0'>
                   <div className='bg-white md:w-2/5 w-full rounded-lg  relative z-30 px-6 py-4' style={{background: "#F3F3F3"}}>
                            <div className='flex justify-end '>
                                <IoMdClose 
                                className='text-3xl'
                                onClick={()=>window.history.go(-1)}
                                />

                            </div>

                            <div className='flex flex-col space-y-6 px- '>

                                   <div className='w-full flex flex-col items-center space-y-4 px-4'>
                                        <h5 className='text-lg font-semibold'>Welcome to your new breeding home!</h5>
                                        <h5 className=' font-light text-center text-slate-600'>You are a few steps closer to being one of our registered breeders. Let’s help you set up your profile</h5>
                                        


                                   </div>

 
                                   <div className='flex flex-col w-full'>
                                   {errorMsg && (
                                                
                                                <h5 className='text-xs font-semibold text-red-500 text-center w-full'>{errorMsg}</h5>
                                          )}
                                       {num===1?
                                          <Form1
                                            num={num}
                                            setNum={setNum}
                                            currentUser={profile}
                                            setcurrentUser={setProfile}
                                            url={url}
                                            setUrl={setUrl}
                                            file={file}
                                            setFile={setFile}
                                           />
                                           :
                                           <Form2
                                              num={num}
                                              setNum={setNum}
                                              currentUser={profile}
                                              setcurrentUser={setProfile}
                                              create={create}
                                              loader={loader}
                                          />


                                       }
                                         


                                     </div>

                                        

                                </div>

                        

                   </div>

              </div>

          </div>
         

    </div>
  )
}





const Form1=({num,setNum,currentUser,setcurrentUser,url,setUrl,file,setFile})=>{
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
    return(
        <div className='flex flex-col px-4 space-y-4 '>
                 <div className='flex flex-col space-y-6'>
                              <div className='flex flex-col space-y-3'>
                                    <label className='text-sm font-semibold '>Business Name</label>
                                    <input 
                                      placeholder='Enter your business name'
                                      className='w-full bg-white rounded-sm border py-2.5 px-4 text-sm text-slate-800'
                                      value={currentUser?.name}
                                      onChange={(e)=>setcurrentUser({...currentUser,name:e.target.value})}
                                    />

                              </div>

                              <div className='flex flex-col space-y-3'>
                                    <label  className='text-sm font-semibold '>Business Description</label>
                                    <textarea 
                                      placeholder='Enter your business name'
                                      className='w-full bg-white rounded-sm border py-5 px-4 text-sm text-slate-800'
                                      value={currentUser?.bio}
                                      onChange={(e)=>setcurrentUser({...currentUser,bio:e.target.value})}
                                    />

                              </div>



                                <div className='flex  justify-between w-full'>
                                      <div className='flex flex-col space-y-3'>
                                            <label className='text-sm font-semibold '>Email</label>
                                            <input 
                                              placeholder='Enter your email'
                                              className='w-full bg-white rounded-sm rounded-lg border py-2.5 px-4 text-sm text-slate-800'
                                              value={currentUser?.email}
                                              onChange={(e)=>setcurrentUser({...currentUser,email:e.target.value})}
                                            />

                                       </div>

                                      <div className='flex flex-col space-y-3'>
                                            <label  className='text-sm font-semibold '>Phone number</label>
                                            <input
                                              placeholder='+1'
                                              className='w-full bg-white rounded-sm  border py-2.5 px-4 text-sm text-slate-800'
                                              value={currentUser?.phone}
                                              onChange={(e)=>setcurrentUser({...currentUser,phone:e.target.value})}
                                            />

                                      </div>

                        </div>


                        <div className='flex flex-col space-y-3'>
                                    <label  className='text-sm font-semibold '>Address</label>
                                    <input
                                        placeholder='Add your address,City,Country.'
                                        className='w-full bg-white rounded-sm border py-2.5 px-4 text-sm text-slate-800'
                                        value={currentUser?.address}
                                        onChange={(e)=>setcurrentUser({...currentUser,address:e.target.value})}
                                      />

                        </div>

                        <div className='flex flex-col space-y-4'>
                              <h5>Add your profile pic</h5>
                              <div className='flex space-x-2'>
                              {url?.length ==0&&currentUser?.img?.length >0?
                                 <div>
                                    <img 
                                    src={currentUser?.img}
                                    onClick={handleClick}
                                    className="rounded-full  h-10 w-10"
                
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
                                               <div className='flex items-center justify-center p-4 bg-slate-200 rounded-full'
                                                  onClick={handleClick}
                                               >
                                                  <MdOutlineCameraAlt className='text-xl text-slate-800'
                                                      
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
                                                        onClick={handleClick}
                                                          src={url}
                                                        className="rounded-full  h-10 w-10"
                                            
                                                        />

                                                <input
                                                  type="file"
                                                  className='hidden'
                                                  ref={hiddenFileInput}
                                                  onChange={handleChange}
                                                  />
                                              </div>
                                    

                                             }
                                        </>

                                  }
                                    <h5 className=' text-sm'>Upload your profile pic</h5>

                              </div>

                        </div>

                 </div>

                 <div className='w-full flex justify-end'>
                      <button className='bg-orange-600 py-2 px-5 text-white text-sm rounded-sm' onClick={()=>setNum(num+1)}>Next</button>
                  
                </div>

        </div>
    )
}







const Form2=({num,setNum,currentUser,setcurrentUser,create,loader})=>{
  return(
      <div className='flex flex-col px-4 space-y-4 '>
               <div className='flex flex-col space-y-6'>
                            <div className='flex flex-col space-y-3'>
                                  <label className='text-sm font-semibold '>X handle</label>
                                  <input 
                                    placeholder='@johnjones'
                                    className='w-full bg-white rounded-sm rounded-lg border py-2.5 px-4 text-sm text-slate-800'
                                    value={currentUser?.social}
                                    onChange={(e)=>setcurrentUser({...currentUser,social:e.target.value})}
                                  />

                            </div>




                              <div className='flex  justify-between w-full'>
                                    <div className='flex flex-col space-y-3'>
                                          <label className='text-sm font-semibold '>Establishment Date</label>
                                          <input 
                                            type={"date"}
                                            placeholder='Enter your email'
                                            className='w-full bg-white rounded-sm rounded-lg border py-2.5 px-4 text-sm text-slate-800'
                                            value={currentUser?.establishDate}
                                            onChange={(e)=>setcurrentUser({...currentUser,establishDate:e.target.value})}
                                          />

                                     </div>

                                    <div className='flex flex-col space-y-3'>
                                          <label  className='text-sm font-semibold '>Business Size</label>
                                          <input
                                           type={"number"}
                                            placeholder='1'
                                            className='w-full bg-white rounded-sm rounded-lg border py-2.5 px-4 text-sm text-slate-800'
                                            value={currentUser?.businessSize}
                                            onChange={(e)=>setcurrentUser({...currentUser,businessSize:e.target.value})}

                                          />

                                    </div>

                      </div>


                      <div className='flex flex-col space-y-3'>
                                  <label  className='text-sm font-semibold '>Species Specialization</label>
                                  <Select                     
                                          options={species}
                                          value={currentUser?.animal}
                                          onChange={(opt) => {
                                          console.log(opt,"opt")
                                          setcurrentUser({...currentUser,animal:opt})
                                       }}
                                     />

                      </div>



                      <div className='flex flex-col space-y-3'>
                                  <label  className='text-sm font-semibold '>Products and Services</label>
                                  <CreatableSelect 
                                       isMulti 
                                          options={services}
                                          value={currentUser?.tags}
                                          onChange={(opt) => {
                                          console.log(opt,"opt")
                                      
                                          setcurrentUser({...currentUser,tags:opt})
                                       }}
                                     />
                        

                            </div>

               </div>

               <div className='w-full flex justify-end px-8'>
                    <div className='flex w-1/3 space-x-4 items-center'>
                    <button className='border py-2 px-5 rounded-sm text-black' onClick={()=>setNum(num-1)}>Back</button>
                      {!loader?
                           <button className='bg-orange-600 py-2 px-5 text-white rounded-sm text-sm' onClick={create}>Continue</button>
                            :
                            <ClipLoader 
                              color='orange'
                              size={12}
                            />
                           }
                 

                    </div>
                   
                
              </div>

      </div>
  )
}











const services=[
  {"label": "Pet Sitting", "value": "Pet Sitting"},
  {"label": "Dog Walking", "value": "Dog Walking"},
  {"label": "Pet Boarding", "value": "Pet Boarding"},
  {"label": "Doggy Daycare", "value": "Doggy Daycare"},
  {"label": "Pet Grooming", "value": "Pet Grooming"},
  {"label": "Pet Training", "value": "Pet Training"},
  {"label": "Pet Photography", "value": "Pet Photography"},
  {"label": "Pet Transportation", "value": "Pet Transportation"},
  {"label": "Pet Waste Removal", "value": "Pet Waste Removal"},
  {"label": "Pet Food and Supplies Delivery", "value": "Pet Food and Supplies Delivery"},
  {"label": "Dog Training Classes", "value": "Dog Training Classes"},
  {"label": "Dog Obedience Training", "value": "Dog Obedience Training"},
  {"label": "Puppy Training Classes", "value": "Puppy Training Classes"},
  {"label": "Dog Behavior Modification", "value": "Dog Behavior Modification"},
  {"label": "Cat Sitting", "value": "Cat Sitting"},
  {"label": "Cat Grooming", "value": "Cat Grooming"},
  {"label": "Cat Boarding", "value": "Cat Boarding"},
  {"label": "Cat Daycare", "value": "Cat Daycare"},
  {"label": "Cat Behavior Consultations", "value": "Cat Behavior Consultations"},
  {"label": "Cat Nutrition Counseling", "value": "Cat Nutrition Counseling"},
  {"label": "Small Animal Sitting (e.g., rabbits, guinea pigs)", "value": "Small Animal Sitting (e.g., rabbits, guinea pigs)"},
  {"label": "Small Animal Grooming", "value": "Small Animal Grooming"},
  {"label": "Small Animal Boarding", "value": "Small Animal Boarding"},
  {"label": "Bird Sitting", "value": "Bird Sitting"},
  {"label": "Bird Boarding", "value": "Bird Boarding"},
  {"label": "Bird Grooming", "value": "Bird Grooming"},
  {"label": "Bird Training", "value": "Bird Training"},
  {"label": "Reptile Sitting", "value": "Reptile Sitting"},
  {"label": "Reptile Boarding", "value": "Reptile Boarding"},
  {"label": "Reptile Grooming", "value": "Reptile Grooming"},
  {"label": "Aquarium Maintenance", "value": "Aquarium Maintenance"},
  {"label": "Fish Sitting", "value": "Fish Sitting"},
  {"label": "Fish Tank Setup and Design", "value": "Fish Tank Setup and Design"},
  {"label": "Horse Boarding", "value": "Horse Boarding"},
  {"label": "Horse Riding Lessons", "value": "Horse Riding Lessons"},
  {"label": "Horse Training", "value": "Horse Training"},
  {"label": "Equine Massage Therapy", "value": "Equine Massage Therapy"},
  {"label": "Equine Nutrition Counseling", "value": "Equine Nutrition Counseling"},
  {"label": "Livestock Care (e.g., goats, sheep, pigs)", "value": "Livestock Care (e.g., goats, sheep, pigs)"},
  {"label": "Livestock Boarding", "value": "Livestock Boarding"},
  {"label": "Livestock Health Check-ups", "value": "Livestock Health Check-ups"},
  {"label": "Livestock Grooming", "value": "Livestock Grooming"},
  {"label": "Livestock Training", "value": "Livestock Training"},
  {"label": "Beekeeping Services", "value": "Beekeeping Services"},
  {"label": "Beehive Installation and Maintenance", "value": "Beehive Installation and Maintenance"},
  {"label": "Chicken Coop Design and Installation", "value": "Chicken Coop Design and Installation"},
  {"label": "Poultry Care", "value": "Poultry Care"},
  {"label": "Aviary Setup and Maintenance", "value": "Aviary Setup and Maintenance"},
  {"label": "Wildlife Rehabilitation Services", "value": "Wildlife Rehabilitation Services"},
  {"label": "Exotic Animal Handling and Care", "value": "Exotic Animal Handling and Care"},
  {"label": "Pet First Aid and CPR Training", "value": "Pet First Aid and CPR Training"},
  {"label": "Pet Microchipping Services", "value": "Pet Microchipping Services"},
  {"label": "Pet Behavior Assessments", "value": "Pet Behavior Assessments"},
  {"label": "Pet Massage Therapy", "value": "Pet Massage Therapy"},
  {"label": "Pet Acupuncture Services", "value": "Pet Acupuncture Services"},
  {"label": "Pet Dental Cleaning", "value": "Pet Dental Cleaning"},
  {"label": "Pet Insurance Consulting", "value": "Pet Insurance Consulting"},
  {"label": "Pet Loss Support Services", "value": "Pet Loss Support Services"},
  {"label": "Pet Memorial Services", "value": "Pet Memorial Services"},
  {"label": "Pet Event Planning and Hosting", "value": "Pet Event Planning and Hosting"},
  {"label": "Pet Fashion Design and Accessories", "value": "Pet Fashion Design and Accessories"},
  {"label": "Pet Portrait Painting or Drawing", "value": "Pet Portrait Painting or Drawing"},
  {"label": "Pet Blogging or Vlogging", "value": "Pet Blogging or Vlogging"},
  {"label": "Pet Social Media Management", "value": "Pet Social Media Management"},
  {"label": "Pet Influencer Marketing", "value": "Pet Influencer Marketing"},
  {"label": "Pet Product Testing and Reviews", "value": "Pet Product Testing and Reviews"},
  {"label": "Pet Travel Consultation", "value": "Pet Travel Consultation"},
  {"label": "Pet Foster Care Services", "value": "Pet Foster Care Services"},
  {"label": "Pet DNA Testing Services", "value": "Pet DNA Testing Services"},
  {"label": "Pet Legal Services (e.g., pet trusts)", "value": "Pet Legal Services (e.g., pet trusts)"},
  {"label": "Pet Psychic Readings", "value": "Pet Psychic Readings"},
  {"label": "Pet Energy Healing", "value": "Pet Energy Healing"},
  {"label": "Pet Weight Loss Coaching", "value": "Pet Weight Loss Coaching"},
  {"label": "Pet Fitness Training", "value": "Pet Fitness Training"},
  {"label": "Pet Friendly Accommodation Finder", "value": "Pet Friendly Accommodation Finder"},
  {"label": "Pet Retirement Planning", "value": "Pet Retirement Planning"},
  {"label": "Pet Home Safety Assessments", "value": "Pet Home Safety Assessments"},

]


const species=[
  {"label": "Puppy (Dog)", "value": "Puppy"},
  {"label": "Kitten (Cat)", "value": "Kitten"},
  {"label": "Foal (Horse)", "value": "Foal"},
  {"label": "Calf (Cow)", "value": "Calf"},
  {"label": "Lamb (Sheep)", "value": "Lamb"},
  {"label": "Kid (Goat)", "value": "Kid"},
  {"label": "Piglet (Pig)", "value": "Piglet"},
  {"label": "Chick (Chicken)", "value": "Chick"},
  {"label": "Duckling (Duck)", "value": "Duckling"},
  {"label": "Kit (Rabbit)", "value": "Kit"},
  {"label": "Poult (Turkey)", "value": "Poult"},
  {"label": "Gosling (Goose)", "value": "Gosling"},
  {"label": "Foal (Donkey)", "value": "Foal"},
  {"label": "Calf (Camel)", "value": "Calf"},
  {"label": "Cria (Llama)", "value": "Cria"},
  {"label": "Cria (Alpaca)", "value": "Cria"},
  {"label": "Kit (Ferret)", "value": "Kit"},
  {"label": "Pup (Rat)", "value": "Pup"},
  {"label": "Pup (Mouse)", "value": "Pup"},
  {"label": "Pup (Guinea Pig)", "value": "Pup"},
  {"label": "Pup (Hamster)", "value": "Pup"},
  {"label": "Pup (Gerbil)", "value": "Pup"},
  {"label": "Kit (Chinchilla)", "value": "Kit"},
  {"label": "Hoglet (Hedgehog)", "value": "Hoglet"},
  {"label": "Chick (Parrot)", "value": "Chick"},
  {"label": "Chick (Canary)", "value": "Chick"},
  {"label": "Chick (Finch)", "value": "Chick"},
  {"label": "Chick (Budgerigar)", "value": "Chick"},
  {"label": "Chick (Cockatiel)", "value": "Chick"},
  {"label": "Chick (Quail)", "value": "Chick"},
  {"label": "Squab (Dove)", "value": "Squab"},
  {"label": "Squab (Pigeon)", "value": "Squab"},
  {"label": "Cygnet (Swan)", "value": "Cygnet"},
  {"label": "Fry (Fish - General)", "value": "Fry"},
  {"label": "Fry (Goldfish)", "value": "Fry"},
  {"label": "Fry (Betta Fish)", "value": "Fry"},
  {"label": "Fry (Guppy)", "value": "Fry"},
  {"label": "Fry (Tetra)", "value": "Fry"},
  {"label": "Fry (Molly)", "value": "Fry"},
  {"label": "Puggle (Platypus)", "value": "Puggle"},
  {"label": "Larva (Axolotl)", "value": "Larva"},
  {"label": "Tadpole (Frog)", "value": "Tadpole"},
  {"label": "Hatchling (Turtle)", "value": "Hatchling"},
  {"label": "Snakelet (Snake)", "value": "Snakelet"},
  {"label": "Hatchling (Gecko)", "value": "Hatchling"},
  {"label": "Hatchling (Tortoise)", "value": "Hatchling"},
  {"label": "Hatchling (Iguana)", "value": "Hatchling"},
  {"label": "Hatchling (Crocodile)", "value": "Hatchling"},
  {"label": "Hatchling (Alligator)", "value": "Hatchling"},
  {"label": "Kit (Squirrel)", "value": "Kit"},
  {"label": "Kit (Raccoon)", "value": "Kit"},
  {"label": "Kit (Skunk)", "value": "Kit"},
  {"label": "Kit (Beaver)", "value": "Kit"},
  {"label": "Pup (Otter)", "value": "Pup"},
  {"label": "Pup (Walrus)", "value": "Pup"},
  {"label": "Pup (Seal)", "value": "Pup"},
  {"label": "Calf (Dolphin)", "value": "Calf"},
  {"label": "Calf (Whale)", "value": "Calf"},
  {"label": "Fawn (Deer)", "value": "Fawn"},
  {"label": "Calf (Moose)", "value": "Calf"},
  {"label": "Calf (Elk)", "value": "Calf"},
  {"label": "Calf (Bison)", "value": "Calf"},
  {"label": "Joey (Kangaroo)", "value": "Joey"},
  {"label": "Joey (Koala)", "value": "Joey"},
  {"label": "Joey (Wallaby)", "value": "Joey"},
  {"label": "Joey (Wombat)", "value": "Joey"},
  {"label": "Cub (Panda)", "value": "Cub"},
  {"label": "Cub (Polar Bear)", "value": "Cub"},
  {"label": "Cub (Grizzly Bear)", "value": "Cub"},
  {"label": "Cub (Black Bear)", "value": "Cub"},
  {"label": "Cub (Brown Bear)", "value": "Cub"},
  {"label": "Cub (Lion)", "value": "Cub"},
  {"label": "Cub (Tiger)", "value": "Cub"},
  {"label": "Cub (Cheetah)", "value": "Cub"},
  {"label": "Cub (Leopard)", "value": "Cub"},
  {"label": "Cub (Jaguar)", "value": "Cub"},
  {"label": "Cub (Cougar)", "value": "Cub"},
  {"label": "Kitten (Lynx)", "value": "Kitten"},
  {"label": "Kitten (Bobcat)", "value": "Kitten"},
  {"label": "Cub (Panther)", "value": "Cub"},
  {"label": "Infant (Gorilla)", "value": "Infant"},
]
