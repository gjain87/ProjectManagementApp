import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import React, { useState } from "react";
import ProjectCard from "../Project/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject, searchProjects } from "@/redux/Project/Action";

export const tags = [
  "All",
  "react",
  "node",
  "SpringBoot",
  "mySQL",
  "MONGODB",
  "Angular",
  "python",
  "java",
  "flask",
  "django",
];

const Projectlist = () => {
  const dispatch = useDispatch();
  const { project } = useSelector((store) => store);
  const [keyword, setKeyword] = useState("");
  const handleFilterCategory = (value) => {
    if (value === "all") dispatch(fetchProject({}));
    else dispatch(fetchProject({ category: value }));
  };
  const handleFilterTags = (value) => {
    if (value === "All") dispatch(fetchProject({}));
    else dispatch(fetchProject({ tag: value }));
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    dispatch(searchProjects(e.target.value));
  };

  return (
    <>
      <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
        <section className="filterSection">
          <Card className="p-5 sticky top-10">
            <div className="flex justify-between lg:w-[20rem]">
              <p className="text-xl tracking-wider">filters</p>
              <Button size="icon" variant="ghost">
                <MixerHorizontalIcon />
              </Button>
            </div>
            <CardContent className="mt-5">
              <ScrollArea className="space-y-7 h-[70vh]">
                <div>
                  <h1 className="pb-3 text-gray-400 border-b ">Category</h1>
                  <div className="pt-5">
                    <RadioGroup
                      className="space-y-3 pt-5"
                      defaultValue="all"
                      onValueChange={(value) => handleFilterCategory(value)}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="all" id="r1" />
                        <Label htmlFor="r1">All</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="fullstack" id="r2" />
                        <Label htmlFor="r2">FullStack</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="frontend" id="r3" />
                        <Label htmlFor="r3">FrontEnd</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="backend" id="r4" />
                        <Label htmlFor="r4">BackEnd</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="pt-9 ">
                  <h1 className="pb-3 text-gray-400 border-b ">Tag</h1>
                  <div className="pt-5">
                    <RadioGroup
                      className="space-y-3 pt-5"
                      defaultValue="All"
                      onValueChange={(value) => handleFilterTags(value)}
                    >
                      {tags.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <RadioGroupItem value={item} id={`r1-${item}`} />
                          <Label htmlFor={`r1-${item}`}>{item}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
        <section className="projectListSection w-full lg:w-[48rem] ">
          <div className="flex gap-2 items-center pb-5 justify-between">
            <div className="relative p-0 w-full">
              <Input
                className="40% px-9 "
                placeholder="search project"
                onChange={handleSearchChange}
              />
              <MagnifyingGlassIcon className="absolute top-3 left-4 " />
            </div>
          </div>
          <div className="space-y-5 min-h-[74vh]">
            {keyword
              ? project.searchProjects?.map((item) => (
                  <ProjectCard key={item.id} item={item} />
                ))
              : project.projects?.map((item) => (
                  <ProjectCard key={item.id} item={item} />
                ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Projectlist;
