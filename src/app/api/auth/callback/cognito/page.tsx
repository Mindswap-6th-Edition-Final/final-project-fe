"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
function Redirect() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if(status === "loading") return;
    console.log(session);
    const verifyUser = async () => {
      const response = await fetch(
        "http://localhost:8080/api/v1/persons/email/" + session?.user?.email
      );
      response.status === 200
        ? router.push("/dashboard")
        : router.push("/register");
    };
    verifyUser();
  }, [session, status]);
}

export default Redirect;
