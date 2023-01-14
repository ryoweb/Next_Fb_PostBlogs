import Button from "../components/button";
import { login, logout } from "../lib/auth";

const loginPage = () => {
  return (
    <>
      <div>loginPage</div>
      <Button type="button" onClick={login}>
        login
      </Button>

      <Button type="button" onClick={logout}>
        logout
      </Button>
    </>
  );
};

export default loginPage;
