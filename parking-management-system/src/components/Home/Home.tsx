"use client";
import React, { useState } from 'react'
import MenuBar from '../CustomComponent/MenuBar';
import ParkingForm from '../ParkingInfo/ParkingForm';
import ParkingList from '../ParkingInfo/ParkingList';
import Dashboard from '../DashBoardComponent/Dashboard';
type Props = {}

const Home = (props: Props) => {
    const [menu, setMenu] = useState<string>("info");
  
    const handleClick = (m: string) => {
      setMenu(m);
    };
    return (
      <div className="h-[100vh] overflow-auto">
        <div className="flex justify-center py-[2vh]">
          <MenuBar handleClick={handleClick}/>
        </div>
  
        <div className="px-8 py-2">
        {menu === "dashboard" && <Dashboard/>}
          {menu === "info" && <ParkingForm/>}
          {menu === "list" && <ParkingList/>}
        </div>
      </div>
    )
}

export default Home