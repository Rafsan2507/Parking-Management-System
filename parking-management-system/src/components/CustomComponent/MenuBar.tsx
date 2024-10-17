"use client"
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";

type Props = {
  handleClick: (m: string) => void;
};

const MenuBar = ({handleClick}: Props) => {
  return (
    <Menubar className="flex flex-row space-between">
      <MenubarMenu>
        <MenubarTrigger onClick={()=>handleClick("dashboard")}>Dashboard</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={()=>handleClick("list")}>Parking List</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={()=>handleClick("info")}>Parking Info</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenuBar;