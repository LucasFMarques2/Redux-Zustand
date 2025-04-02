import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    courser: {
      modules: [
        {
          id: '1',
          title: 'Iniciando com React',
          lessons: [
            { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
            { id: 'w-DW4DhDfcw', title: 'Estilização do Post', duration: '10:05' },
            { id: 'D83-55LUdKE', title: 'Componente: Header', duration: '06:33' },
            { id: 'W_ATsETujaY', title: 'Componente: Sidebar', duration: '09:12' },
            { id: 'Pj8dPeameYo', title: 'CSS Global', duration: '03:23' },
            { id: '8KBq2vhwbac', title: 'Form de comentários', duration: '11:34' },
          ],
        },
        {
          id: '2',
          title: 'Estrutura da aplicação',
          lessons: [
            { id: 'gE48FQXRZ_o', title: 'Componente: Comment', duration: '13:45' },
            { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
            { id: 'h5JA3wfuW1k', title: 'Interações no JSX', duration: '06:33' },
            { id: '1G0vSTqWELg', title: 'Utilizando estado', duration: '09:12' },
          ],
        },
      ],
    },

    currentMouleIndex: 0,
    currentLessionIndex: 0,
  },

  reducers: {
    play: (state, action: PayloadAction<[number, number]> ) => {
      state.currentMouleIndex = action.payload[0]
      state.currentLessionIndex = action.payload[1]
    },

    next: (state) => {
      const nextLessionIndex = state.currentLessionIndex + 1;
      const nextLession = state.courser.modules[state.currentMouleIndex].lessons[nextLessionIndex]

      if(nextLession){
        state.currentLessionIndex = nextLessionIndex
        return
      }

      const nextModuleIndex = state.currentMouleIndex + 1
      const nextModule = state.courser.modules[nextModuleIndex]

      if (nextModule){
        state.currentMouleIndex = nextModuleIndex
        state.currentLessionIndex = 0
      }
    }

  }
})

export const player = playerSlice.reducer
export const { play, next } = playerSlice.actions