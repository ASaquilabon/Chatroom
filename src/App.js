import "./App.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDDTnmjtEII7JvivBvLEAdDGHvA1ZjB1OA",
  authDomain: "chatroom-eb78f.firebaseapp.com",
  projectId: "chatroom-eb78f",
  storageBucket: "chatroom-eb78f.appspot.com",
  messagingSenderId: "741499603831",
  appId: "1:741499603831:web:6ca28a79cf3be30f892f72",
  measurementId: "G-L1CTJRBYQY",
});

const [user] = useAuthState(auth);

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <section>{user ? <Chatroom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && (
      <button onClick={() => auth.signOut()}> Sign Out</button>
    )
  );
}
function ChatRoom() {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(50);
  const [messages] = useCollectionData(query, { idField: "id" });
  return (
    <>
      <div>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>
    </>
  );
}
export default App;
