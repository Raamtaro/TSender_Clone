"use client"
import InputField from "./UI/InputField"
import { useState } from "react"

export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState<string>("")
    const [recipients, setRecipients] = useState<string>("")
    const [amount, setAmount] = useState<string>("")

    const handleSubmit = async() => {
        console.log("Token Address:", tokenAddress);
        console.log("Recipients:", recipients);
        console.log("Amounts:", amount);
    }
    return (
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit();}}>
            <InputField 
                label="Token Address"
                placeholder="0x"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                type="text"

            />

            <InputField 
                label="Recipients"
                placeholder="0x123... 0x456..."
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                type="text"
                large={true}
                
            />

            <InputField 
                label="Amounts"
                placeholder="100... 200..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                large={true}
                
            />   

            <button type="submit">Send Tokens</button>         
        </form>
    )
}