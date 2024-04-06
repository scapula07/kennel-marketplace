import {atom} from "recoil"


export const accountTypeState =atom({
   key:"account",
   default:{
      id:""
   }
})



export const saveTypeState =atom({
   key:"save",
   default:[]
})




export const alertTypeState =atom({
   key:"alert",
   default:null
})

