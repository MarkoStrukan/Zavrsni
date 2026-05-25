import { useQueryClient } from "@tanstack/react-query"
import { getRecommendedUsers, getUserFriends } from "../lib/api"


const HomePage = () => {
  const queryClient = useQueryClient()
  const [outgoingRequests, setOutgoingRequests] = useState([])

  const { data:friends=[], isLoading:loadingFriends} = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends
  })

  const { data:recommendedUsers=[], isLoading:loadingUsers} = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers
  })

  const {data:outgoingReqs} = useQuery({
    queryKey: ["outgoingRequests"],
    queryFn: getOutgoingFriendReqs
  })



  const {mutate:sendRequsetMutation} = useQuery({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["outgoingRequests"]}),

  })

  return <div>HomePage</div>
}


export default HomePage
