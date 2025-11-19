/**
 * @file components/search/NoDataMessage.tsx
 * @description Component to display "No data" message
 */

"use client";

export function NoDataMessage() {
  return (
    <div
      className="border-0 text-center py-20 rounded-b-2xl flex-1"
      style={{ boxShadow: "0px 8px 32px 0px #2050761F" }}
    >
      No data
    </div>
  );
}
