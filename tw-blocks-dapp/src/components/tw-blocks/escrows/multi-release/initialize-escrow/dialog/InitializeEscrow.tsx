import * as React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "src/components/tw-blocks/form";
import { Input } from "src/components/tw-blocks/input";
import { Button } from "src/components/tw-blocks/button";
import { Card } from "src/components/tw-blocks/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "src/components/tw-blocks/select";
import { Textarea } from "src/components/tw-blocks/textarea";
import { useInitializeEscrow } from "./useInitializeEscrow";
import { Trash2, DollarSign, Percent, Loader2 } from "lucide-react";
import Link from "next/link";
import { trustlineOptions } from "@/components/tw-blocks/wallet-kit/trustlines";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/components/tw-blocks/dialog";
import { Separator } from "src/components/tw-blocks/separator";

export const InitializeEscrowDialog = () => {
  const {
    form,
    isSubmitting,
    milestones,
    isAnyMilestoneEmpty,
    handleSubmit,
    handleAddMilestone,
    handleRemoveMilestone,
    fillTemplateForm,
  } = useInitializeEscrow();

  const handleMilestoneAmountChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let rawValue = e.target.value;
    rawValue = rawValue.replace(/[^0-9.]/g, "");

    if (rawValue.split(".").length > 2) {
      rawValue = rawValue.slice(0, -1);
    }

    // Limit to 2 decimal places
    if (rawValue.includes(".")) {
      const parts = rawValue.split(".");
      if (parts[1] && parts[1].length > 2) {
        rawValue = parts[0] + "." + parts[1].slice(0, 2);
      }
    }

    // Always keep as string to allow partial input like "0." or "0.5"
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      amount: rawValue,
    };
    form.setValue("milestones", updatedMilestones);
  };

  const handlePlatformFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;
    rawValue = rawValue.replace(/[^0-9.]/g, "");

    if (rawValue.split(".").length > 2) {
      rawValue = rawValue.slice(0, -1);
    }

    // Limit to 2 decimal places
    if (rawValue.includes(".")) {
      const parts = rawValue.split(".");
      if (parts[1] && parts[1].length > 2) {
        rawValue = parts[0] + "." + parts[1].slice(0, 2);
      }
    }

    // Always keep as string to allow partial input like "0." or "0.5"
    form.setValue("platformFee", rawValue);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="cursor-pointer w-full">
          Initialize
        </Button>
      </DialogTrigger>
      <DialogContent className="!w-full sm:!max-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Initialize Escrow</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <Card className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4">
              <Link
                className="flex-1"
                href="https://docs.trustlesswork.com/trustless-work/technology-overview/escrow-types"
                target="_blank"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <h2 className="text-xl font-semibold">
                    Multi Release Escrow
                  </h2>
                </div>
                <p className="text-muted-foreground mt-1">
                  Fill out the form to initialize a multi release escrow
                </p>
              </Link>
              {process.env.NODE_ENV !== "production" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={fillTemplateForm}
                  className="cursor-pointer"
                >
                  Autofill
                </Button>
              )}
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Title<span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Escrow title"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="engagementId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Engagement<span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter identifier"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="trustline.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Trustline<span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(e) => {
                          field.onChange(e);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select trustline" />
                        </SelectTrigger>
                        <SelectContent>
                          {trustlineOptions
                            .filter((option) => option.value)
                            .map((option, index) => (
                              <SelectItem
                                key={`${option.value}-${index}`}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="platformFee"
                render={() => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Platform Fee
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Percent
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                          size={18}
                        />
                        <Input
                          placeholder="Enter platform fee"
                          className="pl-10"
                          value={form.watch("platformFee")?.toString() || ""}
                          onChange={handlePlatformFeeChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="roles.approver"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      <span className="flex items-center">
                        Approver<span className="text-destructive ml-1">*</span>
                      </span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter approver address"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roles.serviceProvider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      <span className="flex items-center">
                        Service Provider
                        <span className="text-destructive ml-1">*</span>
                      </span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter service provider address"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="roles.releaseSigner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      <span className="flex items-center">
                        Release Signer
                        <span className="text-destructive ml-1">*</span>
                      </span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter release signer address"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roles.disputeResolver"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      <span className="flex items-center">
                        Dispute Resolver
                        <span className="text-destructive ml-1">*</span>
                      </span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter dispute resolver address"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="roles.platformAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      <span className="flex items-center">
                        Platform
                        <span className="text-destructive ml-1">*</span>
                      </span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter platform address"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Description<span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escrow description"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel className="flex items-center">
                Milestones<span className="text-destructive ml-1">*</span>
              </FormLabel>
              {milestones.map((milestone, index) => (
                <div key={index} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-4">
                      <Input
                        placeholder="Enter receiver address"
                        value={milestone.receiver}
                        onChange={(e) => {
                          const updatedMilestones = [...milestones];
                          updatedMilestones[index].receiver = e.target.value;
                          form.setValue("milestones", updatedMilestones);
                        }}
                      />
                    </div>

                    <div className="md:col-span-4">
                      <Input
                        placeholder="Milestone description"
                        value={milestone.description}
                        onChange={(e) => {
                          const updatedMilestones = [...milestones];
                          updatedMilestones[index].description = e.target.value;
                          form.setValue("milestones", updatedMilestones);
                        }}
                      />
                    </div>

                    <div className="md:col-span-3 relative">
                      <DollarSign
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                      />
                      <Input
                        className="pl-10"
                        placeholder="Enter amount"
                        value={milestone.amount?.toString() || ""}
                        onChange={(e) => handleMilestoneAmountChange(index, e)}
                      />
                    </div>

                    <div className="md:col-span-1 flex justify-end">
                      <Button
                        onClick={() => handleRemoveMilestone(index)}
                        className="p-2 bg-transparent text-red-500 hover:text-red-600"
                        disabled={milestones.length === 1}
                        type="button"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Separator */}
                  {index < milestones.length - 1 && (
                    <Separator className="w-full" />
                  )}

                  {/* Add button */}
                  {index === milestones.length - 1 && (
                    <div className="flex justify-end mt-4">
                      <Button
                        disabled={isAnyMilestoneEmpty}
                        className="w-full md:w-fit md:min-w-40 cursor-pointer"
                        variant="outline"
                        onClick={handleAddMilestone}
                        type="button"
                      >
                        Add Item
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-start">
              <Button
                className="w-full md:w-1/4 cursor-pointer"
                type="submit"
                disabled={isAnyMilestoneEmpty || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="ml-2">Deploying...</span>
                  </div>
                ) : (
                  "Deploy"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
