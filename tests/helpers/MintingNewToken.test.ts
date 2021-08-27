import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

import { Wallet } from "@project-serum/anchor";
import { errors } from "../util";
import { Keypair, PublicKey } from "@solana/web3.js";
import { expect } from "chai";
import { debugLog } from "../util/errors";

const anchor = require("@project-serum/anchor");

const DECIMALS = 6;

describe("minting-new-token", () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.AnchorExample;
  const adminWallet: Wallet = provider.wallet

  let newMint;
  const newTokenMinter = adminWallet.payer;

  // so this gets interesting. you don't need to use the wallet provided by anchor everywhere
  // you can create your own wallet and simulate a customer
  const userWallet = new Wallet(Keypair.generate());
  let userNewTokenAccount: PublicKey;

  it("airdropping SOL and minting a new token", () => errors.debugLoggingWrapper(async () => {
    //given
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(userWallet.publicKey, 10000000009),
      "confirmed"
    );

    newMint = await Token.createMint(
      program.provider.connection,
      adminWallet.payer,
      newTokenMinter.publicKey,
      null,
      DECIMALS,
      TOKEN_PROGRAM_ID
    );

    userNewTokenAccount = await newMint.createAssociatedTokenAccount(userWallet.publicKey);

    //when
    await newMint.mintTo(
      userNewTokenAccount,
      newTokenMinter,
      [],
      10000,
    )

    //then
    const nativeTokenUserAccountInfo = await provider.connection.getAccountInfo(userWallet.publicKey, "confirmed");
    const newMintUserAccountInfo = await newMint.getAccountInfo(userNewTokenAccount);

    expect(nativeTokenUserAccountInfo.lamports).to.equal(10000000009);
    expect(newMintUserAccountInfo.amount.toNumber()).to.equal(10000);

    debugLog("nativeTokenUserAccountInfo", nativeTokenUserAccountInfo);
    debugLog("newMintUserAccountInfo", newMintUserAccountInfo);
  }));


});
