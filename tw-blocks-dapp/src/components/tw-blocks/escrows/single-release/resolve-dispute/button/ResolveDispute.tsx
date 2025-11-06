import * as React from "react";
import { Button } from "src/components/tw-blocks/button";
import { useEscrowsMutations } from "@/components/tw-blocks/tanstack/useEscrowsMutations";
import { useWalletContext } from "@/components/tw-blocks/wallet-kit/WalletProvider";
import { SingleReleaseResolveDisputePayload } from "@trustless-work/escrow/types";
import { toast } from "sonner";
import {
  ErrorResponse,
  handleError,
} from "@/components/tw-blocks/handle-errors/handle";
import { useEscrowContext } from "@/components/tw-blocks/providers/EscrowProvider";
import { Loader2 } from "lucide-react";

type Distribution = { address: string; amount: number };

type ResolveDisputeButtonProps = {
  distributions: Distribution[];
};

export const ResolveDisputeButton = ({
  distributions,
}: ResolveDisputeButtonProps) => {
  const { resolveDispute } = useEscrowsMutations();
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

      const payload: SingleReleaseResolveDisputePayload = {
        contractId: selectedEscrow?.contractId || "",
        disputeResolver: walletAddress || "",
        distributions: distributions as [Distribution],
      };

      await resolveDispute.mutateAsync({
        payload,
        type: "single-release",
        address: walletAddress || "",
      });

      toast.success("Dispute resolved successfully");
      const sumDistributed = distributions.reduce(
        (acc, d) => acc + Number(d.amount || 0),
        0
      );
      updateEscrow({
        ...selectedEscrow,
        flags: {
          ...selectedEscrow?.flags,
          disputed: false,
          resolved: true,
        },
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
          <span className="ml-2">Resolving...</span>
        </div>
      ) : (
        "Resolve Dispute"
      )}
    </Button>
  );
};
