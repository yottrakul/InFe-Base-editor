import { ChatState } from '@/lib/ChatStatusT'
import { Fact } from '@/pages/facts'
import React from 'react'
import { SiProbot } from 'react-icons/si'

type Props = {
  msg?: string,
  result?: Fact[]|null,
  state?: ChatState
}

const defaultMsg = 'No content ...';

function BotDialog({result,msg=defaultMsg,state}: Props) {
  let msgDetail: JSX.Element[] = [];
  console.log(result)
  if(result === null && state){
    console.log('isNull')
    msgDetail.push(<strong key={Date.now()}>คุณตอบ</strong>)
    state.save_query.forEach((fact) => {
      msgDetail.push(<p key={fact.label}>{fact.label} -{'>'} <strong className='text-red-500'>FALSE</strong></p>)
    })
    msgDetail.push(<strong key={Date.now() + 1000}>ทำให้</strong>)
    state.concludNode.forEach((fact) => {
      msgDetail.push(<p key={fact.label}>{fact.label} -{'>'} <strong className='text-red-500'>FALSE</strong></p>)
    })
  }
  if(result && state) {
    console.log('OK')
    msgDetail.push(<strong key={Date.now()}>BB Pool:</strong>)
    state.bb.forEach((fact) => {
      msgDetail.push(<p key={fact.id}><strong>{fact.label}</strong> -{'>'} <strong className='text-green-500'>TRUE</strong></p>)
    })
    msgDetail.push(<strong key={Date.now() + 1000}>ทำให้</strong>)
    result.forEach((fact) => {
      msgDetail.push(<p key={fact.id + 'con'}><strong>{fact.label}</strong> -{'>'} <strong className='text-green-500'>TRUE</strong></p>)
    })
  }
  return (
    <div className="flex pl-4 items-center">
            <div className="self-start rounded-full mr-4 bg-green-800 p-3">
              <SiProbot size={20} />
            </div>
            <div className="bg-[#D9D9D9] shadow-md shadow-white/30 max-w-[60%] px-4 py-2 rounded-xl text-black">
              <span className="break-words">
                {msg}
              </span>
              <div className="break-words">
                {msgDetail}
              </div>
            </div>
          </div>
  )
}

export default BotDialog