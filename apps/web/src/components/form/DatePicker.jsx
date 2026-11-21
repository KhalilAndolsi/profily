import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DatePicker = ({ placeholder = "Pick a date", value, onChange }) => {
  const [internalDate, setInternalDate] = useState();
  const date = value === undefined ? internalDate : value;
  const setDate = onChange ?? setInternalDate;
  const selectedDate =
    date instanceof Date
      ? date
      : date
        ? new Date(`${date}T12:00:00`)
        : undefined;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            type="button"
            className="w-full justify-start text-left font-normal"
          />
        }
      >
        <CalendarIcon />
        {selectedDate ? format(selectedDate, "PPP") : <span>{placeholder}</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={selectedDate} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
