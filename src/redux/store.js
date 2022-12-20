import {configureStore} from '@reduxjs/toolkit';
import employeeIdState from './states/employeeIdSlice';
import currentEmployee from './states/currentEmployee';

export default configureStore({
    reducer: {
        employeeId: employeeIdState,
        currentEmployee
    }
})