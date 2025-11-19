/**
 * @file components/ui/date-picker.tsx
 * @description Date picker component with calendar
 */

"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  minDate?: Date;
  numberOfMonths?: number;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "DD / MM / YYYY   00:00",
  disabled = false,
  error,
  minDate,
  numberOfMonths = 1,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const formatDate = (date: Date | undefined) => {
    if (!date) return null;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}   00:00`;
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    onDateChange(selectedDate);
    setOpen(false);
  };

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-11 border-cyan-200 hover:border-cyan-300",
              !date && "text-gray-400",
              error && "border-red-500"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
            {date ? formatDate(date) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={(date) => {
              if (minDate) {
                const minDateCopy = new Date(minDate);
                minDateCopy.setHours(0, 0, 0, 0);
                const dateCopy = new Date(date);
                dateCopy.setHours(0, 0, 0, 0);
                return dateCopy < minDateCopy;
              }
              return false;
            }}
            numberOfMonths={numberOfMonths}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && <p className="absolute text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
