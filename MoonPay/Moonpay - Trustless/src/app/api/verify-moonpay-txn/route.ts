import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const transactionId = searchParams.get("transactionId");

  if (!transactionId) {
    return NextResponse.json(
      { error: "Transaction ID is required" },
      { status: 400 },
    );
  }

  try {
    // Verify the transaction with MoonPay's API
    const response = await fetch(
      `https://api.moonpay.com/v1/transactions/${transactionId}`,
      {
        headers: {
          Authorization: `Api-Key ${process.env.MOONPAY_SECRET_KEY}`,
        },
      },
    );

    const transaction = await response.json();

    return NextResponse.json(transaction);
  } catch (error) {
    console.error("Transaction verification failed:", error);
    return NextResponse.json(
      { error: "Failed to verify transaction" },
      { status: 500 },
    );
  }
}
