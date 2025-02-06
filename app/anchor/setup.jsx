import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import {
    PublicKey,
    Transaction,
    ComputeBudgetProgram,
    Connection,
    clusterApiUrl
} from "@solana/web3.js";
import {
    createAssociatedTokenAccountIdempotentInstruction,
    getAssociatedTokenAddressSync,
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

export const deposite_token = async (wallet, connection, amount, MINT_ADDRESS) => {

    // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const provider = createProvider(wallet, connection)

    const program = new Program(IDL, PROGRAMID, provider);
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

    console.log("mint =>", mint)

    transaction.add(
        await program.methods
            .depositeToken(new anchor.BN(send_amount))
            .accounts({
                userAta: userAta,
                tokenVaultAta: tokenVaultAta,
                mintToken: MINT_ADDRESS
            })
            .instruction()
    );

    const tx = await provider.sendAndConfirm(transaction)
    return tx
}