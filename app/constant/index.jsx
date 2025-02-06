"use client"
import { BN, Program } from "@coral-xyz/anchor";
import {
    PublicKey,
    Transaction,
    ComputeBudgetProgram,
    Connection,
    clusterApiUrl
} from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";



export const PROGRAMID = new PublicKey("Aw7gsrwSAE6H2UxXjXzZcyhwPPr2G4NCPH6My1CtSWX")
export const MINT_ADDRESS = new PublicKey("mntzz9uZYp3nffAXyt26xEVz37DKeuutxp9wFQ3brWX")

