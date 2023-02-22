import Head from "next/head";
import ChatBox from "@/components/ChatBox";

export default function Home() {

  return (
    <>
      <Head>
        <title>InFe | Chat</title>
      </Head>
      <ChatBox/>
    </>
  );
}
