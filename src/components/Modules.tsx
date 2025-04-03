import { Collapsible } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { Lessons } from "./Lesson";
import { useAppDispatch, useAppSelector } from "../store";
import { play } from "../store/slices/player";

interface ModuleProps{
  moduleIndex: number,
  title: string,
  amountOflessons: number
}

export function Modules({ moduleIndex, title, amountOflessons }: ModuleProps) {
  const { currentMouleIndex, currentlessonsIndex } = useAppSelector(state => {
    const { currentMouleIndex, currentlessonsIndex } = state.player

    return { currentMouleIndex, currentlessonsIndex }
  })
  
  const lessons = useAppSelector(state => {
    return state.player.coursers?.modules[moduleIndex].lessons
  })


  const dispath = useAppDispatch()

  return(
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div  className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-900 text-xs">
          {moduleIndex + 1}
        </div>
        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400"> {amountOflessons} aulas</span>
        </div>
        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180" />
      </Collapsible.Trigger>
      <Collapsible.Content className="relative flex flex-col gap-4 p-6">
        {lessons && lessons.map((lessons, lessonsIndex) => {
          const isCurrent = currentMouleIndex === moduleIndex &&
            currentlessonsIndex === lessonsIndex
          return (
            <Lessons
              key={lessons.id}
              title={lessons.title}
              duration={lessons.duration} 
              isCurrent={isCurrent}
              onPlay={() => dispath(play([moduleIndex, lessonsIndex]))}
          />
          )
       })}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}