import {useState} from 'react'
import Container from '@/UI/Container'
import { BiPaperPlane } from 'react-icons/bi'
import { TbLoaderQuarter } from 'react-icons/tb'
import {AiOutlineLoading} from 'react-icons/ai'
type Props = {
    onSend: Function,
    disable: boolean
}

function ChatBar({onSend, disable}: Props) {
    const [msg, setMsg] = useState('')
    const sendMessage = () => {
        onSend(msg);
        setMsg('');
    }
  return (
    <Container>
    <div className="flex px-2 gap-2">
      <input disabled={disable} value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => {e.key === 'Enter'? sendMessage():null}} className={`${!disable? 'bg-[#D9D9D9]':'bg-[#474747]'} rounded-3xl text-black text-lg flex-1 transition`} />
      {!disable? <div onClick={() => sendMessage()} className="bg-[#D9D9D9] text-black rounded-full w-fit h-fit p-2.5 cursor-pointer hover:bg-green-600 hover:text-white transition">
        <BiPaperPlane size={30}/>
      </div>:<div className={`text-white transition rounded-full w-fit h-fit p-2.5 cursor-default bg-[#D9D9D9] top-0 left-0 relative }`}>
        <BiPaperPlane className={`transitio duration-500 ease-in-out ${!disable? null:'-translate-y-14 translate-x-6 opacity-0'}`} size={30}/>
        <AiOutlineLoading className={`text-black absolute transition-all delay-500 opacity-0 top-1/2 left-1/2 -ml-[15px] -mt-[15px] animate-spin ${!disable? null:'opacity-100'}`} size={30}/>
      </div>}
    </div>
  </Container>
  )
}

export default ChatBar