import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Parking {
  id?: string;
  type: string;
  license: string;
  name: string;
  phone: string;
  address: string;
  status: string;
  entryDate?: Date;
  entryTime: string;
  exitDate?: Date;
  exitTime: string;
}

export interface ParkingState {
  parkings: Parking[];
  parking: Parking;
}

const initialState: ParkingState = {
  parkings: [],
  parking: {
    type: "",
    license: "",
    name: "",
    phone: "",
    address: "",
    status: "",
    entryDate: new Date(),
    entryTime: "",
    exitDate: new Date(),
    exitTime: "",
  },
};

export const ParkingSlice = createSlice({
  name: "parkings",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(
      addParkingInfo.fulfilled,
      (state, action: PayloadAction<Parking>) => {
        state.parkings.push(action.payload);
      }
    );
    builder.addCase(
      getAllParkingInfo.fulfilled,
      (state, action: PayloadAction<Parking[]>) => {
        state.parkings = action.payload;
      }
    );
    builder.addCase(
      updateParkingInfo.fulfilled,
      (state, action: PayloadAction<Parking>) => {
        const index = state.parkings.findIndex(
          (parking) => parking.license === action.payload.license
        );
        state.parkings[index] = action.payload;
      }
    );
  },
});

export const addParkingInfo = createAsyncThunk(
  "parkings/addParkingInfo",
  async (parking: Parking) => {
    const response = await axios.post(`${Base_URL}/parkings`, parking);
    return response.data;
  }
);

export const getAllParkingInfo = createAsyncThunk(
  "parkings/getAllParkingInfo",
  async () => {
    const response = await axios.get(`${Base_URL}/parkings`);
    return response.data;
  }
);

export const updateParkingInfo = createAsyncThunk(
  "parkings/updateParkingInfo",
  async (parking: Parking) => {
    const response = await axios.put(
      `${Base_URL}/parkings/${parking.id}`,
      parking
    );
    return response.data;
  }
);

const Base_URL = "http://localhost:5000";

export default ParkingSlice.reducer;
