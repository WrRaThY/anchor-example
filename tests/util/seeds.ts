import {utils} from "@project-serum/anchor";
import {PublicKey} from "@solana/web3.js";

/**
 * can be used like that:
 *     const [pda, bump] = await PublicKey.findProgramAddress(
 *       Seeds.from(signer.publicKey, "input"),
 *       this.program.programId
 *     )
 * or like that:
 *     const [pda, bump] = await PublicKey.findProgramAddress(
 *       [signer.publicKey.toBuffer(), ...Seeds.from("input")],
 *       this.program.programId
 *     )
 */
export function from(...seeds: (string | PublicKey)[]): Buffer[] {
  return seeds.map(it => {
    if (typeof it === 'string') {
      return Buffer.from(utils.bytes.utf8.encode(it));
    } else {
      return it.toBuffer();
    }
  })
}
