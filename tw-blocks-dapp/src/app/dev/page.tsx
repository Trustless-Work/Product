"use client";

import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";
import { EscrowListByRole } from "@/components/EscrowList";
import { MilestoneDetails } from "@/components/MilestoneDetails";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function DevPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Ensure role is serviceProvider on /dev for the MVP
  useEffect(() => {
    if (!pathname || !router) return;
    const qp = new URLSearchParams(searchParams?.toString());
    const currentRole = (qp.get("role") || "").toLowerCase();
    if (currentRole !== "serviceprovider") {
      qp.set("role", "serviceProvider");
      router.replace(`${pathname}?${qp.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, router]);

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">/dev — Escrows & Milestones</h1>
        <WalletButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <EscrowListByRole role="ServiceProvider" />
        <MilestoneDetails />
      </div>
    </div>
  );
}
