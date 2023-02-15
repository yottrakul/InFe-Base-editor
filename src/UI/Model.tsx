import React from "react";
import {RxCross1} from "react-icons/rx"

type Props = {
    title?: string,
    confirm_msg?: string
    body?: JSX.Element,
    confirm?: Function,
    onClose: Function
}

export default function Modal({body, title, confirm_msg, confirm, onClose}:Props) {

  return (
    <>
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#202123] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex justify-between p-5 border-b border-solid border-slate-200 rounded-t items-center">
                  <h3 className="text-3xl font-semibold text-white">
                    {title? title:'Alert'}
                  </h3>
                  <div>
                    <RxCross1 onClick={() => onClose(false)} className="text-white cursor-pointer" size={25}/>
                  </div>
                  
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto text-black">
                  {body}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <div
                    className="text-red-500 cursor-pointer background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => onClose(false)}
                  >
                    Close
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        onClose(false); 
                        if(confirm){
                            confirm();
                        }
                    }}
                  >
                    { confirm_msg? confirm_msg:'Save Changes' }
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div onClick={() => onClose(false)} className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    </>
  );
}