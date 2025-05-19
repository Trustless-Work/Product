---
description: Tabs UI Components.
icon: right-long-to-line
---

# Tabs

## Main Tabs

The main tabs components which contains the three sections.

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTabsContext } from "@/providers/tabs.provider";
import { DeployEndpoints } from "../endpoints/DeployEndpoints";
import { EscrowEndpoints } from "../endpoints/EscrowEndpoints";
import { HelperEndpoints } from "../endpoints/HelperEndpoints";

export const MainTabs = () => {
  const { activeTab, setActiveTab } = useTabsContext();

  return (
    <Tabs
      key={activeTab}
      value={activeTab}
      onValueChange={(val) =>
        setActiveTab(val as "deploy" | "escrow" | "helper")
      }
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="deploy">Deploy</TabsTrigger>
        <TabsTrigger value="escrow">Escrows</TabsTrigger>
        <TabsTrigger value="helper">Helpers</TabsTrigger>
      </TabsList>
      <div className="p-6">
        <TabsContent value="deploy" className="mt-0">
          <DeployEndpoints />
        </TabsContent>
        <TabsContent value="escrow" className="mt-0">
          <EscrowEndpoints />
        </TabsContent>
        <TabsContent value="helper" className="mt-0">
          <HelperEndpoints />
        </TabsContent>
      </div>
    </Tabs>
  );
};

```

## Deploy Endpoints

Initialize escrow endpoint.

```typescript
"use client";

import { Button } from "@/components/ui/button";
import { InitializeEscrowForm } from "../forms/InitializeEscrowForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInitializeEscrow } from "../../hooks/initialize-escrow-form.hook";

export function DeployEndpoints() {
  const {
    form,
    loading,
    response,
    trustlinesOptions,
    currentStep,
    addMilestone,
    removeMilestone,
    loadTemplate,
    onSubmit,
    nextStep,
    prevStep,
  } = useInitializeEscrow();

  const handleLoadTemplate = () => {
    loadTemplate();
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3 flex justify-between gap-4">
        <div className="flex gap-2 flex-col">
          <CardTitle className="text-xl">Deploy Endpoints</CardTitle>
          <CardDescription>
            Deploy and initialize escrow contracts on the Stellar blockchain
          </CardDescription>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleLoadTemplate}
          className="mb-4"
        >
          Use Template
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <InitializeEscrowForm
          form={form}
          onSubmit={onSubmit}
          addMilestone={addMilestone}
          removeMilestone={removeMilestone}
          loading={loading}
          response={response}
          trustlinesOptions={trustlinesOptions.map((option) => ({
            value: option.value,
            label: option.label || option.value,
          }))}
          currentStep={currentStep}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      </CardContent>
    </Card>
  );
}

```

## Escrow Endpoints

All the escrow endpoints divided by tabs.

```typescript
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StartDisputeForm } from "../forms/StartDisputeForm";
import { GetEscrowForm } from "../forms/GetEscrowForm";
import { FundEscrowForm } from "../forms/FundEscrowForm";
import { ChangeMilestoneStatusForm } from "../forms/ChangeMilestoneStatusForm";
import { ChangeMilestoneFlagForm } from "../forms/ChangeMilestoneFlagForm";
import { ReleaseFundsForm } from "../forms/ReleaseFundsForm";
import { ResolveDisputeForm } from "../forms/ResolveDisputeForm";
import { UpdateEscrowForm } from "../forms/UpdateEscrowForm";
import { EscrowCreatedSection } from "../sections/EscrowCreatedSection";
import { useEscrowContext } from "@/providers/escrow.provider";
import { useTabsContext } from "@/providers/tabs.provider";
import { Button } from "@/components/ui/button";

export function EscrowEndpoints() {
  const [activeTabEscrow, setActiveTabEscrow] = useState("get-escrow");
  const { resetEscrow } = useEscrowContext();
  const { setActiveTab } = useTabsContext();
  const { escrow } = useEscrowContext();

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3 flex justify-between gap-4">
        <div className="flex gap-2 flex-col">
          <CardTitle className="text-xl">Escrow Endpoints</CardTitle>
          <CardDescription>
            Manage escrow contracts, milestones, and funds
          </CardDescription>
        </div>

        {escrow && (
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              resetEscrow();
              setActiveTab("deploy");
            }}
            className="mb-4"
          >
            Reset Escrow
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <Tabs
          value={activeTabEscrow}
          onValueChange={setActiveTabEscrow}
          className="w-full"
        >
          <TabsList className="w-full flex flex-wrap mb-32 md:mb-4 gap-1">
            <TabsTrigger value="get-escrow" className="flex-1">
              Get Escrow
            </TabsTrigger>
            <TabsTrigger value="fund-escrow" className="flex-1">
              Fund Escrow
            </TabsTrigger>
            <TabsTrigger value="change-milestone-status" className="flex-1">
              Change Status
            </TabsTrigger>
            <TabsTrigger value="change-milestone-flag" className="flex-1">
              Approve Milestone
            </TabsTrigger>
            <TabsTrigger value="change-dispute-flag" className="flex-1">
              Start Dispute
            </TabsTrigger>
            <TabsTrigger value="resolve-dispute" className="flex-1">
              Resolve Dispute
            </TabsTrigger>
            <TabsTrigger value="release-funds" className="flex-1">
              Release Funds
            </TabsTrigger>
            <TabsTrigger value="update-escrow" className="flex-1">
              Update Escrow
            </TabsTrigger>
          </TabsList>
          <div className="flex flex-col md:flex-row gap-10 w-full">
            <div className="w-full md:w-3/4">
              <div className="mt-2 pt-4 border-t">
                <TabsContent value="get-escrow" className="mt-0">
                  <GetEscrowForm />
                </TabsContent>
                <TabsContent value="fund-escrow" className="mt-0">
                  <FundEscrowForm />
                </TabsContent>
                <TabsContent value="change-milestone-status" className="mt-0">
                  <ChangeMilestoneStatusForm />
                </TabsContent>
                <TabsContent value="change-milestone-flag" className="mt-0">
                  <ChangeMilestoneFlagForm />
                </TabsContent>
                <TabsContent value="change-dispute-flag" className="mt-0">
                  <StartDisputeForm />
                </TabsContent>
                <TabsContent value="resolve-dispute" className="mt-0">
                  <ResolveDisputeForm />
                </TabsContent>
                <TabsContent value="release-funds" className="mt-0">
                  <ReleaseFundsForm />
                </TabsContent>
                <TabsContent value="update-escrow" className="mt-0">
                  <UpdateEscrowForm />
                </TabsContent>
              </div>
            </div>

            <EscrowCreatedSection />
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}

```

## Helper Endpoints

Get balances endpoint.

```typescript
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetMultipleEscrowBalanceForm } from "../forms/GetMultipleEscrowBalanceForm";

export function HelperEndpoints() {
  const [activeTab, setActiveTab] = useState("get-multiple-escrow-balance");

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Helper Endpoints</CardTitle>
        <CardDescription>
          Utility endpoints for blockchain interactions
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="get-multiple-escrow-balance" className="flex-1">
              Get Balances
            </TabsTrigger>
          </TabsList>
          <div className="mt-2 pt-4 border-t">
            <TabsContent
              value="get-multiple-escrow-balance"
              className="flex justify-center mt-0"
            >
              <GetMultipleEscrowBalanceForm />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}

```
