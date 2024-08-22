import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
import IssueCard from "./IssueCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import CreateIssueForm from "./CreateIssueForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues } from "@/redux/Issue/Action";
import { useParams } from "react-router-dom";

const IssueList = ({ title, status }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { issue } = useSelector((store) => store);
  useEffect(() => {
    dispatch(fetchIssues(id));
  }, [id]);
  return (
    <div>
      <Dialog>
        <Card className="w-full md:w-[300px] lg:w-[310px]">
          <CardHeader>
            <CardTitle
              style={{
                color:
                  title === "In Progress"
                    ? "yellow"
                    : title === "Done"
                    ? "green"
                    : "red",
              }}
            >
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-2">
              {issue.issues
                .filter((issue) => issue.status == status)
                .map((item) => (
                  <IssueCard projectId={id} item={item} key={item.id} />
                ))}
            </div>
          </CardContent>
          <CardFooter>
            <DialogTrigger>
              <Button
                className="w-full flex items-center gap-2"
                variant="outline"
              >
                <PlusIcon />
                Create Issue
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Issue</DialogTitle>
          </DialogHeader>
          <CreateIssueForm status={status} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IssueList;
