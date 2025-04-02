import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import { DataTableDemo } from "./components/data-table";



const DashboardPage: React.FC = () => {
  return (
    <Tabs defaultValue="contract" className="p-9 w-[100%]">

        
      <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="contract">계약 및 업체가이드</TabsTrigger>
          <TabsTrigger value="rank">순위관리</TabsTrigger>
          <TabsTrigger value="place">플레이스cpc</TabsTrigger>
          <TabsTrigger value="blog">기자단</TabsTrigger>
          <TabsTrigger value="review">영수증리뷰</TabsTrigger>
          <TabsTrigger value="insta">sns</TabsTrigger>
      </TabsList>
      <TabsContent value="contract">
        <DataTableDemo />
      </TabsContent>
      <TabsContent value="rank">
          <h2>순위리스트</h2>
      </TabsContent>
      <TabsContent value="place">
          <h2>네이버 플레이스</h2>
      </TabsContent>
      <TabsContent value="review">
          <h2>영수증리뷰</h2>
      </TabsContent>
      <TabsContent value="insta">
          <h2>SNS리뷰</h2>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardPage;