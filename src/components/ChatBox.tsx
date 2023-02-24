import {useState, useEffect, useRef} from 'react'
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
const welcomeMsg = 'สวัสดีค่ะ ฉัน InFe ยินดีรับใช้ กรุณากรอกคำถามที่คุณต้องการค่ะ';

function ChatBox() {
    const [state, setState] = useState(defaultState);
    const [msgSend, setMsgSend] = useState(false);
    const chatView = useRef<HTMLDivElement>(null);
    const [chatSpace, setChatSpace] = useState<JSX.Element[]>([
        <BotDialog key={Date.now()} msg={welcomeMsg}/>
    ]);
    

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

    useEffect(() => {
        chatScroll();
    })

    const chatScroll = () => {
        if(chatView.current !== null) {
            chatView.current.scrollTop = chatView.current.scrollHeight;
            // console.log('Scroll')
        }
    }

    

    const resetState = () => {
        try {
            axios.post(`${INFER_ENDPOINT}/start`).then(res => {
                setState(res.data)
                // console.log(state)
            });
        } catch (error: any) {
            console.log(error.message)
        }
    }

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
        const userDialog =  <UserDialog key={Date.now()} msg={msg}/>;
        const newChatSpace = chatSpace;
        newChatSpace.push(userDialog);
        setChatSpace(newChatSpace);

        const resultFacts = await searchFact(msg); // []
        // เอา resultFacts ยัดลงใน state.bb
        if(resultFacts.length > 0) {
            setState(prev => {
                const newBB = [...prev.bb,...resultFacts];
                prev.bb = newBB;
                return {...prev}
            })
        }
        // const resultState = await sendState(state)
        // setState(resultState);

        // ปิดไม่ให้ใช้ ChatBar
        setMsgSend(true);
        // เริ่มระบบ Inferance Engine
        startEngine(state);
    }

    const startEngine = async (input_state: ChatState) => {
        // ส่ง state ไปให้ infer_engine
        // รอรับ
        const resultState = await sendState(input_state)
        setState(resultState);
        console.log(resultState)

        // ถ้ามี result ให้สร้าง BotDialog ตอบคำถาม ไปยัง chatSpace
        if(resultState.result === null || resultState.result.length > 0) {
            const newChatSpace = chatSpace;
            // ถ้า result === null ให้สร้าง BotDialog บอกว่าไม่ฒีคำตอบและแสดงผลลัพธ์
            if(resultState.result === null) {
                newChatSpace.push(<BotDialog key={Date.now()} result={resultState.result} msg={'ไม่มีคำตอบ เพราะ...'} state={resultState}/>)
                setChatSpace(newChatSpace);

            }
            if(resultState.result && resultState.result.length > 0) {

                newChatSpace.push(<BotDialog key={Date.now()} result={resultState.result} state={resultState} msg={'ได้คำตอบแล้ว!'}/>)
                setChatSpace(newChatSpace);

            }
            // จบการทำงาน ปิด Load เริ่มใหม่
            
            resetState(); // Clear State ให้เป็นค่า default
            setMsgSend(false); // เปิด ChatBar ให้ถามใหม่
            return; // จบการทำงาน
        }

        // ถ้ามี query ให้สร้าง UserQueryDialog ไปยัง chatSpace
        if(resultState.query.length > 0) {
            const newChatSpace = chatSpace;
            newChatSpace.push(<UserQueryDialog key={Date.now()} query={resultState.query} onFinish={startEngine} state={state}/>);
            setChatSpace(newChatSpace);
        }
    }

  return (
    <div className="h-[calc(100vh-10rem)]">
        <Container ref={chatView} className=" flex flex-col gap-4 overflow-auto h-full py-4">
            {chatSpace}
        </Container>
        <ChatBar disable={msgSend} onSend={handleSendMsg}/>
      </div>
  )
}

export default ChatBox