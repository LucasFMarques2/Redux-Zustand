import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";

interface courser {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string,
      title: string,
      duration: string
    }>
  }>
}

export interface PlayerState {
  currentMouleIndex: number
  currentlessonsIndex: number
  coursers: courser | null
  isLoading: boolean
}


const initialState: PlayerState = {
  coursers: null,
  currentMouleIndex: 0,
  currentlessonsIndex: 0,
  isLoading: false
}

export const loadCourse = createAsyncThunk(
  'play/load',
  async () => {
   const response = await api.get('/courses/1')

   return response.data
  }
)

export const playerSlice = createSlice({
  
  name: 'player',
  initialState,

  reducers: {
    play: (state, action: PayloadAction<[number, number]> ) => {
      state.currentMouleIndex = action.payload[0]
      state.currentlessonsIndex = action.payload[1]
    },

    next: (state) => {
      const nextlessonsIndex = state.currentlessonsIndex + 1;
      const nextlessons = state.coursers?.modules[state.currentMouleIndex].lessons[nextlessonsIndex]

      if (nextlessons) {
        state.currentlessonsIndex = nextlessonsIndex
        return
      }

      const nextModuleIndex = state.currentMouleIndex + 1
      const nextModule = state.coursers?.modules[nextModuleIndex]

      if (nextModule){
        state.currentMouleIndex = nextModuleIndex
        state.currentlessonsIndex = 0
      }
    }
  },
  extraReducers(builder){
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.coursers = action.payload
      state.isLoading = false
    })
  }
})

export const player = playerSlice.reducer
export const { play, next } = playerSlice.actions


export const useCurrentlessons = () => {
 return useAppSelector(state =>{
   const { currentMouleIndex, currentlessonsIndex } = state.player

   const currentModule = state.player.coursers?.modules[currentMouleIndex]
   const currentlessons = currentModule?.lessons[currentlessonsIndex]

   return { currentModule, currentlessons }
 })
}