import { Avatar, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { stringAvatar } from "../../utils/stringAvatar";
import TimeAgo from "timeago-react";
import { useRecoilState } from "recoil";
import { sidebarState } from "../../atoms/sidebarStatusAtom";

function Chat({ chat, messages }) {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarState);
  const [user] = useAuthState(auth);

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  console.log("this is chat:", chat);
  console.log("this is messages:", messages);
  console.log("this is recipientEmail:", recipientEmail);

  return (
    <>
      <Head>
        <title>Whatsapp Clone</title>
        <link rel="icon" href="/Whatsapp.png" />
      </Head>
      <section className="flex justify-center items-center bg-[#0a1014] h-screen  ">
        <div className="h-screen w-full md:h-[90%] md:w-[95%]  max-w-[1500px]  flex drop-shadow-2xl shadow-white">
          <div
            className={` ${
              isSidebarOpen ? "flex-1" : "flex-[0] hidden"
            } sm:block sm:flex-[0.3] h-full  border-r-[1px] border-gray-700`}
          >
            <Sidebar />
          </div>

          <div
            className={` ${
              isSidebarOpen ? "hidden" : "flex-1"
            }  sm:block sm:flex-[0.7]`}
          >
            <div className="flex w-full space-x-3 md:space-x-5 md:p-2 h-[10%] items-center text-gray-300 bg-[#202c33] sticky top-0 z-50">
              <ArrowBackIcon
                fontSize="small"
                onClick={() => setIsSidebarOpen(true)}
              />
              <Avatar
                {...stringAvatar(recipientEmail)}
                className="uppercase py-5 break-words"
              />
              <div className="w-full">
                <h1 className="text-base md:text-lg text-gray-100">
                  {recipientEmail}
                </h1>
                {recipientSnapshot ? (
                  <p className="text-xs">
                    Last active:{` `}
                    {recipient?.lastSeen?.toDate() ? (
                      <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                    ) : (
                      "Unavailable"
                    )}
                  </p>
                ) : (
                  <p className="text-xs ">
                    Loading Last active{" "}
                    <span className="animate-pulse">...</span>{" "}
                  </p>
                )}
              </div>
              <div className="justify-self-end flex">
                <IconButton aria-label="contacts">
                  <SearchIcon className="text-gray-400 active:text-gray-300 transition-all" />
                </IconButton>
                <IconButton aria-label="options">
                  <MoreVertIcon className="text-gray-400 active:text-gray-300 transition-all" />
                </IconButton>
              </div>
            </div>
            <div className="h-[90%] bg-[url('/chatBg.png')]   ">
              <div className=" h-full text-white bg-[#00000065]">
                <ChatScreen chat={chat} messages={messages} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Chat;

//Server-Side-Rendering
export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  // Prep the Messages...
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  // Prep the Chats...
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
