import { getProviders, signIn } from "next-auth/react";

const signin = ({ providers }) => {
  return (
    <div className="flex justify-center mt-20 space-x-4">
      {Object.values(providers).map((provider) => (
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
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
