import { format } from "date-fns";
import { CalendarDays, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ formData, setFormData }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="
    w-full
    h-12
    rounded-xl
    app-glass-medium
    app-text-primary
    justify-between
    hover:border-[var(--dashboard)]
    transition-all
  "
        >
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 dashboard-text" />
            {formData.startDate
              ? format(formData.startDate, "dd MMM yyyy")
              : "Start date"}
          </div>

          <ChevronDown className="w-4 h-4 opacity-60" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="
    w-auto
    p-3
    rounded-2xl
    border
    app-glass
    shadow-2xl
  "
      >
        <Calendar
          mode="single"
          selected={formData.startDate}
          onSelect={(date) =>
            setFormData((prev) => ({
              ...prev,
              startDate: date,
            }))
          }
        />
      </PopoverContent>
    </Popover>
  );
}
