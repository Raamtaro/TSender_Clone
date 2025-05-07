"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import {anvil, zksync, sepolia, zksyncSepoliaTestnet} from "wagmi/chains"

export default getDefaultConfig(
    {
        appName: "TSender",
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECTID!,
        chains: [anvil, zksync, sepolia, zksyncSepoliaTestnet],
        ssr: false
    }
)