import { WHInput } from "@/components/composed/WHInput";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Logo from "@/assets/images/logo.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsLoading(true);
  };

  return (
    <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-blue-50 to-indigo-100 fixed inset-0">
      <div className="hidden md:flex items-center justify-center bg-red-200 h-screen">
        <img src={Logo} alt="logo" className="h-screen w-screen object-cover" />
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Good Warehouse
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <WHInput
              label="Username"
              placeholder="Masukan Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <WHInput
              label="Password"
              type="password"
              placeholder="Masukan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>

            <Button className="w-full !py-5">Sign in</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
