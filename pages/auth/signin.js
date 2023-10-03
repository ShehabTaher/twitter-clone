import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db } from "../../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
const Signin = () => {
  const router = useRouter();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const user = auth.currentUser.providerData[0];
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          username: user.displayName.split(" ").join("").toLocaleLowerCase(),
          userImg: user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
        });
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-20 space-x-4">
      <div className="flex flex-col items-center">
        <img
          className="w-36 object-cover"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png"
          alt="twitter-logo"
          width="300"
        />
        <p className="text-center text-sm italic my-10">
          This app is created by learning purposes
        </p>
        <button
          onClick={onGoogleClick}
          className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Signin;
