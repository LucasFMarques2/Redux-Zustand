import {describe, expect, it} from 'vitest'
import { player as reducer, play, next, PlayerState } from './player'

const exampleState: PlayerState = {
    coursers: {
      id: 1,
        modules: [
          {
            id: 1,
            title: 'Iniciando com React',
            lessons: [
              { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
              { id: 'w-DW4DhDfcw', title: 'Estilização do Post', duration: '10:05' },
            ],
          },
          {
            id: 2,
            title: 'Estrutura da aplicação',
            lessons: [
              { id: 'gE48FQXRZ_o', title: 'Componente: Comment', duration: '13:45' },
              { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
            ],
          },
        ],
      },
    isLoading: false,
    currentMouleIndex: 0,
    currentlessonsIndex: 0,
}


describe('play slice', () => {
    it('é possível dar play', () => {
        const state = reducer(exampleState, play([1,2]))

        expect(state.currentMouleIndex).toEqual(1)
      expect(state.currentlessonsIndex).toEqual(2)
    })

    it('é possível passar para a próxima lissao', () => {

        const state = reducer(exampleState, next())

        expect(state.currentMouleIndex).toEqual(0)
      expect(state.currentlessonsIndex).toEqual(1)
    })


    it('é possível passar para o próximo modulo', () => {

        const state = reducer({
            ...exampleState,
          currentlessonsIndex: 1
        }, next())

        expect(state.currentMouleIndex).toEqual(1)
      expect(state.currentlessonsIndex).toEqual(0)
    })
})