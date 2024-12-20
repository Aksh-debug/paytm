"use client"
import { Button } from "@repo/ui/button";
import Card from "@repo/ui/card";
import TextInput from "@repo/ui/textInput";
import { useEffect, useState } from "react";
import createOnRampTxn from "../app/lib/actions/createOnRampTxn";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Select,SelectContent,SelectTrigger, SelectValue,SelectItem } from "@/components/ui/select";


const AddMoneyCard = ({ transactions }: {
    transactions: {
        startTime: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {

    const [socket,setSocket]=useState<null | WebSocket>(null)
    const [latestMessage,setMessage]=useState("");

    // useEffect(()=>{
    //     const newSocket=new WebSocket("ws://velocipay-websocket.vercel.app:8000")
    //     newSocket.onopen=()=>{
    //         console.log('Connected')
    //         setSocket(newSocket)
    //     }
    //     newSocket.onmessage=(message)=>{
    //         setMessage(message.data)
    //     }
    //     return ()=>{
    //         socket?.close()
    //     }
    // },[])


    const SUPPORTED_BANKS = [{
        name: "HDFC Bank",
        redirectUrl: "https://netbanking.hdfcbank.com"
    }, {
        name: "Axis Bank",
        redirectUrl: "https://www.axisbank.com/"
    }];

    const cardVariants = {
        hidden: {
            opacity: 0,
            x: -40
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                duration: 2
            }
        }
    }

    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || '');


    return (
        <motion.div initial="hidden" animate="visible" variants={cardVariants} className="text-sidebar-primary-foreground">
            <Card title="ADD MONEY" additionalStyles="h-[22rem] text-black">
                <TextInput color="black" placeholder="Enter Amount" label="Amount" onChange={(value) => {
                    setAmount(Number(value))
                }} />
                <Select onValueChange={(value)=>{
                    setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                    setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
                }}>
                    <SelectTrigger className="py-6 text-base text-neutral-400 transition-all transform duration-300 focus:outline-none focus:border-black">
                        <SelectValue placeholder="Bank"/>
                    </SelectTrigger>
                    <SelectContent>
                        {SUPPORTED_BANKS.map((x)=>(
                            <SelectItem className="p-2" value={x.name}>{x.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button additionalStyles="bg-[#608BC1] border-e-2 border-b-2 hover:border-e-[5px] hover:border-b-[5px] border border-black mb-4 mt-5 font-bold" onClick={async () => {
                    try {
                        const {onRampTransact}=await createOnRampTxn(amount * 100, provider)
                        if(onRampTransact){
                            transactions.push(onRampTransact)
                        }
                        if(socket){
                            socket.send(JSON.stringify(transactions))
                        }
                        toast("Transaction Initiated")
                        window.location.href="/transfer"
                        // window.location.href = redirectUrl || "";
                    }
                    catch(e){
                        toast("Something went wrong!")
                    }
            }}>
                    ADD MONEY
                </Button>
            </Card>
        </motion.div>
    )
};

export default AddMoneyCard;