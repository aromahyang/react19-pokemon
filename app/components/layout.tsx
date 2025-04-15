import { Link, Outlet } from "react-router";
import { Button } from "./ui";

export default function Layout() {
  return (
    <div>
      <div>
        <Button>
          <Link to="/">뒤로가기</Link>
        </Button>
      </div>
      <Outlet />
    </div>
  );
}
