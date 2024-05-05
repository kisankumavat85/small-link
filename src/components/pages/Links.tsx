import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getPageTitle } from "@/server-actions/link";
import { Separator } from "../ui/separator";
import { Clock, Plus } from "lucide-react";
import { Button } from "../ui/button";

const Links = async () => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="">
            <h2 className="text-3xl font-semibold">Your links (WIP)</h2>
            <p className="text-gray-500">Total: 200</p>
          </div>
          <div className="">
            <Button className="w-full rounded-lg" variant="default">
              <span className="flex gap-2 items-center">
                <Plus className="w-4 h-4" /> Short link
              </span>
            </Button>
          </div>
        </div>
        <div className="">
          <ul className="flex flex-col gap-2">
            {new Array(8).fill(1).map((i) => (
              <li className="" key={i}>
                <Card className="rounded-2xl">
                  <CardHeader className="p-4">
                    <CardTitle className="text-xl">JycK98Y</CardTitle>
                    <CardDescription>
                      http://localhost:3000/JycK98Y
                    </CardDescription>
                    {/* <CardDescription>{title}</CardDescription> */}
                  </CardHeader>
                  <CardContent className="px-4 pb-0">
                    <Separator />
                    <p className="text-gray-500 py-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <time className="">22, Jan 2024</time>
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Links;
