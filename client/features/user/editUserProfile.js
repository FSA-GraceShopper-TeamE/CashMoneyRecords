import axios from 'axios'
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
// import {me} from '../auth/me'
/*
  CONSTANT VARIABLES
*/
// const TOKEN = "token";
const initialState = {}
export const fetchUserProfile = createAsyncThunk('user', async(id) => {
    try {
        const {data} = await axios.get(`/api/users/${id}`)
        return data
    }catch (err) {
        console.log(err)
    }
})
export const editSingleUser = createAsyncThunk('user/edit',async(edit)=>{
    try {
        const id = edit.id
        const {data} = await axios.put(`/api/users/${id}`, {
            email: edit.email,
            address: edit.address
        });
        return data;
    } catch (err) {
        console.log(err);
    }
});
const editSingleProfile = createSlice({
    name: 'editUser',
    initialState,
    reducer: {},
    extraReducers:(builder) => {
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            return action.payload;
          });
        builder.addCase(editSingleUser.fulfilled, (state, action) => {
            return action.payload;
        })
    }
    
});
export const singleUserEdit = (state,action) => state.editUser;
export default editSingleProfile.reducer;