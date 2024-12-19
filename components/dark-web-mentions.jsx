"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";
import { useData } from "../hooks/useData";

export default function DarkWebMentions() {
  const { data, loading, error } = useData("dark-web-mentions");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  const {
    "Compromised Data Reports": compromisedData,
    Alerts: alerts,
    "Heatmap/FrequencyChart": heatmapData,
    "Threat Actor Activity": threatActorActivity,
  } = data;

  heatmapData.data = [
    {
      date: "2024-12-01",
      mentions: 20,
      source: "Dark Web Monitoring Tool",
    },
    {
      date: "2024-12-02",
      mentions: 50,
      source: "Dark Web Monitoring Tool",
    },
    {
      date: "2024-12-03",
      mentions: 60,
      source: "Dark Web Monitoring Tool",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Compromised Data Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {compromisedData.data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Checked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {compromisedData.data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.lastChecked}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">
              {compromisedData.insights}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <Alert key={index} variant={alert.severity.toLowerCase()}>
                <AlertTitle>{alert.severity} Severity</AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-transparent text-white">
        <CardHeader>
          <CardTitle>Mention Frequency</CardTitle>
        </CardHeader>
        <CardContent>
          {heatmapData.data.length > 0 ? (
            <ChartContainer
              className="h-[300px]"
              config={{
                mentions: {
                  label: "Mentions",
                  color: "#f0a173",
                },
              }}
            >
              <BarChart data={heatmapData.data}>
                <Bar
                  dataKey="mentions"
                  fill="#c28ced"
                  className="bg-slate-500"
                />
                <ChartTooltip />
              </BarChart>
            </ChartContainer>
          ) : (
            <p className="text-sm text-muted-foreground text-white">
              {heatmapData.insights}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Threat Actor Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {threatActorActivity.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Actor Name</TableHead>
                  <TableHead>Activity Level</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {threatActorActivity.map((actor, index) => (
                  <TableRow key={index}>
                    <TableCell>{actor.actor_name}</TableCell>
                    <TableCell>{actor.activity_level}</TableCell>
                    <TableCell>{actor.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">
              No threat actor activity detected
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
