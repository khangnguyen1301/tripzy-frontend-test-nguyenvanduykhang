/**
 * @file components/SearchTabs.tsx
 * @description Search tabs component with Bus, Hotel, and Flight options
 */

"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusSearchForm } from "@/components/search/BusSearchForm";
import { NoDataMessage } from "@/components/search/NoDataMessage";
import { TABS, TAB_LABELS } from "@/constants";
import Bus from "./icons/Bus";
import Flight from "./icons/Flight";
import Hotel from "./icons/Hotel";

export function SearchTabs() {
  return (
    <Tabs defaultValue={TABS.BUS} className="w-full gap-0 border-none">
      <TabsList
        className=" grid w-full grid-cols-3 mb-0 h-auto bg-transparent rounded-t-2xl p-2 border-0"
        style={{ boxShadow: "0px 4px 12px 0px #2050761F" }}
      >
        <TabsTrigger
          value={TABS.BUS}
          className="flex items-center justify-center gap-2 py-4 px-6 rounded-tl-2xl data-[state=active]:bg-[#EBF9FF] data-[state=active]:text-gray-900 data-[state=inactive]:bg-white text-gray-700 border-0 data-[state=active]:shadow-none"
        >
          <div className="p-4 bg-[#D3F3FF] rounded-full flex items-center justify-center">
            {/* Bus Icon SVG */}
            <Bus />
          </div>
          <span className="font-bold">{TAB_LABELS[TABS.BUS]}</span>
        </TabsTrigger>
        <TabsTrigger
          value={TABS.HOTEL}
          className="flex items-center justify-center gap-2 py-4 px-6 data-[state=active]:bg-[#F4FFEB] data-[state=active]:text-gray-900 data-[state=inactive]:bg-white text-gray-700 border-0 data-[state=active]:shadow-none"
        >
          <div className="p-4 bg-[#E8FBCC] rounded-full flex items-center justify-center">
            <Hotel />
          </div>
          <span className="font-bold">{TAB_LABELS[TABS.HOTEL]}</span>
        </TabsTrigger>
        <TabsTrigger
          value={TABS.FLIGHT}
          className="flex items-center justify-center gap-2 py-4 px-6 rounded-tr-2xl data-[state=active]:bg-[#EBF4FF] data-[state=active]:text-gray-900 data-[state=inactive]:bg-white data-[state=active]:shadow-none text-gray-700 border-0"
        >
          <div className="p-4 bg-[#E1EDFE] rounded-full flex itemscenter justify-center">
            <Flight />
          </div>
          <span className="font-bold">{TAB_LABELS[TABS.FLIGHT]}</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value={TABS.BUS}>
        <BusSearchForm />
      </TabsContent>

      <TabsContent value={TABS.HOTEL}>
        <NoDataMessage />
      </TabsContent>

      <TabsContent value={TABS.FLIGHT}>
        <NoDataMessage />
      </TabsContent>
    </Tabs>
  );
}
