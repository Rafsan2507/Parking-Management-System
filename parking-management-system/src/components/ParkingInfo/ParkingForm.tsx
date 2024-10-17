"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
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
import { addParkingInfo, Parking } from "@/redux/ParkingSlice/ParkingSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

type Props = {};

const ParkingForm = (props: Props) => {
  const [entryDate, setEntryDate] = useState<Date>();
  const [exitDate, setExitDate] = useState<Date>();
  const [entryTime, setEntryTime] = useState<string>("00:00");
  const [exitTime, setExitTime] = useState<string>("00:00");
  const [type, setType] = useState<string>("");
  const [license, setLicense] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const types = ["Car", "Microbus", "Bike", "Truck"];

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parkingInfo: Parking = {
      type,
      license,
      name,
      phone,
      address,
      status,
      entryDate,
      entryTime,
      exitDate,
      exitTime,
    };
    dispatch(addParkingInfo(parkingInfo));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 items-center">
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
          <div>
            <Select onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>

                  <SelectItem value="in">In</SelectItem>
                  <SelectItem value="out">Out</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="license">License Number</Label>
          <Input
            type="text"
            id="license"
            placeholder="License Number"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="name">Owner Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="text"
            id="phone"
            placeholder="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <Label htmlFor="date">Entry Date and Time</Label>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !entryDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {entryDate ? (
                    format(entryDate, "PPP")
                  ) : (
                    <span>Pick EntryDate</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={entryDate}
                  onSelect={setEntryDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Select
              defaultValue={entryTime!}
              onValueChange={(e) => {
                setEntryTime(e);
                if (entryDate) {
                  const [hours, minutes] = e.split(":");
                  const newDate = new Date(entryDate.getTime());
                  newDate.setHours(parseInt(hours), parseInt(minutes));
                  setEntryDate(newDate);
                }
              }}
            >
              <SelectTrigger className="font-normal focus:ring-0 w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-[15rem]">
                  {Array.from({ length: 96 }).map((_, i) => {
                    const hour = Math.floor(i / 4)
                      .toString()
                      .padStart(2, "0");
                    const minute = ((i % 4) * 15).toString().padStart(2, "0");
                    return (
                      <SelectItem key={i} value={`${hour}:${minute}`}>
                        {hour}:{minute}
                      </SelectItem>
                    );
                  })}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Label htmlFor="date">Exit Date and Time</Label>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !exitDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {exitDate ? (
                    format(exitDate, "PPP")
                  ) : (
                    <span>Pick ExitDate</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={exitDate}
                  onSelect={setExitDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Select
              defaultValue={exitTime!}
              onValueChange={(e) => {
                setExitTime(e);
                if (exitDate) {
                  const [hours, minutes] = e.split(":");
                  const newDate = new Date(exitDate.getTime());
                  newDate.setHours(parseInt(hours), parseInt(minutes));
                  setExitDate(newDate);
                }
              }}
            >
              <SelectTrigger className="font-normal focus:ring-0 w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-[15rem]">
                  {Array.from({ length: 96 }).map((_, i) => {
                    const hour = Math.floor(i / 4)
                      .toString()
                      .padStart(2, "0");
                    const minute = ((i % 4) * 15).toString().padStart(2, "0");
                    return (
                      <SelectItem key={i} value={`${hour}:${minute}`}>
                        {hour}:{minute}
                      </SelectItem>
                    );
                  })}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Button>Save</Button>
        </div>
      </div>
    </form>
  );
};

export default ParkingForm;
