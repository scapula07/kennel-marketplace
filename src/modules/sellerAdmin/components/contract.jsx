import React ,{useRef} from 'react'
import { useReactToPrint } from 'react-to-print';

export default function Contract({selectContractType}) {
      
  return (
    <div className='w-full h-screen no-scrollbar overflow-y-scroll '>
           {selectContractType==="Artificial Insemination Contract"&&
               <Insemination
                />
           }
           {selectContractType==="Animal Sale Contract"&&
               <Sale
                />
           }
          {selectContractType==="Animal Exchange Contract"&&
               <Exchange
                />
           }

     </div>
  )
}




const Insemination=()=>{
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      
      content: () => componentRef.current,

    });
    return(
        <div className='w-full h-full flex flex-col space-y-4'>
           <button className='bg-orange-700 w-1/4 text-sm py-2' 
            onClick={handlePrint}
           >Confirm your signature
           </button>
        <div className='w-full h-full flex flex-col space-y-4 px-4 py-4' 
           ref={componentRef}
           >
            <div className='w-full'>
               <h5>This Artificial Insemination Contract ("Contract") is entered into on [DATE] by and between:</h5>
               
               <h5 className='px-4'>1. Breeder: Name: [Breeder's Name] Address: [Breeder's Address] Phone: [Breeder's Phone Number] Email: [Breeder's Email Address]</h5>
               <h5 className='px-4'>2. Customer: Name: [Customer's Name] Address: [Customer's Address] Phone: [Customer's Phone Number] Email: [Customer's Email Address]</h5>

            </div>
            <div className='w-full space-y-4'>
                 <h5>The parties hereby agree as follows:</h5>
                 <div className='w-full flex flex-col space-y-6'>
                        <div className='w-full'>
                            <h5>1.Animal Details:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>Animal Type: [Type of Animal, e.g., Dog, Cat, Horse]</h5>
                                <h5>Animal Name: [Animal's Name]</h5>
                                <h5>Animal Breed: [Animal's Breed]</h5>
                                <h5>Animal Registration Number (if applicable): [Registration Number]</h5>


                            </div>

                        </div>

                        <div className='w-full'>
                            <h5>2. Artificial Insemination Service:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>The Breeder agrees to provide artificial insemination services for the above-mentioned animal.</h5>
                                <h5>The Breeder will use [Specify Semen Source, e.g., Frozen Semen, Fresh Chilled Semen] for the artificial insemination procedure.</h5>
                                <h5>The artificial insemination will be performed by a licensed veterinarian or a trained professional in accordance with industry best practices.</h5>
                            </div>

                        </div>

                        <div className='w-full'>
                            <h5>3. Fees and Payments:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>The Customer agrees to pay the Breeder a fee of $[Amount] for the artificial insemination service.</h5>
                                <h5>The fee must be paid in full before the artificial insemination procedure is performed.</h5>
                                <h5>The Breeder reserves the right to charge additional fees for any additional services or expenses related to the artificial insemination, such as veterinary fees or transportation costs.</h5>
                            </div>

                        </div>



                        <div className='w-full'>
                            <h5>4. Warranties and Representations:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>The Breeder warrants that the semen used for the artificial insemination is of good quality and is obtained from a reputable source.</h5>
                                <h5>The Breeder makes no guarantees or warranties regarding the success of the artificial insemination or the resulting pregnancy.</h5>
                                <h5>The Customer acknowledges that the success of the artificial insemination is subject to various factors, including the animal's health and fertility, and the Breeder is not responsible for any unsuccessful attempts or failed pregnancies.</h5>
                            </div>

                        </div>
                        <div className='w-full'>
                            <h5>5. Liability and Indemnification:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>The Customer agrees to hold the Breeder harmless from any and all claims, damages, or losses arising from the artificial insemination procedure or the resulting pregnancy, except for those caused by the Breeder's gross negligence or willful misconduct.</h5>
                                <h5>The Breeder shall not be liable for any indirect, incidental, or consequential damages resulting from the artificial insemination service.</h5>

                            </div>

                        </div>

                        <div className='w-full'>
                            <h5>5. Governing Law and Dispute Resolution:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>This Contract shall be governed by the laws of [Jurisdiction].</h5>
                                <h5>Any disputes arising from this Contract shall be resolved through mediation or, if necessary, in the courts of [Jurisdiction].</h5>

                            </div>

                        </div>


                 </div>
            </div>  
            <div className='w-full'>
                <h5 className='font-semibold'>By signing this Contract, the parties acknowledge that they have read, understood, and agree to be bound by the terms and conditions set forth herein.</h5>

            </div>

        </div>
        
         
     </div>
    )
}






const Sale=()=>{
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      
      content: () => componentRef.current,

    });
    return(
        <div className='w-full h-full flex flex-col space-y-4'>
                <button className='bg-orange-700 w-1/4 text-sm py-2' 
                    onClick={handlePrint}
                >Confirm your signature
                </button>
           <div className='w-full h-full flex flex-col space-y-4 px-4 py-4' 
               ref={componentRef}
           >
            <div className='w-full'>
               <h5>This Animal Sale Contract ("Contract") is entered into on [DATE] by and between:</h5>
               
               <h5 className='px-4'>1. Breeder: Name: [Breeder's Name] Address: [Breeder's Address] Phone: [Breeder's Phone Number] Email: [Breeder's Email Address]</h5>
               <h5 className='px-4'>2. Buyer: Name: [Buyer's Name] Address: [Buyer's Address] Phone: [Buyer's Phone Number] Email: [Buyer's Email Address]</h5>

            </div>
            <div className='w-full space-y-4'>
                 <h5>The parties hereby agree as follows:</h5>
                 <div className='w-full flex flex-col space-y-6'>
                        <div className='w-full'>
                            <h5>1.Animal Details:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>Animal Type: [Type of Animal, e.g., Dog, Cat, Horse]</h5>
                                <h5>Animal Name: [Animal's Name]</h5>
                                <h5>Animal Breed: [Animal's Breed]</h5>
                                <h5>Animal Registration Number (if applicable): [Registration Number]</h5>
                                <h5>Animal Age: [Animal's Age]</h5>
                                <h5>Animal Sex: [Animal's Sex]</h5>


                            </div>

                        </div>

                        <div className='w-full'>
                            <h5>2. Sale of Animal:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>The Breeder agrees to provide artificial insemination services for the above-mentioned animal.</h5>
                                <h5>The Buyer agrees to purchase the animal from the Breeder for the price of $[Amount].</h5>
                            </div>

                        </div>

                        <div className='w-full'>
                            <h5>3. Payments and Possession:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>The Buyer shall pay the full purchase price to the Breeder before taking possession of the animal.</h5>
                                <h5>The Breeder shall deliver the animal to the Buyer at the agreed-upon location and time.</h5>
                            </div>

                        </div>
                        <div className='w-full'>
                            <h5>4. Health and Veterinary Records:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>The Breeder represents that the animal is in good health and has received all necessary vaccinations and veterinary care.</h5>
                                <h5>The Breeder shall provide the Buyer with the animal's complete medical and vaccination records.</h5>
                                <h5>The Buyer shall have the animal examined by a licensed veterinarian within [Number] days of taking possession, and the Buyer may return the animal for a full refund if the veterinarian finds the animal to be in poor health or unfit for purchase.</h5>
                            </div>

                        </div>




                        <div className='w-full'>
                            <h5>5. Warranties and Representations:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>The Breeder warrants that the semen used for the artificial insemination is of good quality and is obtained from a reputable source.</h5>
                                <h5>The Breeder makes no guarantees or warranties regarding the success of the artificial insemination or the resulting pregnancy.</h5>
                                <h5>The Customer acknowledges that the success of the artificial insemination is subject to various factors, including the animal's health and fertility, and the Breeder is not responsible for any unsuccessful attempts or failed pregnancies.</h5>
                            </div>

                        </div>
                        <div className='w-full'>
                            <h5>6. Buyer's Responsibilities:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>The Buyer agrees to provide the animal with proper care, including adequate food, shelter, and veterinary attention.</h5>
                                <h5>The Buyer agrees to comply with all applicable laws and regulations regarding the ownership and care of the animal.</h5>

                            </div>

                        </div>

                        <div className='w-full'>
                            <h5>5. Governing Law and Dispute Resolution:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>This Contract shall be governed by the laws of [Jurisdiction].</h5>
                                <h5>Any disputes arising from this Contract shall be resolved through mediation or, if necessary, in the courts of [Jurisdiction].</h5>

                            </div>

                        </div>


                 </div>
            </div>

            <div className='w-full'>
                <h5 className='font-semibold'>By signing this Contract, the parties acknowledge that they have read, understood, and agree to be bound by the terms and conditions set forth herein.</h5>

            </div>


           </div>
        </div>
    )
}





const  Exchange=()=>{
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      
      content: () => componentRef.current,

    });
    return(
        <div className='w-full h-full flex flex-col space-y-4'>
                <button className='bg-orange-700 w-1/4 text-sm py-2' 
                    onClick={handlePrint}
                >Confirm your signature
                </button>
           <div className='w-full h-full flex flex-col space-y-4 px-4 py-4' 
               ref={componentRef}
           >

            <div className='w-full'>
               <h5>This Animal Exchange Contract ("Contract") is entered into on [DATE] by and between:</h5>
               
               <h5 className='px-4'>1. Breeder 1: Name: [Breeder 1's Name] Address: [Breeder 1's Address] Phone: [Breeder 1's Phone Number] Email: [Breeder 1's Email Address]</h5>
               <h5 className='px-4'>2. Breeder 2: Name: [Breeder 2's Name] Address: [Breeder 2's Address] Phone: [Breeder 2's Phone Number] Email: [Breeder 2's Email Address]</h5>
            
            </div>
            <div className='w-full space-y-4'>
                 <h5>The parties hereby agree as follows:</h5>
                 <div className='w-full flex flex-col space-y-6'>
                        <div className='w-full'>
                            <h5>1.Animal Details:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>Animal Type: [Type of Animal, e.g., Dog, Cat, Horse]</h5>
                                <h5>Animal Name: [Animal's Name]</h5>
                                <h5>Animal Breed: [Animal's Breed]</h5>
                                <h5>Animal Registration Number (if applicable): [Registration Number]</h5>
                                <h5>Animal Age: [Animal's Age]</h5>
                                <h5>Animal Sex: [Animal's Sex]</h5>

                            </div>

                        </div>

                        <div className='w-full'>
                            <h5>2. Animal Exchange:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>Breeder 1 agrees to transfer ownership of the above-mentioned animal to Breeder 2.</h5>
                                <h5>In exchange, Breeder 2 agrees to grant Breeder 1 the rights to [Number] of the animal's offspring.</h5>
                            </div>

                        </div>

                        <div className='w-full'>
                            <h5>3. Breeding Rights:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>Breeder 1 shall have the exclusive right to breed the animal and claim [Number] of the resulting offspring.</h5>
                                <h5>Breeder 1 shall be responsible for all expenses related to the breeding and whelping/foaling of the animal.</h5>
                                <h5>Breeder 2 shall have the right to retain the remaining offspring from the breeding.</h5>
                            </div>

                        </div>



                        <div className='w-full'>
                            <h5>4. Ownership and Registration:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>Breeder 2 shall become the sole owner of the animal upon the execution of this Contract.</h5>
                                <h5>Breeder 2 shall be responsible for registering the animal under their name with the relevant breed registry (if applicable).</h5>
                                <h5>Breeder 1 shall be listed as the co-owner of the [Number] offspring they are entitled to.</h5>
                            </div>

                        </div>
                        <div className='w-full'>
                            <h5>5. Health and Veterinary Care:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>Breeder 2 agrees to provide the animal with proper care, including adequate food, shelter, and veterinary attention..</h5>
                                <h5>Breeder 2 shall be responsible for all expenses related to the animal's health and well-being.</h5>

                            </div>

                        </div>

                        <div className='w-full'>
                            <h5>5. Governing Law and Dispute Resolution:</h5>
                            <div className='flex flex-col px-4'>
                                <h5>This Contract shall be governed by the laws of [Jurisdiction].</h5>
                                <h5>Any disputes arising from this Contract shall be resolved through mediation or, if necessary, in the courts of [Jurisdiction].</h5>

                            </div>

                        </div>


                 </div>
            </div>

            <div className='w-full'>
                <h5 className='font-semibold'>By signing this Contract, the parties acknowledge that they have read, understood, and agree to be bound by the terms and conditions set forth herein.</h5>

            </div>


        </div>
        </div>
    )
}