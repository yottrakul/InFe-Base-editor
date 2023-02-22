import React from 'react'
import { SiProbot } from 'react-icons/si'

function BotDialog() {
  return (
    <div className="flex pl-4 items-center">
            <div className="self-start rounded-full mr-4 bg-green-800 p-3">
              <SiProbot size={20} />
            </div>
            <div className="bg-[#D9D9D9] shadow-md shadow-white/30 max-w-[60%] px-4 py-2 rounded-xl text-black">
              <span className="break-words">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                mattis mattis maximus. Sed eget porta sem. Maecenas quis cursus
                magna, nec facilisis est. Vestibulum vehicula sed ligula id
                fringilla. Praesent bibendum accumsan velit rutrum vehicula. In
                faucibus tortor ac diam dapibus vestibulum. Quisque odio risus,
                tristique
              </span>
            </div>
          </div>
  )
}

export default BotDialog