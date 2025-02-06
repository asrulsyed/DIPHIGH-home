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
import { wallet, PROGRAMID } from "../constant";

function createProvider(wallet, connection) {
    const provider = new anchor.AnchorProvider(connection, wallet, {
        commitment: "confirmed",
    });
    anchor.setProvider(provider);
    return provider;
}

function createTransaction() {
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
    connection,
    provider,
    program,
    amount,
    MINT_ADDRESS
) => {
    console.log(program)
    const USER_ADDRESS = wallet.publicKey

    const [tokenVaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("token_vault")],
        program.programId,
    );

    const TOKEN_VAULT_ADDRESS = tokenVaultPda

    const transaction = createTransaction();
    const userAta = getAssociatedTokenAddressSync(
        MINT_ADDRESS,
        USER_ADDRESS,
        true,
        TOKEN_PROGRAM_ID,
    );

    const usererAtaInstruction =
        createAssociatedTokenAccountIdempotentInstruction(
            wallet.publicKey,
            userAta,
            USER_ADDRESS,
            MINT_ADDRESS,
            TOKEN_PROGRAM_ID
        );

    transaction.add(usererAtaInstruction);

    const tokenVaultAta = getAssociatedTokenAddressSync(
        MINT_ADDRESS,
        TOKEN_VAULT_ADDRESS,
        true,
        TOKEN_PROGRAM_ID
    );

    const tokenVaultAtaInstruction =
        createAssociatedTokenAccountIdempotentInstruction(
            USER_ADDRESS,
            tokenVaultAta,
            TOKEN_VAULT_ADDRESS,
            MINT_ADDRESS,
            TOKEN_PROGRAM_ID
        );

    transaction.add(tokenVaultAtaInstruction);

    const mint = await connection.getTokenSupply(MINT_ADDRESS);
    const decimals = mint.value.decimals;
    let send_amount = amount * 10 ** decimals;

    transaction.add(
        await program.methods
            .depositeToken(new anchor.BN(send_amount))
            .accounts({
                mintToken: MINT_ADDRESS,
                userAta: userAta,
                tokenVaultAta: tokenVaultAta,
                tokenProgram: TOKEN_PROGRAM_ID
            })
            .instruction()
    );

    const tx = await provider.sendAndConfirm(transaction)
    return tx
}