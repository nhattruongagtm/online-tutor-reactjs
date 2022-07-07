import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface Loading {
  loading: boolean;
}

const initialState: Loading = {
  loading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { loading } = loadingSlice.actions;

export default loadingSlice.reducer;
