"use client";

import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

//start
import { Shield, CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function DarkwebMentionsTab() {
  const recommendations = [
    "Regularly update and patch all software and systems.",
    "Implement strong, unique passwords for all accounts and use a password manager.",
    "Enable two-factor authentication (2FA) wherever possible.",
    "Educate employees about phishing attacks and social engineering tactics.",
    "Encrypt sensitive data both at rest and in transit.",
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="bg-green-50 dark:bg-green-900">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2 text-green-700 dark:text-green-300">
            <Shield className="h-6 w-6" />
            You're Safe on the Dark Web
          </CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            We didn't find any mentions of your company on the dark web.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 dark:text-green-300 font-medium">
            While this is good news, it's important to stay vigilant and
            continue strengthening your security.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Security Recommendations</CardTitle>
          <CardDescription>
            Consider implementing these measures to further enhance your
            security posture:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Alert>
        <AlertTitle className="text-lg font-semibold">
          Stay Proactive
        </AlertTitle>
        <AlertDescription>
          While your company wasn't found on the dark web, it's crucial to
          maintain strong security practices. Regularly monitor your digital
          footprint and keep your security measures up to date.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default function DarkWebMentions() {
  const { data, loading, error } = useData("dark-web-mentions");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  const recommendations = [
    "Regularly update and patch all software and systems.",
    "Implement strong, unique passwords for all accounts and use a password manager.",
    "Enable two-factor authentication (2FA) wherever possible.",
    "Educate employees about phishing attacks and social engineering tactics.",
    "Encrypt sensitive data both at rest and in transit.",
  ];

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
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Compromised Data Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {compromisedData.data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow
                  className="hover:bg-transparent"
                  className="hover:bg-transparent"
                >
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Checked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {compromisedData.data.map((item, index) => (
                  <TableRow className="hover:bg-transparent" key={index}>
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

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <Alert
                key={index}
                variant={alert.severity.toLowerCase()}
                className="bg-green-300 text-slate-950"
              >
                <AlertTitle>{alert.severity} Severity</AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* <Card className="bg-transparent text-white">
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
      </Card> */}

      {/* <Card>
        <CardHeader>
          <CardTitle>Threat Actor Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {threatActorActivity.length > 0 ? (
            <Table>
              <TableHeader>
                  <TableRow className="hover:bg-transparent"  className="hover:bg-transparent">
                  <TableHead>Actor Name</TableHead>
                  <TableHead>Activity Level</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {threatActorActivity.map((actor, index) => (
                   <TableRow className="hover:bg-transparent"  key={index}>
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
      </Card> */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2 text-green-700 dark:text-green-300">
            <Shield className="h-6 w-6" />
            You're Safe on the Dark Web
          </CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            We didn't find any mentions of your company on the dark web.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 dark:text-green-300 font-medium">
            While this is good news, it's important to stay vigilant and
            continue strengthening your security.
          </p>
        </CardContent>
      </Card>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-xl">Security Recommendations</CardTitle>
          <CardDescription>
            Consider implementing these measures to further enhance your
            security posture:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Alert className="dashboard-card">
        <AlertTitle className="text-lg font-semibold">
          Stay Proactive
        </AlertTitle>
        <AlertDescription>
          While your company wasn't found on the dark web, it's crucial to
          maintain strong security practices. Regularly monitor your digital
          footprint and keep your security measures up to date.
        </AlertDescription>
      </Alert>
    </div>
  );
}
