"use client";

import { Pie, PieChart, Line, LineChart, Cell, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import Chart from "chart.js/auto";

export default function RiskAssessment() {
  const { data, loading, error } = useData("risk-assessment");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  const {
    "Risk Overview": riskOverview,
    "Asset Inventory": assetInventory,
    "Compliance and Policy Gaps": complianceGaps,
    "Risk Trends": riskTrends,
    "Mitigation Plan": mitigationPlan,
  } = data;

  riskOverview.data = [
    {
      risk_level: "Critical",
      percentage: 5,
      source: "Internal Risk Assessment Report",
    },
    {
      risk_level: "High",
      percentage: 15,
      source: "Internal Risk Assessment Report",
    },
    {
      risk_level: "Medium",
      percentage: 30,
      source: "Internal Risk Assessment Report",
    },
    {
      risk_level: "Low",
      percentage: 50,
      source: "Internal Risk Assessment Report",
    },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  console.log(riskTrends.data);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>
              Risk Overview : Internal Risk Assessment Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            {riskOverview.data.length > 0 ? (
              <ChartContainer
                className="h-[300px]"
                config={riskOverview.data.reduce((acc, item) => {
                  acc[item.risk_level] = {
                    label: item.risk_level,
                    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                  };
                  return acc;
                }, {})}
              >
                <PieChart width={400} height={400}>
                  <Pie
                    data={riskOverview.data}
                    dataKey="percentage"
                    nameKey="risk_level"
                    cx="50%"
                    cy="50%"
                    fill="#8884d8"
                    labelLine={true}
                    label
                    outerRadius={120}
                  >
                    {riskOverview.data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ChartContainer>
            ) : (
              <div>No risk overview data available</div>
            )}
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Asset Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            {assetInventory.data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow
                    className="hover:bg-transparent"
                    className="hover:bg-transparent"
                  >
                    <TableHead>Asset</TableHead>
                    <TableHead>Risk Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assetInventory.data.map((asset, index) => (
                    <TableRow className="hover:bg-transparent" key={index}>
                      <TableCell>{asset.asset_name}</TableCell>
                      <TableCell
                        className={`text-${asset.risk_tag.toLowerCase()}`}
                      >
                        {asset.risk_tag}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div>No asset inventory data available</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Compliance and Policy Gaps</CardTitle>
        </CardHeader>
        <CardContent>
          {complianceGaps.data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow
                  className="hover:bg-transparent"
                  className="hover:bg-transparent"
                >
                  <TableHead>Policy</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complianceGaps.data.map((item, index) => (
                  <TableRow className="hover:bg-transparent" key={index}>
                    <TableCell>{item.policy_name}</TableCell>
                    <TableCell>{item.score}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div>No compliance data available</div>
          )}
        </CardContent>
      </Card>

      {/* <Card className="bg-transparent text-white">
        <CardHeader>
          <CardTitle>Risk Trends</CardTitle>
        </CardHeader>
        <CardContent>
          {riskTrends.data.length > 0 ? (
            <ChartContainer
              className="h-[300px]"
              config={{
                risk_level: {
                  label: "Risk Level",
                  color: "#6898f7",
                },
              }}
            >
              <LineChart data={riskTrends.data}>
                <Line type="monotone" dataKey="risk_level" stroke="#6898f7" />
                <ChartTooltip />
              </LineChart>
            </ChartContainer>
          ) : (
            <div>No risk trend data available</div>
          )}
        </CardContent>
      </Card> */}

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Mitigation Plan</CardTitle>
        </CardHeader>
        <CardContent>
          {mitigationPlan.steps.length > 0 ? (
            <ol className="list-decimal list-inside space-y-2">
              {mitigationPlan.steps.map((step, index) => (
                <li key={index}>
                  <strong>{step.action_item}:</strong> {step.details}
                </li>
              ))}
            </ol>
          ) : (
            <div>No mitigation plan available</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
