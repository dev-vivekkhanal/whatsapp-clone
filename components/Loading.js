import Head from "next/head";

function Loading() {
  return (
    <>
      <Head>
        <title>Whatsapp Clone</title>
        <link rel="icon" href="/Whatsapp.png" />
      </Head>
      <div className="bg-[#111b21] text-white h-screen w-full grid place-items-center">
        {/* <TailSpin color="#22c55e" height={80} width={80} /> */}
        <div className="border-[#22c55e] animate-spin inline-block w-[50px] h-[50px] border-4 rounded-full">
          <div className="text-[#111b21] rounded-full bg-[#111b21] w-[30px] h-[20px]  rotate-45 "></div>
        </div>
      </div>
    </>
  );
}

export default Loading;
