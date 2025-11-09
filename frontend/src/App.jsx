import ChangePassword from "./components/AuthComponents/ChangePassword";
import ForgetPassword from "./components/AuthComponents/forgetPassword";
import Login from "./components/AuthComponents/Login";
import Register from "./components/AuthComponents/Register";

export default function App() {
  return (
    <>
      <Login />
      <Register />
      <ForgetPassword />
      <ChangePassword />
    </>
  );
}
