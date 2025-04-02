import { PlayCircle, Video } from "lucide-react";

interface lessonProps{
  title: string,
  duration: string,
  onPlay: () => void,
  isCurrent?: boolean
}

export function Lession({ title, duration, onPlay, isCurrent = false} : lessonProps){
  return(
    <button 
      data-active={isCurrent}
      onClick={onPlay} 
      disabled={isCurrent}
      className="flex items-center gap-3 text-sm text-zinc-400 cursor-pointer data-[active=true]:text-emerald-400 enabled:hover:text-zinc-100 "
    >
         {
          isCurrent ? (
            <PlayCircle className="w-4 h-4 text-emarald-400" />
          )
             : (
            <Video  className="w-4 h-4 text-zinc-500" />
          )
         }
          <span>{title}</span>
          <span className="ml-auto font-mono text-xs text-zinc-500">{duration}</span>
        </button>
  )
}