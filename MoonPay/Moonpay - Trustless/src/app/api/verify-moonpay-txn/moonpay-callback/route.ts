import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fundEscrow } from "@/services/escrow/fundEscrow";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verify the payment was successful
    if (body.status === "completed") {
      // Fund the escrow
      const result = await fundEscrow({
        contractId: body.contractId,
        engagementId: body.engagementId,
        signer: body.walletAddress,
      });

      return NextResponse.json({ 
        status: "success",
        data: result 
      });
    }

    return NextResponse.json({ 
      status: "error",
      message: "Payment not completed" 
    }, { status: 400 });

  } catch (error) {
    console.error("MoonPay callback error:", error);
    return NextResponse.json({ 
      status: "error",
      message: "Internal server error" 
    }, { status: 500 });
  }
}