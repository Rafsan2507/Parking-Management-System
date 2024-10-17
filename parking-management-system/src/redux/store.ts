import { configureStore } from "@reduxjs/toolkit";
import { ParkingSlice } from "./ParkingSlice/ParkingSlice";


export const store = configureStore({
  reducer: {
    parkingInfo: ParkingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;