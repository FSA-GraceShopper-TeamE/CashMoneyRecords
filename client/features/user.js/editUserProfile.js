import axios from 'axios'
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {me} from '../auth/me'
/*
  CONSTANT VARIABLES
*/
// const TOKEN = "token";
// export const editSingleUser = createAsyncThunk('user/edit',async(edit)=>{
//     try {
//         const { id, email, address} = edit
//         const editingTo = { email, address }

//         const {data} = await axios.put(`/api/users/${id}`, editingTo)
//         console.log('this is the thunk', data)
//         return data;
//     } catch (err) {
//         console.log(err);
//     }
// });

export const editSingleprofile = createSlice({
    name: 'editUser',
    initialState: [],
    reducer: {},
    extraReducers:(builder) => {
        builder.addCase(editSingleUser.fulfilled), (state, action) => {
            return action.payload;
        }
    }
});
export const singleUserEdit = (state) => state.editUser;
export default editSingleprofile.reducer;