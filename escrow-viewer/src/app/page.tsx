/* eslint-disable @typescript-eslint/no-explicit-any */
// app/page.tsx
"use client";

import { Inter } from "next/font/google";
import { NavbarSimple } from "@/components/Navbar";
import Image from "next/image";
import {
  getLedgerKeyContractCode,
  type EscrowMap,
} from "@/utils/ledgerkeycontract";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { NextPage } from "next";
import { JSX, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  const [contractId, setContractId] = useState<string>("");
  const [escrowData, setEscrowData] = useState<EscrowMap | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEscrowData = async () => {
    if (!contractId) {
      setError("Please enter a contract ID");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getLedgerKeyContractCode(contractId);
      setEscrowData(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch escrow data");
    } finally {
      setLoading(false);
    }
  };

  const renderValue = (val: EscrowMap[number]["val"]): JSX.Element | string => {
    if (val.bool !== undefined) {
      return val.bool ? "True" : "False";
    } else if (val.string) {
      return val.string;
    } else if (val.address) {
      return val.address;
    } else if (val.i128) {
      return `${val.i128.lo}`;
    } else if (val.vec) {
      return (
        <ul className="list-disc pl-4">
          {val.vec.map((item, index) => (
            <li key={index}>{renderMap(item)}</li>
          ))}
        </ul>
      );
    } else if (val.map) {
      return renderMap(val.map);
    }
    return JSON.stringify(val);
  };

  const renderMap = (map: EscrowMap): JSX.Element => {
    if (!Array.isArray(map)) {
      console.error("renderMap received non-array:", map);
      return (
        <div className="text-red-500">Error: Invalid escrow data format</div>
      );
    }
    return (
      <div className="space-y-2">
        {map.map(({ key, val }, index) => (
          <div key={index} className="flex space-x-2">
            <strong>{key.symbol}:</strong>
            <span>{renderValue(val)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <NavbarSimple />
      <div
        className={`relative z-10 flex flex-col lg:flex-row items-center justify-around py-20 gap-2 ${inter.className}`}
      >
        <section className="flex justify-center items-center order-1 lg:order-1">
          <div className="relative w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[450px]">
            <Image
              src="/escrow-background.png"
              alt="Blockchain Network"
              width={450}
              height={450}
              className="relative rounded-lg w-full h-auto"
            />
          </div>
        </section>
        <section className="text-center lg:text-left space-y-8 order-2 lg:order-1">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Escrow Data Viewer
          </h1>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter your escrow ID"
              value={contractId}
              onChange={(e) => setContractId(e.target.value)}
            />
            <Button onClick={fetchEscrowData} disabled={loading}>
              {loading ? "Fetching..." : "Fetch"}
            </Button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {escrowData && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold">Escrow Details</h2>
              {renderMap(escrowData)}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;
