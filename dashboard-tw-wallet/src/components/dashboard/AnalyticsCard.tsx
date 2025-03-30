import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AnalyticsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <p className="text-sm text-muted-foreground">
          Detailed analytics and charts will be displayed here.
        </p>
      </CardHeader>
      <CardContent>
        <p>Analytics content coming soon...</p>
      </CardContent>
    </Card>
  );
}; 