// "use client";

// import { useEffect } from "react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog";

// interface MoonPayWidgetProps {
//   isOpen: boolean;
//   onClose: () => void;
//   contractId: string;
//   amount: number;
// }

// export function MoonPayWidget({
//   isOpen,
//   onClose,
//   contractId,
//   amount,
// }: MoonPayWidgetProps) {
//   useEffect(() => {
//     if (isOpen) {
//       const script = document.createElement("script");
//       script.src =
//         "https://static.moonpay.com/web-sdk/v1/moonpay-web-sdk.min.js";
//       script.async = true;

//       script.onload = () => {
//         const moonpaySdk = (window as any).MoonPayWebSdk.init({
//           flow: "buy",
//           environment: "sandbox",
//           variant: "overlay",
//           params: {
//             apiKey: process.env.NEXT_PUBLIC_MOONPAY_API_KEY,
//             baseCurrencyCode: "eth",
//             baseCurrencyAmount: amount.toString(),
//             walletAddress: contractId,
//             quoteCurrencyCode: "usd",
//             lockAmount: "true",
//             lockWalletAddress: "true",
//           },
//           onClose: () => {
//             onClose();
//           },
//         });
//         moonpaySdk.show();
//       };
//       document.body.appendChild(script);
//       return () => {
//         document.body.removeChild(script);
//       };
//     }
//   }, [isOpen, contractId, amount]);

//   return null;
// }
