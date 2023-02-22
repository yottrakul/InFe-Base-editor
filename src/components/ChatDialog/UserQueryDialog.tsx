import React from 'react'
import { SiProbot } from 'react-icons/si'

function UserQueryDialog() {
  return (
    <div className="flex pl-4 items-center">
            <div className="self-start rounded-full mr-4 bg-green-800 p-3">
              <SiProbot size={20} />
            </div>
            <div className="bg-[#D9D9D9] shadow-md shadow-white/30 max-w-[60%] rounded-xl text-black overflow-hidden">
              <div className="px-4 py-2">
                <span className="break-words">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris
                </span>
              </div>
              <div className="flex">
                <div className="bg-green-600 text-white flex-1 text-center font-bold text-sm py-3 cursor-pointer hover:bg-green-700 duration-300">
                  TRUE
                </div>
                <div className="bg-red-600 text-white flex-1 text-center font-bold text-sm py-3 cursor-pointer hover:bg-red-700 duration-300">
                  FALSE
                </div>
              </div>
            </div>
          </div>
  )
}

export default UserQueryDialog