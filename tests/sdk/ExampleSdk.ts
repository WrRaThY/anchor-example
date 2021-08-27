import idlFile from "../../target/idl/anchor_example.json"
import { Idl, Program, Provider, utils, Wallet } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import * as Seeds from "../util/seeds";
import { State } from "./State";
import { debugLog } from "../util/errors";

const anchor = require("@project-serum/anchor");

export const PROGRAM_STATE_SEED = 'anchor-example-state'
export const PROGRAM_SEED = 'anchor-example'

export class ExampleSdk {
  readonly provider: Provider
  readonly idl: Idl = idlFile as Idl
  readonly program: Program
  readonly wallet: Wallet

  state?: State

  //PDAs
  statePda?: PublicKey
  stateBump?: number

  programSignerPda?: PublicKey
  programSignerBump?: number

  constructor(provider: Provider, program: Program) {
    this.provider = provider;
    this.program = new Program(this.idl, program.programId, provider);
    this.wallet = this.provider.wallet as Wallet;
  }

  public async refreshState(): Promise<State> {
    this.state = (await this.program.account.state.fetch(this.statePda!)) as State
    return this.state;
  }

  public async init(admin: PublicKey): Promise<State> {
    const [_statePda, _stateBump] = await PublicKey.findProgramAddress(
      [Buffer.from(utils.bytes.utf8.encode(PROGRAM_STATE_SEED))],
      this.program.programId
    )

    const [_programSignerPda, _programSignerBump] = await PublicKey.findProgramAddress(
      Seeds.from(PROGRAM_SEED),
      this.program.programId
    )

    debugLog(`init. _stateBump = ${_stateBump}, _programSignerBump = ${_programSignerBump}`)
    debugLog(`init. _statePda = ${_statePda}, _programSignerPda = ${_programSignerPda}`)
    await this.program.rpc.init(_stateBump, _programSignerBump, {
      accounts: {
        state: _statePda,
        admin: admin,
        systemProgram: anchor.web3.SystemProgram.programId
      },
    })
    this.statePda = _statePda;
    this.stateBump = _stateBump;
    this.programSignerPda = _programSignerPda;
    this.programSignerBump = _programSignerBump;
    return await this.refreshState()
  }

}

