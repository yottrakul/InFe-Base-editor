import {useState, useEffect} from 'react'
import Container from '@/UI/Container'
import UserDialog from './ChatDialog/UserDialog'
import BotDialog from './ChatDialog/BotDialog'
import UserQueryDialog from './ChatDialog/UserQueryDialog'
import ChatBar from './ChatBar'
import axios from 'axios'
import { Fact } from '@/pages/facts'
import type { ChatState } from '@/lib/ChatStatusT'

const FACT_ENDPOINT = 'http://localhost:8000/api/facts';
const INFER_ENDPOINT = 'http://localhost:8000/api/infer_engine';
const defaultState: ChatState = {
    bb: [],
    concludNode: [],
    kb: [],
    query: [],
    result: [],
    save_query: [],
    startNode: [],
}

function ChatBox() {
    const [state, setState] = useState(defaultState);
    const [msgSend, setMsgSend] = useState(false);

    // เรียก ChatState จาก INFER_ENDPOINT
    useEffect(() => {
        try {
            axios.post(`${INFER_ENDPOINT}/start`).then(res => {
                setState(res.data)
                // console.log(state)
            });
        } catch (error: any) {
            console.log(error.message)
        }
    },[]);

    const searchFact = async (msg: string): Promise<Array<Fact>> => {
        try{
            const res = await axios.get(`${FACT_ENDPOINT}/search/${msg}`);
            return res.data

        } catch (error: any) {
            console.log(error.message)
            return [];
        }
    }

    const sendState = async (state: ChatState): Promise<ChatState> => {
        try {
            const res = await axios.post(`${INFER_ENDPOINT}/start`, state);
            return res.data
        } catch (error: any) {
            console.log(error.message)
            return state;
        }
    }

    const handleSendMsg = async(msg: string) => {
        const resultFacts = await searchFact(msg); // []
        // เอา resultFacts ยัดลงใน state.bb
        if(resultFacts.length > 0) {
            setState(prev => {
                const newBB = [...prev.bb,...resultFacts];
                prev.bb = newBB;
                return {...prev}
            })
        }
        const resultState = await sendState(state)
        setState(resultState);

        // ปิดไม่ให้ใช้ ChatBar
        setMsgSend(true);
    }
  return (
    <div className="h-[calc(100vh-10rem)]">
        <Container className=" flex flex-col gap-4 overflow-auto h-full py-4">
          <UserDialog/>
          <BotDialog/>
          <UserQueryDialog/>
        </Container>
        <ChatBar disable={msgSend} onSend={handleSendMsg}/>
      </div>
  )
}

export default ChatBox