import Container from "@/UI/Container";
import Head from "next/head";
import { SiProbot } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { BiPaperPlane } from "react-icons/bi";

export default function Home() {

  return (
    <>
      <Head>
        <title>InFe | Chat</title>
      </Head>
      <div className="h-[calc(100vh-10rem)]">
        <Container className=" flex flex-col gap-4 overflow-auto h-full py-4">
          <div className="flex justify-end pr-4 items-center">
            <div className="bg-[#D9D9D9] shadow-md shadow-white/30 max-w-[60%] px-4 py-2 rounded-xl text-black">
              <span className="break-words">To days have a rain</span>
            </div>
            <div className="self-start rounded-full ml-4 bg-slate-700 p-3">
              <FaUser size={20} />
            </div>
          </div>

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
        </Container>
        <Container>
          <div className="flex px-2 gap-2">
            <input className="bg-[#D9D9D9] rounded-3xl text-black text-lg flex-1" />
            <div className="bg-[#D9D9D9] text-black rounded-full w-fit h-fit p-2.5">
              <BiPaperPlane size={30}/>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
