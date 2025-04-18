"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../config/authOptions";

//don't use reexport, its only server func, can be problem in client
export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  return session?.user ?? null;
};
