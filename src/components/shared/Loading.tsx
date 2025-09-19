import { Loader2 } from "lucide-react"

const Loading = () => {
  return (
    <>
    <div className="w-full h-[95svh] flex justify-center items-center">
        <Loader2 className="animate-spin h-8 w-8"/>
    </div>
    </>
  )
}

export default Loading