import { Link } from "react-router";
import { COUNTRIES } from "../constants";

const FriendCard = ({ friend }) => {
  const country = COUNTRIES.find((c) => c.code === friend.location || c.name === friend.location);

  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        {country && (
          <div className="flex items-center gap-1.5 text-sm text-base-content/70 mb-3">
            <span>{country.flag}</span>
            <span>{country.name}</span>
          </div>
        )}

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;
