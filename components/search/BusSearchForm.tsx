/**
 * @file components/search/BusSearchForm.tsx
 * @description Bus & Shuttle search form component with React Hook Form and Zod validation
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";
import { Location } from "@/types";
import { formatDateToISO } from "@/utils/formatters";
import { DEFAULT_PASSENGERS } from "@/constants";
import locationsData from "@/data/locations.json";
import { Search } from "lucide-react";
import Transfer from "../icons/Transfer";
import {
  busSearchSchema,
  BusSearchFormValues,
} from "@/lib/validations/busSearchSchema";

export function BusSearchForm() {
  const router = useRouter();
  const [isRoundTrip, setIsRoundTrip] = React.useState(false);

  // Convert locations data to combobox options
  const locationOptions: ComboboxOption[] = locationsData.map(
    (loc: Location) => ({
      label: loc.english_name,
      value: loc.short_code,
    })
  );

  // Initialize React Hook Form with Zod validation
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(busSearchSchema),
    defaultValues: {
      mode: "bus",
      from: "",
      to: "",
      departureDate: undefined,
      returnDate: null,
      passengers: DEFAULT_PASSENGERS,
    },
  });

  const departureDate = watch("departureDate");

  const onSubmit = async (data: any) => {
    try {
      // Build query params
      const params = new URLSearchParams({
        mode: data.mode,
        from: data.from,
        to: data.to,
        dep: formatDateToISO(data.departureDate),
        passengers: data.passengers.toString(),
      });

      // Add return date if present
      if (data.returnDate) {
        params.append("ret", formatDateToISO(data.returnDate));
      }

      // Navigate to search page
      router.push(`/search?${params.toString()}`);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full bg-transparent rounded-b-2xl rounded-t-none">
      <div className="px-8 py-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Main Row: From, Transfer Icon, To, Departure Date, Round Trip Checkbox + Return Date, Passengers */}
          <div className="flex items-end gap-3">
            {/* From Location */}
            <div className="flex-1">
              <Label
                htmlFor="from"
                className="text-xs font-medium text-gray-600 uppercase block mb-2"
              >
                From
              </Label>
              <Controller
                name="from"
                control={control}
                render={({ field }) => (
                  <Combobox
                    options={locationOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Enter city, terminal..."
                    searchPlaceholder="Search location..."
                    emptyText="No location found."
                    error={errors.from?.message}
                  />
                )}
              />
            </div>

            {/* Transfer Icon */}
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full mb-1"
              style={{ boxShadow: "0px 2px 4px 0px #2050761F" }}
            >
              <Transfer />
            </div>

            {/* To Location */}
            <div className="flex-1">
              <Label
                htmlFor="to"
                className="text-xs font-medium text-gray-600 uppercase block mb-2"
              >
                To
              </Label>
              <Controller
                name="to"
                control={control}
                render={({ field }) => (
                  <Combobox
                    options={locationOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Enter city, terminal..."
                    searchPlaceholder="Search location..."
                    emptyText="No location found."
                    error={errors.to?.message}
                  />
                )}
              />
            </div>

            {/* Departure Date */}
            <div className="flex-1">
              <Label
                htmlFor="departureDate"
                className="text-xs font-medium text-gray-600 uppercase block mb-2"
              >
                Departure Date
              </Label>
              <Controller
                name="departureDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    date={field.value}
                    onDateChange={field.onChange}
                    placeholder="DD / MM / YYYY   00:00"
                    error={errors.departureDate?.message}
                    minDate={new Date()}
                    numberOfMonths={2}
                  />
                )}
              />
            </div>

            {/* Round Trip Checkbox + Return Date */}
            <div className="flex-1">
              <label className="flex items-center gap-2 cursor-pointer h-5 mb-2">
                <input
                  type="checkbox"
                  checked={isRoundTrip}
                  onChange={(e) => {
                    setIsRoundTrip(e.target.checked);
                    if (!e.target.checked) {
                      setValue("returnDate", null);
                    }
                  }}
                  className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                />
                <span className="text-xs text-gray-600 uppercase font-medium">
                  Round Trip?
                </span>
              </label>
              <Controller
                name="returnDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    disabled={!isRoundTrip}
                    date={field.value || undefined}
                    onDateChange={field.onChange}
                    placeholder="DD / MM / YYYY   00:00"
                    error={errors.returnDate?.message}
                    minDate={departureDate || new Date()}
                    numberOfMonths={2}
                  />
                )}
              />
            </div>

            {/* Passengers */}
            <div className="flex-1">
              <Label
                htmlFor="passengers"
                className="text-xs font-medium text-gray-600 uppercase block mb-2"
              >
                No of Passenger
              </Label>
              <Controller
                name="passengers"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      <path
                        d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="8.5"
                        cy="7"
                        r="4"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M20 8V14M23 11H17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <Input
                      id="passengers"
                      type="number"
                      min="1"
                      max="10"
                      value={field.value}
                      onChange={(e) => {
                        const value =
                          parseInt(e.target.value) || DEFAULT_PASSENGERS;
                        field.onChange(value);
                      }}
                      className={cn(
                        "pl-10 h-11 border-cyan-200 hover:border-cyan-300",
                        errors.passengers && "border-red-500"
                      )}
                    />
                    {errors.passengers && (
                      <p className="absolute text-xs text-red-500 mt-1">
                        {errors.passengers.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#19C0FF] hover:bg-[#17A2E0] text-white px-16 py-6 text-base font-semibold rounded-full shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              <div className="flex items-center justify-center gap-2">
                <Search />
                {isSubmitting ? "SEARCHING..." : "SEARCH"}
              </div>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
