import Head from "next/head";
import Sidebar from "../components/Sidebar";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";

export default function Home() {
  return (
    <div className="bg-[#140d0a]">
      <Head>
        <title>Whatsapp Clone</title>
        <meta
          name="description"
          content="Whatsapp Clone made by Vivek Khanal"
        />
        <link rel="icon" href="/Whatsapp.png" />
      </Head>
      <section className="flex justify-center items-center bg-[#0a1014] h-screen  ">
        <div className="h-screen w-full md:h-[90%] md:w-[95%] max-w-[1500px]  flex drop-shadow-2xl shadow-white">
          <div className="flex-1  sm:flex-[0.3] h-full  border-r-[1px] border-gray-700">
            <Sidebar />
          </div>

          <div className=" hidden  flex-[0.7] h-full bg-[#202c33] border-b-[6px] border-[#008069] sm:flex justify-center items-center">
            <div className="max-w-[560px]  text-center">
              <img
                src="chat-base-bg.png"
                alt="whatsapp connectivity"
                className="max-w-[350px] mx-auto mb-[40px]"
              />
              <h1 className="text-4xl text-gray-300 font-light mb-[20px]">
                Keep your phone connected
              </h1>
              <p className="text-sm text-[#74838c] pb-[40px] border-b border-gray-700 ">
                WhatsApp connects to your phone to sync messages. To reduce data
                usage, connect your phone to Wi-Fi.
              </p>
              <p className="mt-[30px] text-[#74838c] text-sm ">
                <LaptopMacIcon
                  fontSize="small"
                  className="text-[#74838c] mr-2"
                />
                Make calls from dextop with WhatsApp for Windows.{" "}
                <span className="text-[#059779] cursor-pointer">
                  Get it here
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
