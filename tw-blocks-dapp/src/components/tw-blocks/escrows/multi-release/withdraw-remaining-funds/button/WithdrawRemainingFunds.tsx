import * as React from "react";
import { Button } from "src/components/tw-blocks/button";
import { useEscrowsMutations } from "@/components/tw-blocks/tanstack/useEscrowsMutations";
import { useWalletContext } from "@/components/tw-blocks/wallet-kit/WalletProvider";
import { WithdrawRemainingFundsPayload } from "@trustless-work/escrow/types";
import { toast } from "sonner";
import {
  ErrorResponse,
  handleError,
} from "@/components/tw-blocks/handle-errors/handle";
import { useEscrowContext } from "@/components/tw-blocks/providers/EscrowProvider";
import { Loader2 } from "lucide-react";

type Distribution = { address: string; amount: number };

type WithdrawRemainingFundsButtonProps = {
  distributions: Distribution[];
};

export const WithdrawRemainingFundsButton = ({
  distributions,
}: WithdrawRemainingFundsButtonProps) => {
  const { withdrawRemainingFunds } = useEscrowsMutations();
  const { selectedEscrow, updateEscrow } = useEscrowContext();
  const { walletAddress } = useWalletContext();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleClick() {
    try {
      const hasInvalid = distributions.some(
        (d) => !d.address || Number.isNaN(d.amount) || d.amount < 0
      );
      if (hasInvalid) {
        toast.error("Invalid distributions");
        return;
      }

      setIsSubmitting(true);

      const payload: WithdrawRemainingFundsPayload = {
        contractId: selectedEscrow?.contractId || "",
        disputeResolver: walletAddress || "",
        distributions: distributions as [{ address: string; amount: number }],
      };

      await withdrawRemainingFunds.mutateAsync({
        payload,
        address: walletAddress || "",
      });

      toast.success("Withdraw successful");
      const sumDistributed = distributions.reduce(
        (acc, d) => acc + Number(d.amount || 0),
        0
      );
      updateEscrow({
        ...selectedEscrow,
        balance: (selectedEscrow?.balance || 0) - sumDistributed || 0,
      });
    } catch (error) {
      toast.error(handleError(error as ErrorResponse).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Button
      type="button"
      disabled={isSubmitting}
      onClick={handleClick}
      className="cursor-pointer w-full"
    >
      {isSubmitting ? (
        <div className="flex items-center">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="ml-2">Withdrawing...</span>
        </div>
      ) : (
        "Withdraw Remaining"
      )}
    </Button>
  );
};
