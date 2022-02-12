import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import Message from "./Message";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const endOfMessagesRef = useRef(null);
  const [input, setInput] = useState("");
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const ScrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    ScrollToBottom();
    setInput("");
  };

  return (
    <>
      <div className="h-[90%] overflow-y-scroll scrollbar-hide pt-5">
        {showMessages()}
        <div ref={endOfMessagesRef} className="h-[100px] w-[10px]"></div>
      </div>
      <div className="h-[10%] flex items-end">
        <form className="space-x-5 p-3 bg-[#202c33] w-full flex items-center z-50  bottom-0 ">
          <InsertEmoticonIcon className="text-gray-400 cursor-pointer" />
          <AttachFileIcon className="text-gray-400 rotate-45 cursor-pointer " />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
            className="text-base p-2 px-4 rounded-md flex-1 outline-none border-0 bg-[#2a3942]"
          />
          {input ? (
            <button disabled={!input} type="submit" onClick={sendMessage}>
              <SendIcon className="text-gray-400 cursor-pointer" />
            </button>
          ) : (
            <MicIcon className="text-gray-400 cursor-pointer" />
          )}
        </form>
      </div>
    </>
  );
}

export default ChatScreen;
