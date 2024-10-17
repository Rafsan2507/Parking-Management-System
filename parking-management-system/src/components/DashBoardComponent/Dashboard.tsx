import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "../ui/select";
  import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
  import { Button } from "../ui/button";
  import { cn } from "@/lib/utils";
  import { Calendar as CalendarIcon } from "lucide-react";
  import { Calendar } from "../ui/calendar";
  import { format } from "date-fns";
  import { ScrollArea } from "../ui/scroll-area";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
type Props = {}

const Dashboard = (props: Props) => {
    const [date, setDate] = useState<Date>();
    const dispatch = useDispatch<AppDispatch>();
    const types = ["Car", "Microbus", "Bike", "Truck"];
    const [type, setType] = useState<string>("");
  return (
    <div className='flex flex-col gap-6'>
        <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span>Pick a Date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                Total Cars Parked Today:  
              </div>

              <div>Total empty Slot: </div>

              <div>
            <Select onValueChange={(value) => setType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Vehicle Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
    </div>
  )
}

export default Dashboard