import { redirect } from "next/navigation";

export const metadata = {
  title: "Story",
};

export default function AboutRedirect() {
  redirect("/story");
}
