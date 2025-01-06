"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandMonitoring from "@/components/brand-monitoring";
import DarkWebMentions from "@/components/dark-web-mentions";
import RiskAssessment from "@/components/risk-assessment";
import ThreatIntelligence from "@/components/threat-intelligence";
import MarketAnalysis from "@/components/market-analysis";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  console.log("session", session);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="brand-monitoring" className="space-y-4">
          <TabsList className="bg-transparent w-full">
            <TabsTrigger value="brand-monitoring">Brand Monitoring</TabsTrigger>
            <TabsTrigger value="dark-web">Dark Web Mentions</TabsTrigger>
            <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
            <TabsTrigger value="threat-intelligence">Threat Intelligence</TabsTrigger>
            <TabsTrigger value="market-analysis">Market Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="brand-monitoring">
            <BrandMonitoring />
          </TabsContent>
          <TabsContent value="dark-web">
            <DarkWebMentions />
          </TabsContent>
          <TabsContent value="risk-assessment">
            <RiskAssessment />
          </TabsContent>
          <TabsContent value="threat-intelligence">
            <ThreatIntelligence />
          </TabsContent>
          <TabsContent value="market-analysis">
            <MarketAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
