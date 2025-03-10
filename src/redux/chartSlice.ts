// src/redux/chartSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Calculation {
  Store: string;
  Week: string;
  "GM Dollars": number;
  "Sales Dollars": number;
  "GM %": number;
}

interface ChartState {
  data: Calculation[];
  loading: boolean;
  error: string | null;
}

const initialState: ChartState = {
  data: [],
  loading: false,
  error: null,
};

// Thunk to fetch chart data
export const fetchChartData = createAsyncThunk(
  'chart/fetchChartData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3001/Calculations');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default chartSlice.reducer;