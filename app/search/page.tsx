/**
 * @file app/search/page.tsx
 * @description Search results page displaying query parameters
 */

"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import locationsData from "@/data/locations.json";
import { Location } from "@/types";

function SearchResults() {
  const searchParams = useSearchParams();

  // Get all query parameters
  const mode = searchParams.get("mode") || "";
  const fromCode = searchParams.get("from") || "";
  const toCode = searchParams.get("to") || "";
  const departureDate = searchParams.get("dep") || "";
  const returnDate = searchParams.get("ret") || "";
  const passengers = searchParams.get("passengers") || "";

  // Find location names from codes
  const locations = locationsData as Location[];
  const fromLocation = locations.find((loc) => loc.short_code === fromCode);
  const toLocation = locations.find((loc) => loc.short_code === toCode);

  // Format date for display
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg border border-gray-200 bg-white rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start">
                <span className="text-sm font-medium text-gray-600 w-40">
                  From:
                </span>
                <span className="text-sm text-gray-900">
                  {fromLocation?.english_name || fromCode}
                </span>
              </div>

              <div className="flex items-start">
                <span className="text-sm font-medium text-gray-600 w-40">
                  To:
                </span>
                <span className="text-sm text-gray-900">
                  {toLocation?.english_name || toCode}
                </span>
              </div>

              <div className="flex items-start">
                <span className="text-sm font-medium text-gray-600 w-40">
                  Departure date:
                </span>
                <span className="text-sm text-gray-900">{departureDate}</span>
              </div>

              {returnDate && (
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-600 w-40">
                    Return date:
                  </span>
                  <span className="text-sm text-gray-900">{returnDate}</span>
                </div>
              )}

              <div className="flex items-start">
                <span className="text-sm font-medium text-gray-600 w-40">
                  No of passenger:
                </span>
                <span className="text-sm text-gray-900">{passengers}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <Card className="shadow-lg border border-gray-200 bg-white rounded-2xl">
          <CardContent className="p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </CardContent>
        </Card>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
