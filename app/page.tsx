/**
 * @file app/page.tsx
 * @description Homepage with search form tabs
 */

"use client";

import * as React from "react";
import { SearchTabs } from "@/components/SearchTabs";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Title Section */}
      <div className="text-center space-y-3 -mt-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Travel Smarter, Not Harder
        </h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Make every trip effortless. Tripzy lets you book rides and plan
          journeys with ease
        </p>
      </div>

      {/* Search Tabs */}

      <div
        className="bg-white rounded-2xl"
        style={{ boxShadow: "0px 8px 32px 0px #2050761F" }}
      >
        <SearchTabs />
      </div>
    </div>
  );
}
