import { ChatState } from '@/lib/ChatStatusT'
import { Fact } from '@/pages/facts'
import React from 'react'
import { SiProbot } from 'react-icons/si'
import { useTypewriter, Typewriter } from 'react-simple-typewriter'

type Props = {
  msg?: string,
  result?: Fact[]|null,
  state?: ChatState,
  pull?: Function
}

const defaultMsg = 'No content ...';

function BotDialog({result,msg=defaultMsg,state,pull}: Props) {
  const [text] = useTypewriter({
    words:[msg],
    typeSpeed: 30
  })
  

  let msgDetail: JSX.Element[] = [];
  if(result === null && state){
    // console.log('isNull')
    msgDetail.push(<strong key={Date.now()}>
      <Typewriter words={['คุณตอบ']}/>
    </strong>)
    state.save_query.forEach((fact) => {
      msgDetail.push(<p key={fact.id}><Typewriter typeSpeed={200} words={[`🔻${fact.label} -${'>'} FALSE (${fact.fact? fact.fact:'No description'})`]}/></p>)
    })
    msgDetail.push(<strong key={Date.now() + 1000}><Typewriter words={['BB Pool']}/></strong>)
    {state.bb.length > 0? state.bb.forEach((fact) => {
      msgDetail.push(<p key={fact.id + 'bb'}><Typewriter typeSpeed={200} words={[`🔹${fact.label} (${fact.fact? fact.fact:'No description'})`]}/></p>)
    }): msgDetail.push(<p><Typewriter typeSpeed={200} words={['❌No fact .......']}/></p>)}
    msgDetail.push(<strong key={Date.now() + 2000}><Typewriter words={['ทำให้']}/></strong>)
    state.concludNode.forEach((fact) => {
      msgDetail.push(<p key={fact.id + 'con'}><Typewriter typeSpeed={200} words={[`🔸${fact.label} -${'>'} FALSE (${fact.fact? fact.fact:'No description'})`]}/></p>)
    })
  }
  if(result && state) {
    // console.log('OK')
    msgDetail.push(<strong key={Date.now()}><Typewriter words={['BB Pool']}/></strong>)
    state.bb.forEach((fact) => {
      msgDetail.push(<p key={fact.id + 'bb'}><Typewriter typeSpeed={200} words={[`🔹${fact.label} (${fact.fact? fact.fact:'No description'})`]}/></p>)
    })
    msgDetail.push(<strong key={Date.now() + 1000}><Typewriter words={['คำตอบคือ..']}/></strong>)
    result.forEach((fact) => {
      msgDetail.push(<p key={fact.id + 'con'}><Typewriter typeSpeed={200} words={[`🔸${fact.label} -${'>'} TRUE (${fact.fact? fact.fact:'No description'})`]}/></p>)
    })
  }

  return (
    <div className="flex pl-4 items-center">
            <div className="self-start rounded-full mr-4 bg-green-800 p-3">
              <SiProbot size={20} />
            </div>
            <div className="bg-[#D9D9D9] shadow-md shadow-white/30 max-w-[60%] px-4 py-2 rounded-xl text-black">
              <span className="break-words">
                {text}
              </span>
              <div className="break-words">
                {msgDetail}
              </div>
            </div>
          </div>
  )
}

export default BotDialog