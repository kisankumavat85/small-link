import { Plus } from "lucide-react";

import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { getAllLinks } from "@/server-actions/link";
import LinkItem from "./LinkItem";

const Links = async () => {
  const links = await getAllLinks();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-9 flex flex-col gap-6 border px-6 py-4 rounded-xxl bg-black">
        <div className="flex justify-between items-center">
          <div className="">
            <h2 className="text-3xl font-semibold">Your links</h2>
            <p className="text-gray-500">Total: {links?.length}</p>
          </div>
          <div className="">
            <Button className="w-full rounded-lg" variant="default">
              <span className="flex gap-2 items-center">
                <Plus className="w-4 h-4" /> Short link
              </span>
            </Button>
          </div>
        </div>
        <Separator />
        <div className="">
          <ul className="flex flex-col gap-2">
            {links &&
              links.map((link) => <LinkItem key={link.id} link={link} />)}
          </ul>
        </div>
      </div>

      <div className="col-span-3 border p-4 rounded-xxl bg-black"></div>
    </div>
  );
};

export default Links;
