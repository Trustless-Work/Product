import React, { useState } from "react";
import { xdr, scValToNative } from "@stellar/stellar-sdk";
import { Buffer } from "buffer";

interface ContractDataEntry {
  key: string;
  value: string;
  durability: string;
  ttl: number;
  updated: number;
  paging_token: string;
}

interface FilteredData {
  escrowId: string;
  milestones: { description: string; status: string }[];
  totalAmount: string;
  currentBalance: string;
}

const contractId = "CB3Z4V72OPFTHA6MBJCOFXGXTFJIG463LOTPBXMWFDAUZRIUX7IH4LDG";
const apiUrl = `http://localhost:5000/api/contract-data/${contractId}`;

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [escrowId, setEscrowId] = useState<string>("");
  const [filteredData, setFilteredData] = useState<FilteredData | null>(null);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setFilteredData(null);

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();

      const escrowKey = ["Escrow", escrowId];
      let matchedEntry: any = null;

      json._embedded.records.forEach((entry: ContractDataEntry) => {
        if (entry.durability === "instance") {
          const instance = xdr.ScVal.fromXDR(
            Buffer.from(entry.value, "base64"),
          ).instance();
          const storage = instance.storage() || [];

          const found = storage.find((kv: any) => {
            const key = scValToNative(kv.key());
            return JSON.stringify(key) === JSON.stringify(escrowKey);
          });

          if (found) {
            matchedEntry = scValToNative(found.val());
          }
        }
      });

      if (matchedEntry) {
        const milestones = matchedEntry.milestones.map((m: any) => ({
          description: m.description,
          status: m.status,
        }));

        setFilteredData({
          escrowId: matchedEntry.engagement_id,
          milestones,
          totalAmount: matchedEntry.amount,
          currentBalance: matchedEntry.platform_fee,
        });
      } else {
        setError(`No data found for Escrow ID: ${escrowId}`);
      }
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFilteredData = (): React.ReactElement | null => {
    if (!filteredData) return null;

    const { escrowId, milestones, totalAmount, currentBalance } = filteredData;

    return (
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          marginTop: "20px",
        }}>
        <h2 style={{ color: "#007BFF", marginBottom: "15px" }}>
          Escrow Details
        </h2>
        <p style={{ fontSize: "16px", marginBottom: "10px" }}>
          <strong>Escrow ID:</strong> {escrowId}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px" }}>
          <strong>Total Amount Set in Escrow:</strong> {totalAmount} USDC
        </p>
        <p style={{ fontSize: "16px", marginBottom: "15px" }}>
          <strong>Current Balance of USDC:</strong> {currentBalance} USDC
        </p>
        <h3 style={{ color: "#333", marginBottom: "10px" }}>Milestones</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {milestones.map((milestone, index) => (
            <li
              key={index}
              style={{
                padding: "10px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: "10px",
              }}>
              <strong>{milestone.description}:</strong> {milestone.status}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
        color: "#333",
      }}>
      <h1 style={{ textAlign: "center", color: "#007BFF" }}>
        Escrow Data Viewer
      </h1>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}>
        <input
          type="text"
          placeholder="Enter Escrow ID"
          value={escrowId}
          onChange={(e) => setEscrowId(e.target.value)}
          style={{
            padding: "10px",
            width: "70%",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />
        <button
          onClick={fetchData}
          disabled={loading || escrowId.trim() === ""}
          style={{
            padding: "10px 20px",
            backgroundColor: loading ? "#aaa" : "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}>
          {loading ? "Fetching..." : "Fetch Data"}
        </button>
      </div>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>
          {error}
        </p>
      )}

      {!loading && !error && renderFilteredData()}
    </div>
  );
};

export default App;
