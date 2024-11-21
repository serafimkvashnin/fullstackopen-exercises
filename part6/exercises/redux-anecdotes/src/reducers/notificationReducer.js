import { createSlice } from '@reduxjs/toolkit';

let currentTimeoutId;

export const showNotification = (content, durationSec) => {
  return (dispatch) => {
    dispatch(setNotification(content));

    if (currentTimeoutId) {
      clearTimeout(currentTimeoutId);
    }

    currentTimeoutId = setTimeout(() => {
      dispatch(clearNotification());
      currentTimeoutId = null;
    }, durationSec * 1000);
  };
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return '';
    }
  }
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
