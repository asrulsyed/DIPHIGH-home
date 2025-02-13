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
import { MINT_ADDRESS, PROGRAMID } from "@/constant";

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

export const getProgramInstance = (wallet, connection) => {
    const provider = createProvider(wallet, connection);
    return new Program(IDL, PROGRAMID, provider);
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

export const convertToBN = async (array) => {
    let result = array
    for (let i = 0; i < array.length; i++) {
        result[i] = result[i].toNumber() / (10 ** 9)
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
    period,
    apy
) => {
    const transaction = createTransaction();
    const provider = createProvider(wallet, connection)
    const USER_ADDRESS = wallet.publicKey
    const program = getProgramInstance(wallet, connection);

    console.log("provider =>", provider)
    console.log("wallet address =>", USER_ADDRESS.toBase58())

    const [tokenVaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("token_vault")],
        PROGRAMID,
    );

    const [userInfoPDA] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("user_info_maker"),
            MINT_ADDRESS.toBuffer()
        ],
        PROGRAMID
    )

    const [userHistoryPDA] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("user_history"),
            MINT_ADDRESS.toBuffer(),
            wallet.publicKey.toBuffer()
        ],
        PROGRAMID
    )

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
    let user_amount = new anchor.BN(amount * 10 ** decimals);
    let user_period = new anchor.BN(period)
    let user_apy = new anchor.BN(apy)

    transaction.add(
        await program.methods
            .depositeToken(
                user_amount,
                user_period,
                user_apy)
            .accounts({
                mintToken: MINT_ADDRESS,
                userAta: userAta,
                tokenVaultAta: tokenVaultAta,
            }).instruction()
    )

    const tx = await provider.sendAndConfirm(transaction)

    return tx
}

export const getHistory = async (
    mintAddress,
    wallet,
) => {
    const program = getProgramInstance(wallet, connection);
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

export const withdraw_token = async (
    wallet,
    MINT_ADDRESS,
    index
) => {
    const transaction = createTransaction();
    const provider = createProvider(wallet, connection)
    const USER_ADDRESS = wallet.publicKey
    const program = getProgramInstance(wallet, connection);

    console.log("provider =>", provider)
    console.log("wallet address =>", USER_ADDRESS.toBase58())

    const [tokenVaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("token_vault")],
        PROGRAMID,
    );

    const [userInfoPDA] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("user_info_maker"),
            MINT_ADDRESS.toBuffer()
        ],
        PROGRAMID
    )

    const [userHistoryPDA] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("user_history"),
            MINT_ADDRESS.toBuffer(),
            wallet.publicKey.toBuffer()
        ],
        PROGRAMID
    )

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

    const claimSign = await program.methods
        .withdrawToken(new anchor.BN(index))
        .accounts({
            userAta: userAta,
            tokenVaultAta: tokenVaultAta,
            mintToken: MINT_ADDRESS
        })
        .instruction()

    transaction.add(claimSign);
    const tx = await provider.sendAndConfirm(transaction)

    return tx
}

export const redeposite_token = async (
    wallet,
    MINT_ADDRESS,
    index
) => {
    const transaction = createTransaction();
    const provider = createProvider(wallet, connection)
    const USER_ADDRESS = wallet.publicKey
    const program = getProgramInstance(wallet, connection);

    console.log("provider =>", provider)
    console.log("wallet address =>", USER_ADDRESS.toBase58())

    const [tokenVaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("token_vault")],
        PROGRAMID,
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

    const claimSign = await program.methods
        .redepositeToken(new anchor.BN(index))
        .accounts({
            userAta: userAta,
            tokenVaultAta: tokenVaultAta,
            mintToken: MINT_ADDRESS
        })
        .instruction()

    transaction.add(claimSign);
    const tx = await provider.sendAndConfirm(transaction)

    return tx
}

