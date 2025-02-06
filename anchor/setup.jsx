import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import {
    PublicKey,
    Transaction,
    ComputeBudgetProgram,
    Connection,
    clusterApiUrl,
    SystemProgram,
} from "@solana/web3.js";
import {
    createAssociatedTokenAccountIdempotentInstruction,
    getAssociatedTokenAddressSync,
    TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import IDL from "./idl.json";
import { PROGRAMID } from "@/constant";

const programId = new PublicKey("ADbv96w7D9argjCubvNbf4oKdCFN8nU6yc4Y8ZDbdHnY");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const createProvider = (wallet, connection) => {
    const provider = new anchor.AnchorProvider(connection, wallet, {
        commitment: "confirmed",
    });
    anchor.setProvider(provider);
    return provider;
}

// export const program = new Program(IDL, programId, {
//     connection,
// });

export const getProgramInstance = (wallet, connection) => {
    const provider = createProvider(wallet, connection);
    return new Program(IDL, programId, provider);
};

export const getDecimal = async (mintAddress) => {
    const mint = await connection.getTokenSupply(mintAddress);
    const decimals = mint.value.decimals;
    return decimals
}

const getUserInfoPda = (mintAddress) => {
    const [userInfoPDA] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("user_info_maker"),
            mintAddress.toBuffer()
        ],
        PROGRAMID
    )
    return userInfoPDA
}

const getUserHistoryPda = (mintAddress, wallet) => {
    const [userHistoryPDA] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("user_history"),
            mintAddress.toBuffer(),
            wallet.publicKey.toBuffer()
        ],
        PROGRAMID
    )
    return userHistoryPDA
}

const getTokenVaultPda = () => {
    const [tokenVaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("token_vault")],
        PROGRAMID
    );
    return tokenVaultPda
}

export const convertToBN = async (array, decimals) => {
    let result = array
    for (let i = 0; i < array.length; i++) {
        result[i] = result[i].toNumber() / (10 ** decimals)
    }
    return result
}

export const convertFromHextToInt = async (array) => {
    let result = array
    for (let i = 0; i < array.length; i++) {
        result[i] = result[i].toNumber()
    }
    return result
}

export const createTransaction = () => {
    const transaction = new Transaction();
    transaction.add(
        ComputeBudgetProgram.setComputeUnitLimit({
            units: 200000
        })
    );
    return transaction;
}

export const deposite_token = async (
    wallet,
    MINT_ADDRESS,
    amount,
) => {
    const transaction = createTransaction();
    const provider = createProvider(wallet, connection)
    const USER_ADDRESS = wallet.publicKey
    const program = getProgramInstance(wallet, connection);
    
    console.log("provider =>", provider)
    console.log("wallet address =>", USER_ADDRESS.toBase58())

    const [tokenVaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("token_vault")],
        program.programId,
    );

    const TOKEN_VAULT_ADDRESS = tokenVaultPda
    const userAta = getAssociatedTokenAddressSync(
        MINT_ADDRESS,
        USER_ADDRESS,
        true,
    );

    const usererAtaInstruction =
        createAssociatedTokenAccountIdempotentInstruction(
            USER_ADDRESS,
            userAta,
            USER_ADDRESS,
            MINT_ADDRESS,
        );

    transaction.add(usererAtaInstruction);

    const tokenVaultAta = getAssociatedTokenAddressSync(
        MINT_ADDRESS,
        TOKEN_VAULT_ADDRESS,
        true,
    );

    const tokenVaultAtaInstruction =
        createAssociatedTokenAccountIdempotentInstruction(
            USER_ADDRESS,
            tokenVaultAta,
            TOKEN_VAULT_ADDRESS,
            MINT_ADDRESS,
        );

    transaction.add(tokenVaultAtaInstruction);

    const mint = await provider.connection.getTokenSupply(MINT_ADDRESS);
    const decimals = mint.value.decimals;
    let send_amount = amount * 10 ** decimals;

    // transaction.add(
    const tx1 = await program.methods
        .depositeToken(new anchor.BN(send_amount))
        .accounts({
            userAta: userAta,
            tokenVaultAta: tokenVaultAta,
            mintToken: MINT_ADDRESS
        }).instruction()
    // );
    transaction.add(tx1)

    const tx = await provider.sendAndConfirm(transaction)
    return tx
}


export const getHistory = async (
    mintAddress,
    wallet,
) => {
    const [userHistoryPDA] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("user_history"),
            mintAddress.toBuffer(),
            wallet.toBuffer()
        ],
        PROGRAMID
    )

    const userHistoryData = await program.account.userHistory.fetch(
        userHistoryPDA
    )
    return userHistoryData
}

export const convertToLocalTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const localTimeString = date.toLocaleString();
    return localTimeString;
}