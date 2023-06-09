"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Profile = (ctx) => {
  const [user, setUser] = useState("");

  const { data: session } = useSession();

  const router = useRouter();

  console.log(ctx.params.id);
  console.log(user);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(
        `http://localhost:3000/api/profile/${ctx.params.id}`,
        { cache: "no-store" }
      );
      const user = await res.json();

      setUser(user);
    }
    fetchUser();

    console.log(user);
  }, []);

  const handleSignOut = async (event) => {
    event.preventDefault();

    await signOut({ redirect: false });

    router.push("/");
  };

  return (
    <div>
      <div>user: {user?.email}</div>
      <Link href="/">
        <button onClick={handleSignOut}>logout</button>
      </Link>
    </div>
  );
};

export default Profile;
