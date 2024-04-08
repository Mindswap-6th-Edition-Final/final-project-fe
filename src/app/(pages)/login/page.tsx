"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SessionWrapper from "../../../components/ui/session-wrapper";

function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
  }

  {
    return session ? null : (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <button
          className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2"
          onClick={() => signIn("cognito")}
        >
          Cognito
        </button>
      </div>
    );
  }
}
const LoginWithSession = () => {
  return (
    <SessionWrapper>
      <Login />
    </SessionWrapper>
  );
};

export default LoginWithSession;
