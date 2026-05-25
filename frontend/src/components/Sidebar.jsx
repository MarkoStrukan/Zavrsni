import { useLocation, Link } from "react-router"
import useAuthUser from "../hooks/useAuthUser"
import { BellIcon, HomeIcon, ShipWheelIcon, UserIcon } from "lucide-react"

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-base-300 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-4 border-base-200 border-b">
        <Link to="/" className="flex items-center gap-2.5">
          <ShipWheelIcon className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            TalkNest
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-5 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-6 text-base-content opacity-60" />
          <span>Home</span>
        </Link>

        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <UserIcon className="size-6 text-base-content opacity-60" />
          <span>Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-6 text-base-content opacity-60" />
          <span>Notifications</span>
        </Link>
      </nav>

      
      <div className="p-4 border-base-200 mt-auto">
          <div className="flex items-center gap-4">
              <div className="avatar">
                <div>
                  <img src={authUser?.profilePic} alt="avatar" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{authUser?.fullName}</p>
                  <p className="text-xs text-success flex items-center" >
                  <span className="size-3 rounded-full bg-success inline-block" />
                   Online
                  </p>
                </div>
              </div>
          </div>
      </div>
    </aside>
  );
};

export default Sidebar;