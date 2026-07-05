#![cfg(test)]

mod test {
    use crate::contract::*;
    use crate::storage::types::*;
    use crate::tests::test::create_usdc_token;
    use soroban_sdk::{vec, Address, Env, String};
    use soroban_sdk::testutils::Address as _;
    use soroban_sdk::token::Client as TokenClient;
    use soroban_sdk::token::StellarAssetClient as TokenAdminClient;

    fn create_escrow_with_memo(e: &Env) -> (Address, Address, Escrow, TokenClient, TokenAdminClient) {
        let contract_id = e.register(EscrowContract {}, ());
        let admin = Address::generate(e);
        let usdc_token = create_usdc_token(e, &admin);
        
        let escrow = Escrow {
            engagement_id: String::from_str(e, "test_escrow"),
            title: String::from_str(e, "Test Escrow"),
            roles: Roles {
                approver: Address::generate(e),
                service_provider: Address::generate(e),
                platform_address: Address::generate(e),
                release_signer: admin.clone(),
                dispute_resolver: Address::generate(e),
                receiver: Address::generate(e),
            },
            description: String::from_str(e, "Test Description"),
            amount: 1000000,
            platform_fee: 5,
            milestones: vec![e, Milestone {
                description: String::from_str(e, "Milestone 1"),
                status: String::from_str(e, "Pending"),
                evidence: String::from_str(e, ""),
                approved: false,
            }],
            flags: Flags {
                disputed: false,
                released: false,
                resolved: false,
            },
            trustline: Trustline {
                address: usdc_token.0.address.clone(),
            },
            withdrawal_state: WithdrawalState {
                fees_released: false,
                pending_receiver_amount: 0,
            },
            receiver_memo: String::from_str(e, "MEMO123"),
        };

        (contract_id, admin, escrow, usdc_token.0, usdc_token.1)
    }

    #[test]
    fn test_release_funds_with_memo() {
        let env = Env::default();
        env.mock_all_auths();
let (contract_id, token_admin, escrow, _token_client, token_admin_client) = create_escrow_with_memo(&env);
        // Set up initial balance
        token_admin_client.mint(&contract_id, &escrow.amount);

        // Initialize escrow
        env.as_contract(&contract_id, || {
            EscrowContract::initialize_escrow(&env, escrow.clone()).unwrap();

            // Approve milestones before release
            EscrowContract::approve_milestone(env.clone(), 0, escrow.roles.approver.clone()).unwrap();

            // Release funds - should only release fees since memo is present
            EscrowContract::release_funds(&env, token_admin.clone(), env.current_contract_address()).unwrap()
        });

        // Verify state after release
        env.as_contract(&contract_id, || {
            let updated_escrow = EscrowContract::get_escrow(&env).unwrap();
            assert!(updated_escrow.withdrawal_state.fees_released);
            assert!(!updated_escrow.flags.released);
            assert!(updated_escrow.withdrawal_state.pending_receiver_amount > 0);
        });
    }

    #[test]
    fn test_withdraw_with_memo() {
        let env = Env::default();
        env.mock_all_auths();
let (contract_id, token_admin, escrow, _token_client, token_admin_client) = create_escrow_with_memo(&env);
        // Fund contract balance before release
        token_admin_client.mint(&contract_id, &escrow.amount);

        // Initialize escrow
        env.as_contract(&contract_id, || {
            EscrowContract::initialize_escrow(&env, escrow.clone()).unwrap();

            // Approve milestones before release
            EscrowContract::approve_milestone(env.clone(), 0, escrow.roles.approver.clone()).unwrap();

            // First release funds
            EscrowContract::release_funds(&env, token_admin.clone(), env.current_contract_address()).unwrap();

            // Then withdraw with memo
            EscrowContract::withdraw_with_memo(&env).unwrap()
        });

        // Verify final state
        env.as_contract(&contract_id, || {
            let final_escrow = EscrowContract::get_escrow(&env).unwrap();
            assert!(final_escrow.flags.released);
            assert_eq!(final_escrow.withdrawal_state.pending_receiver_amount, 0);
        });
    }

    #[test]
    #[should_panic(expected = "FeesNotReleasedYet")]
    fn test_withdraw_with_memo_before_release() {
        let env = Env::default();
        env.mock_all_auths();
let (contract_id, _token_admin, escrow, _token_client, token_admin_client) = create_escrow_with_memo(&env);
        // Set up initial balance
        token_admin_client.mint(&contract_id, &escrow.amount);

        // Initialize escrow
        env.as_contract(&contract_id, || {
            EscrowContract::initialize_escrow(&env, escrow.clone()).unwrap();

            // Try to withdraw without releasing first - should fail
            EscrowContract::withdraw_with_memo(&env).unwrap()
        });
    }

    #[test]
    #[should_panic(expected = "EscrowAlreadyReleased")]
    fn test_withdraw_with_empty_memo() {
        let env = Env::default();
        env.mock_all_auths();
let (contract_id, token_admin, mut escrow, _token_client, token_admin_client) = create_escrow_with_memo(&env);
        // Set up initial balance
        token_admin_client.mint(&contract_id, &escrow.amount);

        // Set empty memo
        escrow.receiver_memo = String::from_str(&env, "");

        // Initialize escrow
        env.as_contract(&contract_id, || {
            EscrowContract::initialize_escrow(&env, escrow.clone()).unwrap();

            // Approve milestones before release
            EscrowContract::approve_milestone(env.clone(), 0, escrow.roles.approver.clone()).unwrap();

            // Release funds
            EscrowContract::release_funds(&env, token_admin.clone(), env.current_contract_address()).unwrap();

            // Try to withdraw with empty memo - should fail
            EscrowContract::withdraw_with_memo(&env).unwrap()
        });
    }
}