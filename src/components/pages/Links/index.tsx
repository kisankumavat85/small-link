import { Separator } from "../../ui/separator";
import { getAllLinks } from "@/actions/link";
import LinkItem from "./LinkItem";

const Links = async () => {
  const links = await getAllLinks();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 flex flex-col gap-6 border px-6 py-4 rounded-xxl bg-black">
        <div className="flex justify-between items-center">
          <div className="">
            <h2 className="text-3xl font-semibold">Your Links</h2>
            <p className="text-gray-500">Total: {links?.length}</p>
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
    </div>
  );
};

export default Links;
