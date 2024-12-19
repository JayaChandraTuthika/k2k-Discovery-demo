"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bar, BarChart, Line, LineChart } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useData } from "../hooks/useData";

export default function MarketAnalysis() {
  const { data, loading, error } = useData("market-analysis");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  const {
    "Competitor Activity": competitorActivity,
    "Market Trends": marketTrends,
    "Comparative Analysis": comparativeAnalysis,
    "Opportunities & Threats": opportunitiesThreats,
    "Dashboard Insights": dashboardInsights,
  } = data;
  competitorActivity.data = [
    {
      competitor_name: "Heptagon Capital",
      performance_metric: "15% growth in AUM",
      metric: 15,
      source: "Financial Times",
    },
    {
      competitor_name: "IlliquidX",
      performance_metric: "10% increase in deal volume",
      metric: 10,

      source: "Bloomberg",
    },
    {
      competitor_name: "THE BARROS GROUP",
      performance_metric: "20% expansion in client base",
      metric: 20,

      source: "Reuters",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-transparent text-white">
        <CardHeader>
          <CardTitle>Competitor Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {competitorActivity.data.length > 0 ? (
            <ChartContainer
              className="h-[300px]"
              config={competitorActivity.data.reduce((acc, item) => {
                acc[item.competitor_name] = {
                  label: item.competitor_name,
                  color: `#b05665`,
                };
                return acc;
              }, {})}
            >
              <BarChart data={competitorActivity.data}>
                <Bar dataKey="metric" fill="#b05665" />
                <ChartTooltip />
              </BarChart>
            </ChartContainer>
          ) : (
            <div>No competitor activity data available</div>
          )}
          <p className="mt-4 text-sm text-muted-foreground">
            {competitorActivity.insights}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Trends</CardTitle>
        </CardHeader>
        <CardContent>
          {marketTrends.data.length > 0 ? (
            <ChartContainer
              className="h-[300px]"
              config={marketTrends.data.reduce((acc, item) => {
                item.trending_keywords.forEach((keyword) => {
                  acc[keyword] = {
                    label: keyword,
                    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                  };
                });
                return acc;
              }, {})}
            >
              <LineChart data={marketTrends.data}>
                {marketTrends.data[0].trending_keywords.map(
                  (keyword, index) => (
                    <Line
                      key={index}
                      type="monotone"
                      dataKey={(item) =>
                        item.trending_keywords.includes(keyword) ? 1 : 0
                      }
                      name={keyword}
                    />
                  )
                )}
                <ChartTooltip />
              </LineChart>
            </ChartContainer>
          ) : (
            <div>No market trends data available</div>
          )}
          <p className="mt-4 text-sm text-muted-foreground">
            {marketTrends.insights}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comparative Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {comparativeAnalysis.data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>SC Lowy</TableHead>
                  {Object.keys(
                    comparativeAnalysis.data[0].Competitor_value
                  ).map((competitor, index) => (
                    <TableHead key={index}>{competitor}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparativeAnalysis.data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.metric_name}</TableCell>
                    <TableCell>{item.SC_Lowy_value}</TableCell>
                    {Object.values(item.Competitor_value).map(
                      (value, index) => (
                        <TableCell key={index}>{value}</TableCell>
                      )
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div>No comparative analysis data available</div>
          )}
          <p className="mt-4 text-sm text-muted-foreground">
            {comparativeAnalysis.insights}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Opportunities & Threats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Opportunities</h3>
              <ul className="list-disc list-inside">
                {opportunitiesThreats.opportunities.map(
                  (opportunity, index) => (
                    <li key={index}>{opportunity.insight_text}</li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Threats</h3>
              <ul className="list-disc list-inside">
                {opportunitiesThreats.threats.map((threat, index) => (
                  <li key={index}>{threat.insight_text}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {opportunitiesThreats.insights}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dashboard Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            {dashboardInsights.summaries.map((summary, index) => (
              <li key={index}>{summary.summary_text}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            {dashboardInsights.insights}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
