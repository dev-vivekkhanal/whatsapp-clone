import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import { stringAvatar } from "../utils/stringAvatar";
import moment from "moment";
import { useRecoilState } from "recoil";
import { sidebarState } from "../atoms/sidebarStatusAtom";

function Chat({ id, users }) {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarState);
  const router = useRouter();
  const [user] = useAuthState(auth);

  const recipientEmail = getRecipientEmail(users, user);

  // when clicked on an user this function will be called
  const enterChat = () => {
    router.push(`/chat/${id}`);
    setIsSidebarOpen(false);
  };

  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const lastMessage =
    messagesSnapshot?.docs[messagesSnapshot?.docs?.length - 1]?.data().message;

  const lastTimeStamp = messagesSnapshot?.docs[
    messagesSnapshot?.docs?.length - 1
  ]
    ?.data()
    .timestamp?.toDate()
    .getTime();

  const formatedLastTimeStamp = lastTimeStamp
    ? moment(lastTimeStamp).format("LT")
    : "";

  //   truncating string if it contains more then desired no. of characters
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + ". . ." : string;
  }

  return (
    <div
      onClick={enterChat}
      className="bg-[#111b21] text-gray-400 flex items-center pl-5 pr-2 space-x-5 w-full hover:bg-[#202c33] cursor-pointer transition-all"
    >
      <Avatar
        {...stringAvatar(recipientEmail)}
        className="uppercase py-5 break-words"
      />
      <div className="w-full  py-5 pr-3 border-b-2 border-gray-800">
        <div className="flex justify-between items-center">
          <h1 className="text-gray-100 text-lg font-light capitalize">
            {recipientEmail.substring(0, recipientEmail.lastIndexOf("@"))}
          </h1>
          <p className="text-xs lowercase font-light ml-2">
            {formatedLastTimeStamp}
          </p>
        </div>
        <p className="text-sm font-light xl:hidden">
          {truncate(lastMessage, 29)}
        </p>
        <p className="text-sm font-light hidden xl:block 2xl:hidden ">
          {truncate(lastMessage, 40)}
        </p>
        <p className="text-sm font-light hidden 2xl:block">
          {truncate(lastMessage, 50)}
        </p>
      </div>
    </div>
  );
}

export default Chat;
