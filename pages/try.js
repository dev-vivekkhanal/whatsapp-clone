import { auth } from "../firebase";

export default function Try() {
  return (
    <div>
      <h1 className="text-9xl">This is try page</h1>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}
