import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  MenuItem,
  Modal,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import * as EmailValidator from "email-validator";
import { Logout } from "@mui/icons-material";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import { stringAvatar } from "../utils/stringAvatar";

function Sidebar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const chatEmailRef = useRef(null);

  const router = useRouter();
  const [user] = useAuthState(auth);

  // using firebase hooks to query realtime data in db
  const userChatsRef = db
    .collection("chats")
    .where("users", "array-contains", user?.email);
  const [chatsSnapshot] = useCollection(userChatsRef);

  //   open options menu feature
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOptionOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOptionClose = () => {
    setAnchorEl(null);
  };

  //   signout
  const handleSignOut = () => {
    auth.signOut();
  };

  const handleOpen = () => setModalIsOpen(true);
  const handleClose = () => setModalIsOpen(false);

  const createChat = (e) => {
    e.preventDefault();
    handleClose();
    const inputEmail = chatEmailRef.current.value;
    const isValidEmail = EmailValidator.validate(inputEmail);

    if (inputEmail == false) return;
    if (
      isValidEmail &&
      !chatAlreadyExist(inputEmail) &&
      inputEmail !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, inputEmail],
      });
    }
  };

  //  * the '!!' converts output to truthy or falsy (boolean)
  const chatAlreadyExist = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <>
      <div className=" bg-[#111b21] h-[100%] overflow-y-scroll scrollbar-hide">
        <div className="sticky top-0 z-50 ">
          <div className="flex  bg-[#202c33] justify-between items-center p-[15px] h-[80px]">
            <Avatar {...stringAvatar(user.email)} className="uppercase" />
            <div>
              <IconButton aria-label="contacts">
                <ChatIcon className="text-gray-400 active:text-gray-300 transition-all" />
              </IconButton>
              <IconButton aria-label="options" onClick={handleOptionOpen}>
                <MoreVertIcon className="text-gray-400 active:text-gray-300 transition-all" />
              </IconButton>
            </div>
          </div>
          <div className="bg-[#111b21] px-5 py-2 border-b-2 border-gray-800">
            <div className="flex items-center rounded p-2 px-5 text-sm text-gray-400 bg-[#202c33]">
              <SearchIcon fontSize="small" />
              <input
                className="outline-none border-0 flex-1 ml-5  bg-transparent"
                placeholder="Search in chats"
                type="text"
              />
            </div>
            <button
              className="text-black uppercase p-2 bg-gray-300 rounded hover:bg-gray-200 transition-all my-2 text-center mx-auto w-full"
              onClick={handleOpen}
            >
              Start a new chat
            </button>
            <Modal
              open={modalIsOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="absolute flex justify-center items-center  -translate-x-[50%] -translate-y-[50%] left-[50%] top-[50%]   bg-[#111b21] text-gray-200 p-10 rounded-md">
                <form>
                  <h1 className="">
                    Please enter an email address of the user you wish to chat
                    with :
                  </h1>
                  <input
                    ref={chatEmailRef}
                    className="outline-none border-0  my-5 bg-[#202c33] p-2 px-3 w-full"
                    placeholder="Email"
                    type="text"
                  />
                  <button
                    type="submit"
                    onClick={createChat}
                    className="p-2 bg-[#005c4b] rounded"
                  >
                    Submit / Press Enter
                  </button>
                </form>
              </div>
            </Modal>
          </div>
        </div>

        <div className="  ">
          {chatsSnapshot?.docs.map((chat) => (
            <Chat key={chat.id} id={chat.id} users={chat.data().users} />
          ))}
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleOptionClose}
        onClick={handleOptionClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" className="text-black" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default Sidebar;
