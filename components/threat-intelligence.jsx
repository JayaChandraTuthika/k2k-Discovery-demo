"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useData } from "../hooks/useData";

export default function ThreatIntelligence() {
  const { data, loading, error } = useData("threat-intelligence");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  const {
    "Threat Alerts": threatAlerts,
    "Threat Actor Profiles": threatActorProfiles,
    "Vulnerability Analysis": vulnerabilityAnalysis,
    "Defense Recommendations": defenseRecommendations,
    "Live Threat Map": liveThreatMap,
  } = data;

  return (
    <div className="space-y-4">
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Threat Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          {threatAlerts.data.length > 0 ? (
            <div className="space-y-4">
              {threatAlerts.data.map((alert, index) => (
                <Alert key={index} variant={alert.severity.toLowerCase()}>
                  <AlertTitle>
                    {alert.severity} Severity - {new Date(alert.timestamp).toLocaleString()}
                  </AlertTitle>
                  <AlertDescription>{alert.description}</AlertDescription>
                </Alert>
              ))}
            </div>
          ) : (
            <div>No threat alerts available</div>
          )}
        </CardContent>
      </Card>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Threat Actor Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          {threatActorProfiles.profiles.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Actor Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>MITRE ATT&CK</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {threatActorProfiles.profiles.map((profile, index) => (
                  <TableRow className="hover:bg-transparent" key={index}>
                    <TableCell>{profile.actor_name}</TableCell>
                    <TableCell>{profile.description}</TableCell>
                    <TableCell>
                      <a href={profile.mitre_attack_mapping.url} target="_blank" rel="noopener noreferrer">
                        {profile.mitre_attack_mapping.group_name}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div>No threat actor profiles available</div>
          )}
        </CardContent>
      </Card>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Vulnerability Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {vulnerabilityAnalysis.data.length > 0 ? (
            <ChartContainer
              className="h-[300px] w-[300px]"
              config={{
                count: {
                  label: "Count",
                  color: "hsl(var(--primary))",
                },
              }}
            >
              {/* <BarChart
                data={vulnerabilityAnalysis.data.reduce((acc, curr) => {
                  const existingItem = acc.find(
                    (item) => item.severity_level === curr.severity_level
                  );
                  if (existingItem) {
                    existingItem.count++;
                  } else {
                    acc.push({ severity_level: curr.severity_level, count: 1 });
                  }
                  return acc;
                }, [])}
              >
                <Bar dataKey="count" fill="#8b93a3" />
                <ChartTooltip />
              </BarChart> */}
              <BarChart
                width={100}
                height={300}
                data={vulnerabilityAnalysis.data.reduce((acc, curr) => {
                  const existingItem = acc.find((item) => item.severity_level === curr.severity_level);
                  if (existingItem) {
                    existingItem.count++;
                  } else {
                    acc.push({ severity_level: curr.severity_level, count: 1 });
                  }
                  return acc;
                }, [])}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
                barSize={50}
              >
                <XAxis dataKey="severity_level" scale="point" padding={{ left: 50, right: 50 }} />
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
                  dataKey="count"
                  fill="#03e2ff"
                  // background={{ fill: "transparent" }}
                />
                <Tooltip />
              </BarChart>
            </ChartContainer>
          ) : (
            <div>No vulnerability data available</div>
          )}
        </CardContent>
      </Card>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Defense Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          {defenseRecommendations.recommendations.length > 0 ? (
            <ul className="list-disc list-inside space-y-2">
              {/* {defenseRecommendations.recommendations.map((rec, index) => (
                // <li key={index}>{rec.recommendation_text}</li>
              ))} */}
              <li key="1">Implement network segmentation to limit lateral movement of potential intruders.</li>
              <li key="2">Regularly update software and systems to patch known vulnerabilities.</li>
            </ul>
          ) : (
            <div>No defense recommendations available</div>
          )}
        </CardContent>
      </Card>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Live Threat Map</CardTitle>
        </CardHeader>
        <CardContent>
          {liveThreatMap.data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent" className="hover:bg-transparent">
                  <TableHead>Origin</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {liveThreatMap.data.map((threat, index) => (
                  <TableRow className="hover:bg-transparent" key={index}>
                    <TableCell>{threat.origin_country}</TableCell>
                    <TableCell>{threat.target_country}</TableCell>
                    <TableCell>{threat.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div>No live threat data available</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
