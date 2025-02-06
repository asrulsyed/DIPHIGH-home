"use client"
import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { createContext, useEffect, useState, useMemo } from "react"
import {
    PublicKey,
    Transaction,
    ComputeBudgetProgram,
    Connection,
    clusterApiUrl,
    SystemProgram,
} from "@solana/web3.js";
import IDL from "../anchor/idl.json";
import { PROGRAMID } from "@/constant";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";

const Web3Context = createContext(null)

export const Web3Provider = ({ children }) => {

    const wallet = useAnchorWallet()
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const [provider, setProvider] = useState()
    const [userConnection, setConnection] = useState()
    const [userWallet, setWallet] = useState()
    const [program, setProgram] = useState()

    const createProvider = (_wallet, _connection) => {
        const _provider = new anchor.AnchorProvider(_connection, _wallet, {
            commitment: "confirmed",
        });
        anchor.setProvider(_provider);
        return _provider;
    }

    const value = useMemo(() => ({
        provider: provider,
        userConnection: userConnection,
        userWallet: userWallet,
        program: program
    }), [
        provider,
        connection,
        wallet,
        program
    ])

    useEffect(() => {
        const setEnv = async () => {
            console.log("context....")
            const _userConnection = connection;
            await setConnection(_userConnection)
            const _provider = createProvider(wallet, connection)
            await setProvider(_provider)
            const _program = new Program(IDL, PROGRAMID, { connection, });
            await setProgram(_program)
            const _userWallet = wallet
            await setWallet(_userWallet)
        }
        // if (wallet)
            // setEnv()
    }, [wallet, connection])


    return (
        <Web3Context.Provider value={value}>
            {children}
        </Web3Context.Provider>
    )
}

export default Web3Context