import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc ,where} from 'firebase/firestore'
import { db } from '../Firebase';




export const messageApi = {
    startConversation: async function (member,currentUser) {
        console.log(member,"api")
        console.log(currentUser,"user")
        try{
            const q = query(collection(db, "conversations"), where("members", "array-contains",currentUser?.id));
       
            const convSnapshot =await getDocs(q)
            console.log(typeof(convSnapshot?.size),convSnapshot?.size,"size of conv")
            const conversations= convSnapshot?.docs?.map((doc)=> ({...doc?.data(),id:doc?.id}) )
            console.log(conversations,"conerseee")
            const isContact=conversations?.some(conv=>conv?.members?.includes(member?.id))
            console.log(isContact,"msg filterrrr")
            if(!isContact){
            
            

           

     
    
            const payload={
                members:[
                    currentUser?.id,
                    member?.id
                   ],
                 lastMessage:Number(new Date()),
                  unseen:true,
                 lastSender:currentUser?.id

              }
              try{
                const docRef = await addDoc(collection(db, "conversations"),payload);
                console.log(docRef)
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data(),doc.id,"third")

                return docSnap.exists()
              
             
             }catch (err) {
             console.log(err)
            }
        
        }else{
            return true
        }
        }catch(e){
            console.log(e)
        }

    }

}