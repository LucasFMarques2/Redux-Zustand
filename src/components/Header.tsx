import { useCurrentlessons } from "../store/slices/player";
import { useAppSelector } from "../store";

export function Header(){
  const { currentModule, currentlessons } = useCurrentlessons()
   const isLoading = useAppSelector(state => state.player.isLoading)

   if(isLoading){
    return <h1>Carreando...</h1>
  }

  if(!currentModule || !currentlessons) {
    return
  }

  

  return(
       <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">{currentlessons?.title}</h1>
            <span className="text-sm text-zinc-400">Módulo "{currentModule?.title}"</span>
          </div>
       </div>
  )
}