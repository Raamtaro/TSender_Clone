"use client"
import InputField from "./UI/InputField"
import { useState, useMemo } from "react"
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constants"
import { useChainId, useConfig, useAccount, useWriteContract, useReadContracts } from "wagmi"
import { readContract, waitForTransactionReceipt } from "@wagmi/core"
import { calculateTotal } from "../utils/calculateTotal/calculateTotal"

export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState<string>("")
    const [recipients, setRecipients] = useState<string>("")
    const [amount, setAmount] = useState<string>("")
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const chainId = useChainId()
    const config = useConfig()
    const account = useAccount()

    const total: number = useMemo(()=> {
        return calculateTotal(amount)
    }, [amount])

    const {data: hash, isPending, writeContractAsync} = useWriteContract()


    async function getApprovedAmount(tSenderAddress: string | null): Promise<number> {
        if (!tSenderAddress) {
            alert("No address found, please use a supported chain")
            return 0
        }
        const response = await readContract(config, {
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: "allowance",
            args: [account.address, tSenderAddress as `0x${string}`],
        })

        return response as number

    }

    const handleSubmit = async() => {

        setIsProcessing(true)
        
        const tsenderAddress = chainsToTSender[chainId]["tsender"]
        const approvedAmount = await getApprovedAmount(tsenderAddress)

        const doAirdrop = () => writeContractAsync(
            {
                abi: tsenderAbi,
                address: tsenderAddress as `0x${string}`,
                functionName: "airdropERC20",
                args: [
                    tokenAddress,
                    // Comma or new line separated
                    recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    amount.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                    BigInt(total),
                ],
            }
        )

        try {
            if (total > approvedAmount) {
                const approvalHash = await writeContractAsync(
                    {
                        abi: erc20Abi,
                        address: tokenAddress as `0x${string}`,
                        functionName: "approve",
                        args: [tsenderAddress as `0x${string}`, BigInt(total)]
                    }
                )
    
                const approvalReceipt = await waitForTransactionReceipt(config, 
                    {
                        hash: approvalHash
                    }
                )
    
                console.log(approvalReceipt)
    
                // await writeContractAsync(
                //     {
                //         abi: tsenderAbi,
                //         address: tsenderAddress as `0x${string}`,
                //         functionName: "airdropERC20",
                //         args: [
                //             tokenAddress,
                //             // Comma or new line separated
                //             recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                //             amount.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                //             BigInt(total),
                //         ],
                //     }
                // )
            } 
    
            await doAirdrop()

        } catch (error) {
            console.error(error)
        } finally {
            setIsProcessing(false)
        }

        // if (total > approvedAmount) {
        //     const approvalHash = await writeContractAsync(
        //         {
        //             abi: erc20Abi,
        //             address: tokenAddress as `0x${string}`,
        //             functionName: "approve",
        //             args: [tsenderAddress as `0x${string}`, BigInt(total)]
        //         }
        //     )

        //     const approvalReceipt = await waitForTransactionReceipt(config, 
        //         {
        //             hash: approvalHash
        //         }
        //     )

        //     console.log(approvalReceipt)

        //     // await writeContractAsync(
        //     //     {
        //     //         abi: tsenderAbi,
        //     //         address: tsenderAddress as `0x${string}`,
        //     //         functionName: "airdropERC20",
        //     //         args: [
        //     //             tokenAddress,
        //     //             // Comma or new line separated
        //     //             recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
        //     //             amount.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
        //     //             BigInt(total),
        //     //         ],
        //     //     }
        //     // )
        // } 

        // await doAirdrop()

        // else {
        //     await writeContractAsync(
        //         {
        //             abi: tsenderAbi,
        //             address: tsenderAddress as `0x${string}`,
        //             functionName: "airdropERC20",
        //             args: [
        //                 tokenAddress,
        //                 // Comma or new line separated
        //                 recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
        //                 amount.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
        //                 BigInt(total),
        //             ],
        //         }
        //     )
        // }
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

            <button 
                type="submit" 
                className="
                    bg-blue-600 hover:bg-blue-700 
                    text-white font-medium 
                    py-2 px-4 
                    rounded-lg 
                    shadow-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                    transition-colors duration-200
                    "
            >
                Send Tokens
            </button>         
        </form>
    )
}