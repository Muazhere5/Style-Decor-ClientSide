import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const DecoratorDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axiosSecure.get("/decorator/tasks").then(res => setTasks(res.data));
  }, [axiosSecure]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Decorator Dashboard</h1>
      <p className="text-lg">Assigned Tasks: {tasks.length}</p>
    </div>
  );
};

export default DecoratorDashboardHome;
