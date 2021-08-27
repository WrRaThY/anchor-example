import { PublicKey } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";

//@formatted:off
export interface State {
  admin: PublicKey          // 32
  stateBump: number,        // 1
  signerBump: number,       // 1
  counter: BN,              // 2
}
