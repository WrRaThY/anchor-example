import { Wallet } from "@project-serum/anchor";
import { ExampleSdk, State } from "./sdk";
import { Keypair } from "@solana/web3.js";
import { expect } from "chai";
import { errors } from "./util";

const anchor = require('@project-serum/anchor');

describe('anchor-example', () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.AnchorExample;
  const adminWallet: Wallet = provider.wallet
  const userWallet: Keypair = provider.wallet.payer;

  const sdk = new ExampleSdk(provider, program);

  it("Sets up the test", () => errors.debugLoggingWrapper(async () => {
    //given
    const state: State = await sdk.init(adminWallet.publicKey)

    //then
    expect(state.admin).to.deep.equal(adminWallet.publicKey);
    expect(state.counter).to.deep.equal(0);
  }));
});
