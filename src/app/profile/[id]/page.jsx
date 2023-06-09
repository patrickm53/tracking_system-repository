"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Profile = (ctx) => {
  const [user, setUser] = useState("");

  const { data: session } = useSession();

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

  return <div>user: {user?.email}</div>;
};

export default Profile;
