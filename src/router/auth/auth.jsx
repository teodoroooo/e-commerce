import { SignIn } from "../../components/sing-in/sign-in";
import { SignUp } from "../../components/sing-up/sign-up";
import './auth.scss'

export function Auth() {
  return (
    <div className="container-auth">
      <SignIn />
      <SignUp />
    </div>
  )
}