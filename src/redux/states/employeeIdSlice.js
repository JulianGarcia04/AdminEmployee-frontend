import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "employeeId",
    initialState:{
        value: {
            id:''
        }
    },
    reducers:{
        setId: (state, action)=>{
            state.value = action.payload
        }
    }
})

export const {setId} = slice.actions

export default slice.reducer;