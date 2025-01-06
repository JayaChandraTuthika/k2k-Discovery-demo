"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useData } from "../hooks/useData";

export default function BrandMonitoring() {
  const { data, loading, error } = useData("brand-monitoring");

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.message}
          <br />
          Please try refreshing the page or contact support if the problem persists.
        </AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return (
      <Alert>
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>No brand monitoring data is available at this time.</AlertDescription>
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

  // console.log(data);

  return (
    <div className="space-y-6">
      <Card className="dashboard-card">
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
                  color: "grey",
                },
                negative: {
                  label: "Negative",
                  color: "#f54248",
                },
              }}
            >
              {/* <LineChart data={sentimentAnalysis.data}>
                <Line type="monotone" dataKey="positive" stroke="#42f569" />
                <Line type="monotone" dataKey="neutral" stroke="grey" />
                <Line type="monotone" dataKey="negative" stroke="#f54248" />
                <ChartTooltip />
              </LineChart> */}
              <LineChart
                width={500}
                height={300}
                data={sentimentAnalysis.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                {/* <Line type="monotone" dataKey="positive" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="neutral" stroke="#82ca9d" /> */}
                <Line type="monotone" dataKey="positive" stroke="#42f569" strokeWidth={4} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="neutral" stroke="grey" strokeWidth={4} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="negative" stroke="#f54248" strokeWidth={4} activeDot={{ r: 8 }} />
              </LineChart>
            </ChartContainer>
            <p className="text-sm text-muted-foreground">{sentimentAnalysis.insights}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card">
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
              {/* <BarChart data={platformInsights.data}>
                <Bar dataKey="mentions" fill="#0e849c" />
                <ChartTooltip />
              </BarChart> */}
              <BarChart
                width={100}
                height={300}
                data={platformInsights.data}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
                barSize={50}
              >
                <XAxis dataKey="platform" scale="point" padding={{ left: 50, right: 50 }} />
                <YAxis />
                {/* <Tooltip /> */}
                {/* <Legend /> */}
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                {/* <Bar
                  dataKey="mentions"
                  fill="transparent"
                  // background={{ fill: "transparent" }}
                /> */}
                <Bar
                  dataKey="mentions"
                  fill="#03e2ff"

                  // background={{ fill: "transparent" }}
                />
                <Tooltip />
              </BarChart>
            </ChartContainer>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-white">Mention</TableHead>
                  <TableHead className="text-white">Platform</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {platformInsights.tables.map((item, index) => (
                  <TableRow className="hover:bg-transparent" key={index}>
                    <TableCell>{item.mention}</TableCell>
                    <TableCell>{item.platform}</TableCell>
                    <TableCell>{item.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-sm text-muted-foreground text-white">{platformInsights.insights}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Alerts and Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertsAndRecommendations.alerts.map((alert, index) => (
              <Alert
                key={index}
                variant={alert.severity.toLowerCase()}
                className={`text-slate-950 ${alert.severity == "High" ? "bg-red-400" : ""} ${alert.severity == "Medium" ? "bg-yellow-400" : ""}`}
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

      <Card className="dashboard-card">
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
              {/* <BarChart data={competitorComparison.data}>
                <Bar dataKey="sentiment_score" fill="#c28ced" />
                <ChartTooltip />
              </BarChart> */}
              <BarChart
                width={100}
                height={300}
                data={competitorComparison.data}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
                barSize={50}
              >
                <XAxis dataKey="competitor_name" scale="point" padding={{ left: 50, right: 50 }} />
                <YAxis />
                {/* <Tooltip /> */}
                {/* <Legend /> */}
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                {/* <Bar
                  dataKey="mentions"
                  fill="transparent"
                  // background={{ fill: "transparent" }}
                /> */}
                <Bar
                  dataKey="sentiment_score"
                  fill="#03e2ff"

                  // background={{ fill: "transparent" }}
                />
                <Tooltip />
              </BarChart>
            </ChartContainer>
            <p className="text-sm text-muted-foreground text-white">{competitorComparison.insights}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Trend Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ChartContainer
              className="h-[300px]"
              config={trendAnalysis.data_points_over_time.reduce((acc, item) => {
                item.keywords.forEach((keyword) => {
                  acc[keyword] = {
                    label: keyword,
                    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                  };
                });
                return acc;
              }, {})}
            >
              <LineChart data={trendAnalysis.data_points_over_time}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                {trendAnalysis.data_points_over_time[0].keywords.map((keyword, index) => (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={(item) => (item.keywords.includes(keyword) ? 1 : 0)}
                    name={keyword}
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                ))}
                <ChartTooltip />
              </LineChart>
            </ChartContainer>
            <p className="text-sm text-muted-foreground">{trendAnalysis.insights}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
