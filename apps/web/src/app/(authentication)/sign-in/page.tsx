import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SignInForm from "../_components/forms/sign-in";

export default function SignIn() {
  return (
    <main className="flex flex-col w-full max-w-[320px] mx-auto">
      <Link className="py-5" href={"/"}></Link>
      <SignInForm />
      <div className="py-5 flex flex-col justify-start items-start">
        <div className="flex text-gray-950/50 space-x-2 text-sm flex-row justify-start items-center">
          {"Don't"} have an account ?
          <Link href={"/sign-up"} className="text-black px-2 flex">
            Create one here <ArrowRight size={20} />
          </Link>
        </div>
        <p className="text-sm text-gray-950/50 py-2">
          By using the platform, you agree to our{" "}
          <Link href="/terms" className="text-black">
            Terms and services
          </Link>{" "}
          and{" "}
          <Link href="/terms#privacy" className="text-sm text-black">
            Privacy policy
          </Link>
        </p>
      </div>
    </main>
  );
}
