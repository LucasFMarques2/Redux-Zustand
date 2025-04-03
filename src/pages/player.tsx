import { useEffect } from "react"
import { Header } from "../components/Header"
import { Modules } from "../components/Modules"
import { PlayerVideo } from "../components/PlayerVideo"
import { useAppDispatch, useAppSelector } from "../store"
import { useCurrentlessons, loadCourse } from "../store/slices/player"
import { MessageCircle } from "lucide-react"

export function Player(){
  const dispatch = useAppDispatch()

  const modules = useAppSelector(state => {
    return state.player.coursers?.modules
  })

  const { currentlessons } = useCurrentlessons()

  useEffect(() => {
    dispatch(loadCourse())
  }, [dispatch]);


  useEffect(() =>{
    if (currentlessons) {
      document.title = `Assitindo: ${currentlessons.title}`
    }
  }, [currentlessons])

  return(
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />
          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-whit cursor-pointer hover:bg-violet-600">
            <MessageCircle className="h-4 w-4"/> 
              Deixar feedback
          </button>
        </div>
        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shodow pr-80">
          <PlayerVideo />
          <aside className="w-80 absolute top-0 right-0 bottom-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-auto scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-violet-600">
            {modules && modules.map((module, index) => {
            return(
              <Modules 
                key={module.id}
                moduleIndex={index}
                title={module.title}
                amountOflessons={module.lessons.length}
            />
            )
          })}
          </aside>
        </main>
      </div>
    </div>
  )
}