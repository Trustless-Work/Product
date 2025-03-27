## Setup 
prerequisites: installed stellar and soroban 

```
$ stellar -V
stellar 22.2.0 (b60196ff3b286e4b7d1296e4197644f449b2ec7e)
stellar-xdr 22.0.0-rc.1.1 (72e523004b5906eb1829990f9b14d2f0fa3018f0)
xdr curr (529d5176f24c73eeccfa5eba481d4e89c19b1181)

```

### Contract repo

create an account

```
stellar keys generate --global reclaim --network testnet --fund
stellar keys address reclaim
stellar keys secret reclaim
```

you get your public address and secret

deploy the contract and invoke it as described with address from previous step
eou will get contract address

```bash
RUSTFLAGS="-C target-feature=-reference-types" cargo build --target wasm32-unknown-unknown --release
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/reclaim.wasm --source reclaim --network testnet
export CONTRACT= #Paste in the resulting contract address
export ACCOUNT= #Paste in your public address
soroban contract invoke --id $CONTRACT --source reclaim --network testnet -- instantiate --user $ACCOUNT
```

### Frontend repo

for frontend app you will need `APP_SECRET` adn `APP_ID` for Github provider
you can get it here https://dev.reclaimprotocol.org/dashboard

in App.js change `APP_SECRET` adn `APP_ID`

in `.env` set `REACT_APP_CONTRACT_ADDRESS="you contract addres from step 2"`

run the frontend app

### Browser

install Freighter wallet and import stellar secret key from step 1 (import is possible after creating first one)

connect and verify
