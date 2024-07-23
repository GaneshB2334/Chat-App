import axios from "axios";
import { useEffect, useState } from "react";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await axios
        .get("https://chat-app-ku8j.onrender.com/api/users", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setAllUsers(res.data);
        })
        .catch((err) => {
          console.log("Error in getting all users-->", err);
        })
        .finally(() => setLoading(false));
    })();
  }, []);

  return { loading, allUsers };
};

export default useGetAllUsers;
