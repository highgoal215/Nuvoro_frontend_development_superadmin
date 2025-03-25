"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Link } from "@heroui/link";
import { Image } from "@heroui/image";
import { cn } from "@heroui/theme";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";

import MyInput from "@/components/my-input";
import Logo from "@/assets/svg/logo.svg";
import AdminLoginImage from "@/assets/svg/admin-login.svg";

export default function SuperAdminPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code2FA, setCode2FA] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login - Replace with actual authentication
    if (email && password) {
      router.push("/dashboard");
      console.log("success!");
    } else {
      console.log("failed!");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Login Form Section */}
        <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-8">
            <div className="flex flex-col  items-center gap-2 mb-8">
              <div className="flex w-full h-full justify-center">
                <Image src={Logo.src} className="w-full h-14" alt="logo" />
              </div>
              <h1 className="text-2xl font-Roboto font-bold text-[#000000]">
                Nuvoro Super Admin Portal
              </h1>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-black font-Roboto">
                  Email Address
                </label>
                <MyInput
                  id="email"
                  classNames={{
                    innerWrapper: cn("pl-8"),
                  }}
                  type="email"
                  placeholder="Enter your email"
                  variant="bordered"
                  radius="none"
                  value={email}
                  startContent={
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  }
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-black font-Roboto">
                  Password
                </label>
                <MyInput
                  id="password"
                  classNames={{
                    innerWrapper: cn("pl-8"),
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  variant="bordered"
                  radius="none"
                  value={password}
                  startContent={
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  }
                  endContent={
                    <button
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  }
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="2fa" className="text-black font-Roboto">
                  2FA Code
                </label>
                <MyInput
                  id="2fa"
                  classNames={{
                    innerWrapper: cn("pl-8"),
                  }}
                  type="text"
                  placeholder="Enter the code from your authenticator app"
                  variant="bordered"
                  radius="none"
                  value={code2FA}
                  startContent={
                    <Shield className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  }
                  onChange={(e) => setCode2FA(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-black text-sm font-Roboto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href="#"
                  className="text-[14px] font-medium font-Roboto text-[#000000] hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                className="w-full bg-black text-white hover:bg-gray-900"
                onClick={handleSubmit}
              >
                Log in
              </Button>
            </form>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="hidden lg:block w-1/2 bg-[#4A6FA5] ">
          <div className="h-full w-full relative">
            <Image
              src={AdminLoginImage.src}
              className="w-full h-full object-cover"
              alt="admin-login"
              removeWrapper
            />
          </div>
        </div>
      </div>
    </div>
  );
}
