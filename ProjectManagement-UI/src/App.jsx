import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Nav/Navbar";
import ProjectDetails from "./pages/ProjectDetail/ProjectDetails";
import IssueDetails from "./pages/IssueDetails/IssueDetails";
import Subscription from "./pages/Subscription/Subscription";
import Auth from "./pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./redux/Auth/Action";
import { fetchProject } from "./redux/Project/Action";
import UpgradeSuccess from "./pages/Subscription/UpgradeSuccess";
import AcceptInvitation from "./pages/Project/AcceptInvitation";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchProject({}));
  }, [auth.jwt]);

  console.log(auth);
  return (
    <>
      {auth.user ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route
              path="/project/:projectID/issue/:issueId"
              element={<IssueDetails />}
            />
            <Route path="/upgrade_plan" element={<Subscription />} />
            <Route path="/upgrade_plan/success" element={<UpgradeSuccess />} />
            <Route path="/accept_invitation" element={<AcceptInvitation />} />
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
