import Player from 'react-player'
import { useAppSelector } from '../store'

export function PlayerVideo() {
  const lession = useAppSelector(state =>{
      const { currentMouleIndex, currentLessionIndex } = state.player

      const currentLesson = state.player.courser.modules[currentMouleIndex].lessons[currentLessionIndex]

      return currentLesson
  })

  return(
    <div className="flex-1">
    <div className="w-ful bg-zinc-950 aspect-video">
      <Player 
        width={'100%'}
        height={'100%'}
        constrols
        url={`https://www.youtube.com/watch?v=${lession.id}`}
      />
    </div>
  </div>
  )
}