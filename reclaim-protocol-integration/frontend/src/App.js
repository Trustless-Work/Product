import "./App.css";
import { ReclaimProofRequest } from "@reclaimprotocol/js-sdk";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import VerifyProof from "./verify-proof";
import ConnectWallet from "./wallet-button";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const APP_ID = process.env.REACT_APP_APP_ID;
const APP_SECRET = process.env.REACT_APP_APP_SECRET;
const PROVIDER_ID = process.env.REACT_APP_PROVIDER_ID;

function App() {
  const [url, setUrl] = useState("");
  const [ready, setReady] = useState(false);
  const [proof, setProof] = useState({});
  const [reclaimProofRequest, setReclaimProofRequest] = useState(null);
  const [requestUrl, setRequestUrl] = useState("");
  const [statusUrl, setStatusUrl] = useState("");

  useEffect(() => {
    async function initializeReclaim() {
      // Initialize the Reclaim SDK with your credentials
      const proofRequest = await ReclaimProofRequest.init(
        APP_ID,
        APP_SECRET,
        PROVIDER_ID,
        { log: true }
      );
      setReclaimProofRequest(proofRequest);
    }

    initializeReclaim();
  }, []);

  async function generateVerificationRequest() {
    if (!reclaimProofRequest) {
      console.error("Reclaim Proof Request not initialized");
      return;
    }

    // TODO: wtf is that
    // reclaimProofRequest.addContext(
    //   `user's address`,//  Unique hex address identifier (string)
    //   "for acmecorp.com on 1st january"
    // );

    // TODO: params to achieve on validation
    // reclaimProofRequest.setParams({ // Params value must be a string
    //   minConnections: '500',
    //   industry: 'Technology'
    // })

    // Generate the verification request URL
    const url = await reclaimProofRequest.getRequestUrl();
    setUrl(url);
    // TODO: wtf is that
    const status = reclaimProofRequest.getStatusUrl();
    setStatusUrl(status);

    // Start listening for proof submissions
    await reclaimProofRequest.startSession({

      onSuccess: (proofs) => {
        if (typeof proofs === 'string') {
          // When using a custom callback url, the proof is returned to the callback url and we get a message instead of a proof
          console.log('SDK Message:', proofs);
        } else if (typeof proofs !== 'string') {
          // When using the default callback url, we get a proof object in the response
          if (Array.isArray(proofs)) {
            // when using provider with multiple proofs, we get an array of proofs
            console.log('Array Verification success', JSON.stringify(proofs.map(p => p.claimData.context)));
          } else {
            // when using provider with a single proof, we get a single proof object
            console.log('Single Verification success', proofs?.claimData.context);
          }
        }
        setReady(true)
        setProof(proofs)
      },
      onError: (error) => {
        console.error('Verification failed', error)
      }
    })
      ;
  }

  return (
    <div className="App">
      <ConnectWallet />
      {!url && (
        <button onClick={generateVerificationRequest}>
          Create Claim QrCode
        </button>
      )}
      {url && <QRCode value={url} />}
      {ready && <VerifyProof proof={proof} contract={CONTRACT_ADDRESS}></VerifyProof>}
    </div>
  );
}

export default App;
