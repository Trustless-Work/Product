import React, { useState } from "react";

const contractId = "CB3Z4V72OPFTHA6MBJCOFXGXTFJIG463LOTPBXMWFDAUZRIUX7IH4LDG";
const apiUrl = `http://localhost:5000/api/contract-data/${contractId}`;

const App: React.FC = () => {
  const [milestones, setMilestones] = useState<
    { description: string; status: string }[]
  >([]);
  const [totalAmount, setTotalAmount] = useState<bigint | null>(null);
  const [platformFee, setPlatformFee] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      const record = json._embedded.records[0];

      const base64Value = record.value;

      // Decode Base64 to binary string
      const binaryString = atob(base64Value);

      // Convert binary string to a byte array
      const byteArray = Uint8Array.from(binaryString, (char) =>
        char.charCodeAt(0),
      );

      // Function to parse binary data
      function parseBinaryData(bytes: Uint8Array) {
        const dataView = new DataView(bytes.buffer);

        return {
          amount: dataView.getBigUint64(0, true), // Unsigned 64-bit integer
          milestones: [
            {
              description: "First Milestone", // Replace with dynamic parsing
              status: "inProgress", // Replace with dynamic parsing
            },
          ],
          platform_fee: dataView.getUint32(40, true), // Unsigned 32-bit integer
        };
      }

      const parsedData = parseBinaryData(byteArray);

      // Update state
      setTotalAmount(parsedData.amount);
      setMilestones(parsedData.milestones);
      setPlatformFee(parsedData.platform_fee);

      console.log("Decoded Data:", parsedData);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
      }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>
        Escrow Contract Details
      </h1>
      <button
        onClick={fetchData}
        style={{
          display: "block",
          margin: "20px auto",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}>
        Fetch Data
      </button>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>
      )}

      {!loading && !error && (
        <>
          {totalAmount !== null && (
            <div style={{ marginBottom: "20px" }}>
              <h2>Total Amount Set in Escrow</h2>
              <p style={{ fontSize: "18px", color: "#555" }}>
                {totalAmount.toString()} USDC
              </p>
            </div>
          )}

          {milestones.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h2>Milestones</h2>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {milestones.map((milestone, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      backgroundColor: "#F9F9F9",
                      borderRadius: "5px",
                      boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                    }}>
                    <strong>{milestone.description}</strong>:{" "}
                    <span style={{ color: "#007BFF" }}>{milestone.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {platformFee !== null && (
            <div>
              <h2>Platform Fee</h2>
              <p style={{ fontSize: "18px", color: "#555" }}>
                {platformFee} USDC
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

// import React, { useState } from "react";
// import { Server, xdr, scValToNative } from "soroban-client"; // Correct import
// import { Buffer } from "buffer";

// // Soroban Testnet RPC Endpoint
// const RPC_URL = "https://rpc-futurenet.stellar.org";

// // Contract Details
// const ENGAGEMENT_CONTRACT_ID =
//   "CB3Z4V72OPFTHA6MBJCOFXGXTFJIG463LOTPBXMWFDAUZRIUX7IH4LDG"; // Engagement Contract
// const USDC_CONTRACT_ID =
//   "CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA"; // USDC Token Contract Address

// // Define Milestone Type
// interface Milestone {
//   description: string;
//   status: string;
// }

// const App: React.FC = () => {
//   const [engagementId, setEngagementId] = useState<string>(""); // Input for engagement ID
//   const [milestones, setMilestones] = useState<Milestone[]>([]); // List of milestones
//   const [usdcBalance, setUsdcBalance] = useState<number | null>(null); // USDC Balance
//   const [totalAmount, setTotalAmount] = useState<number | null>(null); // Total escrow amount
//   const [loading, setLoading] = useState<boolean>(false); // Loading state
//   const [error, setError] = useState<string | null>(null); // Error message

//   const server = new Server(RPC_URL);

//   // Helper to invoke contract and fetch response
//   const invokeContract = async (
//     contractId: string,
//     functionName: string,
//     args: xdr.ScVal[],
//   ): Promise<any> => {
//     try {
//       const response = await server.simulateTransaction({
//         contractId,
//         functionName,
//         args,
//       });
//       return response;
//     } catch (err) {
//       console.error(`Error invoking contract function "${functionName}":`, err);
//       throw new Error(
//         `Failed to call ${functionName}: ${(err as Error).message}`,
//       );
//     }
//   };

//   // Fetch Escrow Details
//   const fetchEscrowDetails = async (): Promise<void> => {
//     if (!engagementId) {
//       setError("Engagement ID is required.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const engagementIdBuffer = Buffer.from(engagementId, "utf-8");
//       const response = await invokeContract(
//         ENGAGEMENT_CONTRACT_ID,
//         "get_escrow_by_id",
//         [xdr.ScVal.scvString(engagementIdBuffer.toString("base64"))],
//       );

//       if (response && response.value) {
//         const parsedResponse = scValToNative(response.value);

//         // Extract milestones
//         const milestonesData: Milestone[] = parsedResponse.milestones.map(
//           (milestone: any) => ({
//             description: milestone.description,
//             status: milestone.status,
//           }),
//         );

//         setMilestones(milestonesData);

//         // Extract total escrow amount
//         setTotalAmount(parsedResponse.totalAmount);
//       } else {
//         throw new Error("No escrow data found for this engagement ID.");
//       }
//     } catch (err) {
//       console.error("Error fetching escrow details:", err);
//       setError("Failed to fetch escrow details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch USDC Balance
//   const fetchUsdcBalance = async (): Promise<void> => {
//     setLoading(true);
//     setError(null);

//     try {
//       const engagementIdBuffer = Buffer.from(ENGAGEMENT_CONTRACT_ID, "utf-8");
//       const response = await invokeContract(USDC_CONTRACT_ID, "balance", [
//         xdr.ScVal.scvString(engagementIdBuffer.toString("base64")),
//       ]);

//       if (response && response.value) {
//         const parsedResponse = scValToNative(response.value);
//         setUsdcBalance(parsedResponse.balance);
//       } else {
//         throw new Error("USDC balance not found.");
//       }
//     } catch (err) {
//       console.error("Error fetching USDC balance:", err);
//       setError("Failed to fetch USDC balance.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch all data (Escrow details and USDC balance)
//   const fetchAllData = async (): Promise<void> => {
//     await fetchEscrowDetails();
//     await fetchUsdcBalance();
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//       <h1>Soroban Escrow Dashboard</h1>

//       <div>
//         <label htmlFor="engagementId">Engagement ID:</label>
//         <input
//           id="engagementId"
//           type="text"
//           value={engagementId}
//           onChange={(e) => setEngagementId(e.target.value)}
//           placeholder="Enter Engagement ID"
//           style={{ marginLeft: "10px", padding: "5px" }}
//         />
//       </div>

//       <button
//         onClick={fetchAllData}
//         disabled={loading}
//         style={{ marginTop: "20px" }}>
//         {loading ? "Loading..." : "Fetch Data"}
//       </button>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <div style={{ marginTop: "20px" }}>
//         <h3>USDC Balance in Contract:</h3>
//         <p>{usdcBalance !== null ? `${usdcBalance} USDC` : "N/A"}</p>

//         <h3>Total Escrow Amount:</h3>
//         <p>{totalAmount !== null ? `${totalAmount}` : "N/A"}</p>

//         <h3>Milestones:</h3>
//         {milestones.length > 0 ? (
//           <ul>
//             {milestones.map((milestone, index) => (
//               <li key={index}>
//                 {milestone.description} - {milestone.status}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No milestones available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
