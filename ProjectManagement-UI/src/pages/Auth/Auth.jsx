import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { Button } from "@/components/ui/button";
import "./Auth.css";

const Auth = () => {
  const [active, setActive] = useState(true);
  return (
    <div className="loginContainer">
      <div className="box h-[30rem] w-[25rem]">
        <div className=" login">
          <div className="loginBox w-full px-10 space-y-5">
            {active ? <Signup /> : <Login />}
            {active ? (
              <div>
                <span>Already have an account?</span>
                <Button variant="ghost" onClick={() => setActive(false)}>
                  Login
                </Button>
              </div>
            ) : (
              <div>
                <span>Don't have an account?</span>
                <Button variant="ghost" onClick={() => setActive(true)}>
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
