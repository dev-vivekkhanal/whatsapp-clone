import Head from "next/head";
import { TailSpin } from "react-loader-spinner";

function Loading() {
  return (
    <>
      <Head>
        <title>Whatsapp Clone</title>
        <link rel="icon" href="/Whatsapp.png" />
      </Head>
      <div className="bg-[#111b21] text-white h-screen w-full grid place-items-center">
        <TailSpin color="#22c55e" height={80} width={80} />
      </div>
    </>
  );
}

export default Loading;
