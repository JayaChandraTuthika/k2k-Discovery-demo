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
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useData } from "../hooks/useData";

const getIntroOfPage = (label) => {
  if (label === "Page A") {
    return "Page A is about men's clothing";
  }
  if (label === "Page B") {
    return "Page B is about women's dress";
  }
  if (label === "Page C") {
    return "Page C is about women's bag";
  }
  if (label === "Page D") {
    return "Page D is about household goods";
  }
  if (label === "Page E") {
    return "Page E is about food";
  }
  if (label === "Page F") {
    return "Page F is about baby food";
  }
  return "";
};

const CustomTooltip = ({ active, payload, label }) => {
  // console.log(payload, label);
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {/* <p>test</p> */}
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{payload[0].payload.performance_metric}</p>
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
};

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
  // console.log(marketTrends);

  return (
    <div className="space-y-6">
      <Card className="dashboard-card">
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
              {/* <BarChart data={competitorActivity.data}>
                <Bar dataKey="metric" fill="#b05665" />
                <ChartTooltip />
              </BarChart> */}
              <BarChart
                width={100}
                height={300}
                data={competitorActivity.data}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
                barSize={50}
              >
                <XAxis
                  dataKey="competitor_name"
                  scale="point"
                  padding={{ left: 50, right: 50 }}
                />
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
                  dataKey="metric"
                  fill="#03e2ff"

                  // background={{ fill: "transparent" }}
                />
                <Tooltip content={<CustomTooltip />} />
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

      <Card className="dashboard-card">
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
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                {marketTrends.data[0].trending_keywords.map(
                  (keyword, index) => (
                    <Line
                      key={index}
                      type="monotone"
                      strokeWidth={3}
                      dataKey={(item) =>
                        item.trending_keywords.includes(keyword) ? 1 : 0
                      }
                      activeDot={{ r: 8 }}
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

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Comparative Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {comparativeAnalysis.data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow
                  className="hover:bg-transparent"
                  className="hover:bg-transparent"
                >
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
                  <TableRow className="hover:bg-transparent" key={index}>
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

      <Card className="dashboard-card">
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

      <Card className="dashboard-card">
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
