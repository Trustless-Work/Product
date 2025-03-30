import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TimeFrameSelectorProps {
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
}

export function TimeFrameSelector({ timeFilter, onTimeFilterChange }: TimeFrameSelectorProps) {
  return (
    <Tabs value={timeFilter} onValueChange={onTimeFilterChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="24h">24 Hours</TabsTrigger>
        <TabsTrigger value="7d">7 Days</TabsTrigger>
        <TabsTrigger value="30d">30 Days</TabsTrigger>
      </TabsList>
    </Tabs>
  );
} 