use anchor_lang::prelude::*;

#[account]
#[derive(PartialEq, Default, Debug)]
//@formatter:off
pub struct State {                          // 8 - account signature
    pub admin: Pubkey,                      // 32
    pub state_bump: u8,                     // 1
    pub signer_bump: u8,                    // 1
    pub counter: u16,                       // 2
}                                           // XX - total
//@formatter:on
