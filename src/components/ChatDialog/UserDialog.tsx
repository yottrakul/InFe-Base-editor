import React from 'react'
import { FaUser } from 'react-icons/fa'

function UserDialog() {
  return (
    <div className="flex justify-end pr-4 items-center">
            <div className="bg-[#D9D9D9] shadow-md shadow-white/30 max-w-[60%] px-4 py-2 rounded-xl text-black">
              <span className="break-words">To days have a rain</span>
            </div>
            <div className="self-start rounded-full ml-4 bg-slate-700 p-3">
              <FaUser size={20} />
            </div>
          </div>
  )
}

export default UserDialog