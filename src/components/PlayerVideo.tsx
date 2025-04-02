import Player from 'react-player'
import { useAppSelector } from '../store'
import { useDispatch } from 'react-redux'
import { next } from '../store/slices/player'

export function PlayerVideo() {
  const dispatch = useDispatch()
  
  const lession = useAppSelector(state =>{
      const { currentMouleIndex, currentLessionIndex } = state.player

      const currentLesson = state.player.courser.modules[currentMouleIndex].lessons[currentLessionIndex]

      return currentLesson
  })


  function handlePlay(){
    dispatch(next())
  }

  return(
    <div className="flex-1">
    <div className="w-ful bg-zinc-950 aspect-video">
      <Player 
        width={'100%'}
        height={'100%'}
        playing
        onEnded={handlePlay}
        controls
        url={`https://www.youtube.com/watch?v=${lession.id}`}
      />
    </div>
  </div>
  )
}