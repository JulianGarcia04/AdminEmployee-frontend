import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
    name:"currentEmployee",
    initialState:{
        value:{}
    },
    reducers: {
        setEmployee: (state, action)=>{
            state.value = action.payload
        }
    }
})

export const {setEmployee} = slice.actions


export default slice.reducer