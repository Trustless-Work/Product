"use client";

import { useEscrowContext } from "@/components/tw-blocks/providers/EscrowProvider";
import { Milestones } from "@/components/tw-blocks/escrows/escrows-by-role/details/Milestones";
import { ChangeMilestoneStatusDialog } from "@/components/tw-blocks/escrows/single-multi-release/change-milestone-status/dialog/ChangeMilestoneStatus";
import { ApproveMilestoneDialog } from "@/components/tw-blocks/escrows/single-multi-release/approve-milestone/dialog/ApproveMilestone";

export function MilestoneDetails() {
  const { selectedEscrow, userRolesInEscrow } = useEscrowContext();

  if (!selectedEscrow) {
    return (
      <div className="rounded border p-4 text-sm text-muted-foreground">
        Select an escrow to view milestones.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="font-medium">Milestones</div>
      <Milestones
        selectedEscrow={selectedEscrow}
        userRolesInEscrow={userRolesInEscrow}
        evidenceVisibleMap={{}}
        setEvidenceVisibleMap={() => {}}
      />
      <div className="flex flex-wrap gap-2">
        <ChangeMilestoneStatusDialog showSelectMilestone />
        <ApproveMilestoneDialog />
      </div>
    </div>
  );
}


