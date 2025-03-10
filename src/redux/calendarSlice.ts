import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Calendar {
  "Seq No.": number;
  Week: string;
  "Week Label": string;
  Month: string;
  "Month Label": string;
  id: string;
}

interface CalendarState {
  calendar: Calendar[];
}

const initialState: CalendarState = {
  calendar: [],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCalendar: (state, action: PayloadAction<Calendar[]>) => {
      state.calendar = action.payload;
    },
  },
});

export const { setCalendar } = calendarSlice.actions;
export default calendarSlice.reducer;