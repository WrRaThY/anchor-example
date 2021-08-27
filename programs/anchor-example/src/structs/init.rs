pub use anchor_lang::prelude::*;
pub use anchor_spl::token::{self, Mint, TokenAccount};

use crate::structs::state::State;
use crate::constants::ANCHOR_EXAMPLE_STATE_SEED;

/// So this little thing here transforms the array of provided accounts into something more readable (a struct), so you don't need to iterate over bytes
/// and unwrap them as you go. extremely useful
/// In this case - we also provide a bump for our PDA, so we can validate it has been generated correctly
#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct Init<'info> {
    /// ProgramAccount will load... well a PDA. it needs the seeds and a payer to be able to initialize the account
    /// you could use the [state] macro here, but I prefer to have complete control over my accounts.
    /// init means that... no, wait, you went through the anchor tutorial, right? good boy. no need to explain!
    /// note the usage of a variables in the seeds. super useful stuff. and the end of typos!
    #[account(init, seeds = [ANCHOR_EXAMPLE_STATE_SEED.as_bytes(), & [bump]], payer = admin)]
    pub state: ProgramAccount<'info, State>,

    #[account(signer)]
    pub admin: AccountInfo<'info>,

    pub system_program: AccountInfo<'info>,
}
