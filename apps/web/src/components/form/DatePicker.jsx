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

const DatePicker = ({ placeholder = "Pick a date" }) => {
  const [date, setDate] = useState();

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
        {date ? format(date, "PPP") : <span>{placeholder}</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
