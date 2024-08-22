import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { assignedUserToIssue } from "@/redux/Issue/Action";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserList = ({ issueDetails }) => {
  const dispatch = useDispatch();
  const { project } = useSelector((store) => store);
  const handleAssigneeIssueToUser = (userId) => {
    dispatch(assignedUserToIssue({ issueId: issueDetails.id, userId: userId }));
  };
  return (
    <>
      <div className="space-y-2">
        <div className="border rounded-md">
          <p className="py-2 px-3">
            {issueDetails.assignee?.fullName || "Unassigned"}
          </p>
        </div>
        {project.projectDetails?.team.map((item) => (
          <div
            onClick={() => handleAssigneeIssueToUser(item.id)}
            key={item}
            className="py-2 group hover:bg-slate-800 flex cursor-pointer items-center space-x-4 rounded-md border px-4"
          >
            <Avatar>
              <AvatarFallback>{item.fullName[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm leading-none">{item.fullName}</p>
              <p className="text-sm text-muted-foreground">@{item.email}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserList;
