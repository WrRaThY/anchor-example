use anchor_lang::prelude::*;

use structs::*;

mod structs;
mod constants;

#[program]
pub mod anchor_example {
    use super::*;

    pub fn init(ctx: Context<Init>, bump: u8, signer_bump: u8) -> structs::Result<()> {
        let state = &mut ctx.accounts.state;

        state.admin = *ctx.accounts.admin.key;
        state.state_bump = bump;
        state.signer_bump = signer_bump;
        state.counter = 0;

        Ok(())
    }
}


