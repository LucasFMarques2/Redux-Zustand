import { Header } from "../components/Header"
import { Modules } from "../components/Modules"
import { PlayerVideo } from "../components/PlayerVideo"
import { useAppSelector } from "../store"

export function Player(){

  const modules = useAppSelector(state => {
    return state.player.courser.modules
  })

  return(
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <Header />
        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shodow pr-80">
          <PlayerVideo />
          <aside className="w-80 absolute top-0 right-0 bottom-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-auto scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-violet-600">
          {modules.map((module, index) => {
            return(
              <Modules 
                key={module.id}
                moduleIndex={index}
                title={module.title}
                amountOfLession={module.lessons.length}
            />
            )
          })}

          </aside>
        </main>
      </div>
    </div>
  )
}