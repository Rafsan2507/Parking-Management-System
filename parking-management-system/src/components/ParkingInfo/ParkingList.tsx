"use Client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getAllParkingInfo } from "@/redux/ParkingSlice/ParkingSlice";
import { format } from "date-fns";
import UpdateParkingInfo from "./UpdateParkingInfo";

type Props = {};

const ParkingList = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllParkingInfo());
  }, [dispatch]);

  const parkingList = useSelector(
    (state: RootState) => state.parkingInfo.parkings
  );
  console.log(parkingList);
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>License</TableHead>
            <TableHead>Owner Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Entry Date and Time</TableHead>
            <TableHead>Exit Date and Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parkingList.map((list) => (
            <TableRow key={list.license}>
              <TableCell>{list.type}</TableCell>
              <TableCell>{list.license}</TableCell>
              <TableCell>{list.name}</TableCell>
              <TableCell>{list.phone}</TableCell>
              <TableCell>{list.address}</TableCell>
              <TableCell>
                {list.entryDate
                  ? format(new Date(list.entryDate), "MM/dd/yyyy")
                  : ""}{" "}
                {list.entryTime}
              </TableCell>
              <TableCell>
                {list.exitDate
                  ? format(new Date(list.exitDate), "MM/dd/yyyy")
                  : ""}{" "}
                {list.exitTime}
              </TableCell>
              <TableCell>{list.status}</TableCell>
              <div className="flex justify-end flex-row gap-4">
                <UpdateParkingInfo list={list}/>
                </div>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ParkingList;
