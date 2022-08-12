/* eslint-disable no-unused-vars */
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../tools/api";

interface ProductDto {
  Id: Number,
  Name: String,
  Price: Number
}

interface ProductState {
  all: ProductDto[]
  loading: boolean
  currentRequestId?: string
}

const initialState: ProductState = {
  all: [],
  loading: false,
  currentRequestId: undefined
}

export const getProducts = createAsyncThunk<
  ProductDto[],
  Partial<ProductState>,
  { rejectValue: string | any}
  >(
    "product/getProducts", 
    async () => {
    try {
      const response = await API.get('api/Product')
      return response.data
    }
    catch(err) {
      console.log(err)
    }
});



const productSlice = createSlice<ProductState, any>({
  name: "product",
  initialState,
  reducers: {
    setAll: (state: ProductState, action: setAllActionType): ProductState => {
      return { ...state, all: action.payload }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.currentRequestId = action.meta.requestId
      state.loading = true
      console.log('pending')
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      const { requestId } = action.meta
      if ( state.loading && state.currentRequestId === requestId)
      {
        action.payload.forEach(element => {
          state.loading = false
          state.all.push(element)
        });

      }

    })
    builder.addCase(getProducts.rejected, (state, action) => {
      console.log('Rejected', action.error)
    })
  },
});

const setAllAction = createAction<any[]>('SET_ALL')
type setAllActionType = ReturnType<typeof setAllAction>

export const { setAll } = productSlice.actions;

export default productSlice.reducer;
