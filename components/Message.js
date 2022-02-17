import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage =
    user === userLoggedIn.email
      ? "ml-auto bg-[#005c4b] "
      : "mr-auto bg-[#202c33]";

  return (
    <div className="w-[90%] mx-auto ">
      <div
        className={`text-xs sm:text-base   max-w-[50%] min-w-[10%] w-fit my-1 rounded-md ${TypeOfMessage} `}
      >
        <p className="p-2 pb-0 ">{message.message}</p>

        <span className="text-[11px] lowercase text-gray-300 block text-right px-1">
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </span>
      </div>
    </div>
  );
}

export default Message;
