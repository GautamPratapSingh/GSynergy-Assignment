// src/redux/planningSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


export interface PlanningRow {
    id: string;
    store: string;
    sku: string;
    price: number;
    cost: number;
    salesUnits: number;
    salesDollars: number;
    gmDollars: number;
    gmPercentage: number;
  }

interface PlanningState {
  rows: PlanningRow[];
  loading: boolean;
  error: string | null;
}

const initialState: PlanningState = {
  rows: [],
  loading: false,
  error: null,
};

// Async thunk to fetch planning data from API
export const fetchPlanningData = createAsyncThunk(
  'planning/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3001/Planning'); // API endpoint
      return response.data; // Ensure this matches the PlanningRow format
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch data');
    }
  }
);

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    updateSalesUnits: (state, action: PayloadAction<{ id: string; salesUnits: number }>) => {
      const row = state.rows.find((r) => r.id === action.payload.id);
      if (row) {
        row.salesUnits = action.payload.salesUnits;
        row.salesDollars = row.salesUnits * row.price;
        row.gmDollars = row.salesDollars - row.salesUnits * row.cost;
        row.gmPercentage = row.salesDollars === 0 ? 0 : (row.gmDollars / row.salesDollars) * 100;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanningData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlanningData.fulfilled, (state, action: PayloadAction<PlanningRow[]>) => {
        state.loading = false;
        state.rows = action.payload;
      })
      .addCase(fetchPlanningData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateSalesUnits } = planningSlice.actions;
export default planningSlice.reducer;