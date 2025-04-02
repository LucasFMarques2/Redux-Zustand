import { Collapsible } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { Lession } from "./Lesson";
import { useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { play } from "../store/slices/player";

interface ModuleProps{
  moduleIndex: number,
  title: string,
  amountOfLession: number
}

export function Modules({moduleIndex, title, amountOfLession} : ModuleProps){
  const {currentMouleIndex, currentLessionIndex} = useAppSelector(state => {
    const {currentMouleIndex, currentLessionIndex} = state.player

    return { currentMouleIndex, currentLessionIndex}
  })
  
  const lessions = useAppSelector(state => {
    return state.player.courser.modules[moduleIndex].lessons
  })

  const dispath = useDispatch()

  return(
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-900 text-xs">
          {moduleIndex + 1}
        </div>
        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400"> {amountOfLession} aulas</span>
        </div>
        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180" />
      </Collapsible.Trigger>
      <Collapsible.Content className="relative flex flex-col gap-4 p-6">
       {lessions.map((lession, lessionIndex) => {
          const isCurrent = currentMouleIndex === moduleIndex &&
          currentLessionIndex === lessionIndex
          return (
            <Lession 
            key={lession.id} 
            title={lession.title} 
            duration={lession.duration} 
            isCurrent={isCurrent}
            onPlay={() => dispath(play([moduleIndex, lessionIndex]))}
          />
          )
       })}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}