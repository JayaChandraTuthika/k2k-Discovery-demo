"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, Line, LineChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useData } from "../hooks/useData";

export default function BrandMonitoring() {
  const { data, loading, error } = useData("brand-monitoring");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.message}
          <br />
          Please try refreshing the page or contact support if the problem
          persists.
        </AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return (
      <Alert>
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>
          No brand monitoring data is available at this time.
        </AlertDescription>
      </Alert>
    );
  }

  const {
    "Sentiment Analysis": sentimentAnalysis,
    "Platform-Specific Insights": platformInsights,
    "Alerts and Recommendations": alertsAndRecommendations,
    "Competitor Comparison": competitorComparison,
    "Trend Analysis": trendAnalysis,
  } = data;

  return (
    <div className="space-y-6">
      <Card className="">
        <CardHeader>
          <CardTitle>Sentiment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ChartContainer
              className="h-[300px] w-full"
              config={{
                positive: {
                  label: "Positive",
                  color: "#42f569",
                },
                neutral: {
                  label: "Neutral",
                  color: "#000000",
                },
                negative: {
                  label: "Negative",
                  color: "#f54248",
                },
              }}
            >
              <LineChart data={sentimentAnalysis.data}>
                <Line type="monotone" dataKey="positive" stroke="#42f569" />
                <Line type="monotone" dataKey="neutral" stroke="#000000" />
                <Line type="monotone" dataKey="negative" stroke="#f54248" />
                <ChartTooltip />
              </LineChart>
            </ChartContainer>
            <p className="text-sm text-muted-foreground">
              {sentimentAnalysis.insights}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-transparent text-white">
        <CardHeader>
          <CardTitle>Platform-Specific Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ChartContainer
              className="h-[300px]"
              config={{
                mentions: {
                  label: "Mentions",
                  color: "#0e849c",
                },
              }}
            >
              <BarChart data={platformInsights.data}>
                <Bar dataKey="mentions" fill="#0e849c" />
                <ChartTooltip />
              </BarChart>
            </ChartContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Mention</TableHead>
                  <TableHead className="text-white">Platform</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {platformInsights.tables.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.mention}</TableCell>
                    <TableCell>{item.platform}</TableCell>
                    <TableCell>{item.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-sm text-muted-foreground text-white">
              {platformInsights.insights}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alerts and Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertsAndRecommendations.alerts.map((alert, index) => (
              <Alert
                key={index}
                variant={alert.severity.toLowerCase()}
                className={`text-slate-950 ${
                  alert.severity == "High" ? "bg-red-400" : ""
                } ${alert.severity == "Medium" ? "bg-yellow-400" : ""}`}
              >
                <AlertTitle>{alert.severity} Severity Alert</AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            ))}
            <ul className="list-disc pl-5 space-y-2">
              {alertsAndRecommendations.recommendations.map((rec, index) => (
                <li key={index}>
                  <strong>{rec.action}:</strong> {rec.details}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-transparent text-white">
        <CardHeader>
          <CardTitle>Competitor Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ChartContainer
              className="h-[300px]"
              config={competitorComparison.data.reduce((acc, item) => {
                acc[item.competitor_name] = {
                  label: item.competitor_name,
                  color: `#c28ced`,
                };
                return acc;
              }, {})}
            >
              <BarChart data={competitorComparison.data}>
                <Bar dataKey="sentiment_score" fill="#c28ced" />
                <ChartTooltip />
              </BarChart>
            </ChartContainer>
            <p className="text-sm text-muted-foreground text-white">
              {competitorComparison.insights}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trend Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ChartContainer
              className="h-[300px]"
              config={trendAnalysis.data_points_over_time.reduce(
                (acc, item) => {
                  item.keywords.forEach((keyword) => {
                    acc[keyword] = {
                      label: keyword,
                      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                    };
                  });
                  return acc;
                },
                {}
              )}
            >
              <LineChart data={trendAnalysis.data_points_over_time}>
                {trendAnalysis.data_points_over_time[0].keywords.map(
                  (keyword, index) => (
                    <Line
                      key={index}
                      type="monotone"
                      dataKey={(item) =>
                        item.keywords.includes(keyword) ? 1 : 0
                      }
                      name={keyword}
                    />
                  )
                )}
                <ChartTooltip />
              </LineChart>
            </ChartContainer>
            <p className="text-sm text-muted-foreground">
              {trendAnalysis.insights}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
