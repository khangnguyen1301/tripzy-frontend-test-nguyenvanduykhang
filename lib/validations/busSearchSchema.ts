/**
 * @file lib/validations/busSearchSchema.ts
 * @description Zod validation schema for bus search form
 */

import { z } from "zod";

export const busSearchSchema = z
  .object({
    mode: z.string().default("bus"),
    from: z.string().min(1, "Please select departure location"),
    to: z.string().min(1, "Please select arrival location"),
    departureDate: z.date({
      message: "Please select departure date",
    }),
    returnDate: z.union([z.date(), z.null()]).optional(),
    passengers: z
      .number({
        message: "Please enter a valid number",
      })
      .int("Number of passengers must be a whole number")
      .min(1, "At least 1 passenger is required")
      .max(10, "Maximum 10 passengers allowed")
      .default(1),
  })
  .refine(
    (data) => {
      // If returnDate is provided, it must be after or equal to departureDate
      if (data.returnDate && data.departureDate) {
        return data.returnDate >= data.departureDate;
      }
      return true;
    },
    {
      message: "Return date must be after or equal to departure date",
      path: ["returnDate"],
    }
  );

export type BusSearchFormValues = z.infer<typeof busSearchSchema>;
