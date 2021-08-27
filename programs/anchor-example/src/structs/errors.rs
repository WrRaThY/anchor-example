use anchor_lang::prelude::*;

#[error]
pub enum ErrorCode {
    #[msg("You are not authorized to perform this action.")]
    Unauthorized,
}
