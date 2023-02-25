import {useState, useEffect} from 'react'
import { SiProbot } from 'react-icons/si'
import type { Fact } from '@/pages/facts'
import type { ChatState } from '@/lib/ChatStatusT'
import { Typewriter } from 'react-simple-typewriter'

type Props = {
  query: Fact[],
  onFinish: (input_state: ChatState) => Promise<void>,
  state: ChatState,
}

function UserQueryDialog({query, onFinish, state}:Props) {
  const [questions, setQuestions] = useState<Fact[]>(query);
  const [ask, setAsk] = useState<Fact>(questions[0]);
  const [payload, setPayload] = useState<ChatState>(state);
  const [end,setEnd] = useState(false)
  const [finalBool, setFinalBool] = useState({
    true: false,
    false: false,
  })

  const handleSendQuery = () => {
    // ใช้ onFinish
    onFinish(payload);
    setEnd(true)
  }

  const onTRUE = () => {
    if(questions.length > 1) {
      // Add Fact เข้า bb
      const newPayload = payload;
      newPayload.bb.push(ask)
      // นำ Question ออกมา
      const newQuestion = questions;
      newQuestion.shift();

      setPayload(newPayload);
      setQuestions(newQuestion)
      setAsk(questions[0]);
      return;
    }
    // ถ้าเหลือคำถามเดียว
    // ส่ง Query เข้า ChatStateใหม่ ออกไป
    if(questions.length === 1) {
      const newPayload = payload;
      newPayload.bb.push(ask)
      setPayload(newPayload);
      setFinalBool(prev => {
        prev.true = true
        return {...prev}
      })
      handleSendQuery();
    }
    
  }

  const onFALSE = () => {
    if(questions.length > 1) {
      // Add Fact เข้า bb
      const newPayload = payload;
      newPayload.save_query.push(ask)
      // นำ Question ออกมา
      const newQuestion = questions;
      newQuestion.shift();

      setPayload(newPayload);
      setQuestions(newQuestion)
      setAsk(questions[0]);
      return;
    }
    // ถ้าเหลือคำถามเดียว
    // ส่ง Query เข้า ChatStateใหม่ ออกไป
    if(questions.length === 1) {
      const newPayload = payload;
      newPayload.save_query.push(ask)
      setPayload(newPayload);
      setFinalBool(prev => {
        prev.false = true
        return {...prev}
      })
      handleSendQuery();
    }
  }


  return (
    <div className="flex pl-4 items-center">
            <div className="self-start rounded-full mr-4 bg-green-800 p-3">
              <SiProbot size={20} />
            </div>
            <div className="bg-[#D9D9D9] shadow-md shadow-white/30 max-w-[60%] rounded-xl text-black overflow-hidden">
              <div className="px-4 py-2">
                <span className="break-words">
                  <strong><Typewriter typeSpeed={30} words={[`Question --> ${ask.label}: ${ask.fact? ask.fact:'\'-\''}❓`]}/></strong>
                </span>
              </div>
              <div className="flex">
                <button disabled={end} onClick={() => onTRUE()} className={`${end? 'bg-gray-700':'bg-green-600 hover:bg-green-700 cursor-pointer'} ${finalBool.true?'bg-green-700':''} text-white flex-1 text-center font-bold text-sm py-3 duration-300`}>
                  TRUE
                </button>
                <button disabled={end} onClick={() => onFALSE()} className={`${end? 'bg-gray-700':'bg-red-600 hover:bg-red-700 cursor-pointer'} ${finalBool.false?'bg-red-700':''} text-white flex-1 text-center font-bold text-sm py-3 duration-300`}>
                  FALSE
                </button>
              </div>
            </div>
          </div>
  )
}

export default UserQueryDialog