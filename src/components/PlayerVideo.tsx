import Player from 'react-player'
import { next, useCurrentlessons } from '../store/slices/player'
import { useAppDispatch, useAppSelector } from '../store'
import { Loader } from 'lucide-react'

export function PlayerVideo() {
  const dispatch = useAppDispatch();
  const { currentlessons } = useCurrentlessons();
  const isLoading = useAppSelector(state => state.player.isLoading);

  if (isLoading) {
    return (
      <div className="flex-1">
        <div className="w-full bg-zinc-950 aspect-video flex items-center justify-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin"/>
        </div>
      </div>
    );
  }

  if (!currentlessons) {
    return null;
  }

  function handlePlay(){
    dispatch(next());
  }

  return(
    <div className="flex-1">
      <div className="w-full bg-zinc-950 aspect-video">
        <Player 
          width={'100%'}
          height={'100%'}
          playing
          onEnded={handlePlay}
          controls
          url={`https://www.youtube.com/watch?v=${currentlessons?.id}`}
        />
      </div>
    </div>
  );
}
