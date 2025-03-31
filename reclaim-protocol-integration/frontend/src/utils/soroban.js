import {
    Address,
    Contract,
    Memo,
    MemoType,
    nativeToScVal,
    Operation,
    scValToNative,
    SorobanRpc,
    TimeoutInfinite,
    Transaction,
    TransactionBuilder,
    xdr,
  } from "@stellar/stellar-sdk";
  
  import { TESTNET_DETAILS } from "./network";
  import { stroopToXlm } from "./format";
  import { ERRORS } from "./error";
  
  // TODO: once soroban supports estimated fees, we can fetch this
  export const BASE_FEE = "100";
  export const baseFeeXlm = stroopToXlm(BASE_FEE).toString();
  
  export const SendTxStatus = {
    Pending: "PENDING",
    Duplicate: "DUPLICATE",
    Retry: "TRY_AGAIN_LATER",
    Error: "ERROR",
  };
  
  export const XLM_DECIMALS = 7;
  
  export const RPC_URLS = {
    TESTNET: "https://soroban-testnet.stellar.org/",
  };
  
  // Get a server configfured for a specific network
  export const getServer = () =>
    new SorobanRpc.Server(RPC_URLS[TESTNET_DETAILS.network], {
      allowHttp: TESTNET_DETAILS.networkUrl.startsWith("http://"),
    });

  export const PROOF = {
    "identifier": "0x0ae1908b6ea3e2729c930391e2e8e08708f2e04073f000a6c92e4f73bc958e27",
    "claimData": {
      "provider": "http",
      "parameters": "{\"body\":\"\",\"geoLocation\":\"in\",\"method\":\"GET\",\"paramValues\":{\"CLAIM_DATA\":\"76561199632643233\"},\"responseMatches\":[{\"type\":\"contains\",\"value\":\"_steamid\\\">Steam ID: {{CLAIM_DATA}}</div>\"}],\"responseRedactions\":[{\"jsonPath\":\"\",\"regex\":\"_steamid\\\">Steam\\\\ ID:\\\\ (.*)</div>\",\"xPath\":\"id(\\\"responsive_page_template_content\\\")/div[@class=\\\"page_header_ctn\\\"]/div[@class=\\\"page_content\\\"]/div[@class=\\\"youraccount_steamid\\\"]\"}],\"url\":\"https://store.steampowered.com/account/\"}",
      "owner": "0xb252b0325a666caa0068cd255aa6a1f03f818fa1",
      "timestampS": 1721052746,
      "context": "{\"contextAddress\":\"user's address\",\"contextMessage\":\"for acmecorp.com on 1st january\",\"extractedParameters\":{\"CLAIM_DATA\":\"76561199632643233\"},\"providerHash\":\"0x61433e76ff18460b8307a7e4236422ac66c510f0f9faff2892635c12b7c1076e\"}",
      "identifier": "0x0ae1908b6ea3e2729c930391e2e8e08708f2e04073f000a6c92e4f73bc958e27",
      "epoch": 1
    },
    "witnesses": [
      {
        "id": "0x244897572368eadf65bfbc5aec98d8e5443a9072",
        "url": "wss://witness.reclaimprotocol.org/ws"
      }
    ],
    "signatures": [
      "0x5545da825271b178e95f1a500147d6c7ff7709015f3443a0d6bc2b73c81bf47b7efd9aa8e0a6bf0557b234a2d783c39fd8f896da69d3e7b4aac1b3566df3593d1b"
    ]
  }
  