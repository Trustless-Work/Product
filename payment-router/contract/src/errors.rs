use soroban_sdk::contracterror;

#[contracterror]
pub enum Error {
    AlreadyInitialized = 1,
    NotInitialized = 2,
    InvalidBpsTotal = 3,
    EmptyRecipientList = 4,
    ZeroBps = 5,
    DuplicateRecipient = 6,
    Unauthorized = 7,
    ZeroBalance = 8,
    RecipientNotFound = 9,
}
