import LoginForm from "@/components/page/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
