import { configureStore } from '@reduxjs/toolkit';
// reducer
import text from './slice/text';


export default configureStore({
  reducer: {
    text,
  }
});