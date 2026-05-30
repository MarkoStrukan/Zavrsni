import { useLocation, Link } from "react-router"
import useAuthUser from "../hooks/useAuthUser"
import { BellIcon, HomeIcon, ShipWheelIcon, UserIcon } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getFriendRequests } from "../lib/api"

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const { data: friendRequests } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });
  const pendingCount = friendRequests?.incomingRequests?.length || 0;

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
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <div className="indicator">
            <BellIcon className="size-6 text-base-content opacity-60" />
            {pendingCount > 0 && (
              <span className="indicator-item badge badge-error badge-xs font-bold">
                {pendingCount > 9 ? "9+" : pendingCount}
              </span>
            )}
          </div>
          <span>Notifications</span>
        </Link>
      </nav>

      
      <div className="p-4 border-t border-base-200 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full">
              <img src={authUser?.profilePic} alt="avatar" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;