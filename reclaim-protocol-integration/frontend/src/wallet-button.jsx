import freighterApi from "@stellar/freighter-api";
import { useState } from "react";

export default function ConnectWallet() {
  const [publicKey, setPublicKey] = useState("");

  const retrievePublicKey = async () => {
    let publicKey = "";
    let error = "";

    try {
      publicKey = await freighterApi.requestAccess();
    } catch (e) {
      error = e;
    }

    if (error) {
      console.log(error);
    }

    setPublicKey(publicKey);
  };

  return (
    <div>
      {publicKey ? (
        <div>{publicKey}</div>
      ) : (
        <button onClick={retrievePublicKey}>Connect wallet</button>
      )}
      <style jsx="true">{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .button {
          border: solid 1px #ccc;
          margin: 0 0 20px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
