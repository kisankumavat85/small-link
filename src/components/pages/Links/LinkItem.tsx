import Link from "next/link";

import { ShortURL } from "@prisma/client";
import { formatDate } from "@/utils";
import { Separator } from "@/components/ui/separator";
import CopyButton from "@/components/shared/copy-button";

interface ShortUrlCount extends ShortURL {
  clickCount: number;
}

const LinkItem = async ({ link }: { link: ShortUrlCount }) => {
  const fullUrl = `${process.env.ORIGIN_URL}/${link.slug}`;

  return (
    <li
      className="p-4 border border-transparent border-b-[8px] hover:border-secondary hover:shadow-lg rounded-lg"
      key={link.id}
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-10">
          <h3
            className="text-xl font-semibold truncate"
            title={link.title ? link.title : link.slug}
          >
            {link.title ? link.title : `${link.slug} - Untitled`}
          </h3>
          <Link
            href={fullUrl}
            target="_blank"
            className="text-blue-600 text-sm hover:underline"
          >
            {fullUrl}
          </Link>
          <p className="text-gray-500 text-sm">{link.longLink}</p>
        </div>
        <div className="col-span-2">
          <div className="flex justify-end">
            <CopyButton text={fullUrl} />
          </div>
        </div>
      </div>
      <div className="">
        <Separator className="my-2" />
        <div className="flex items-center gap-4">
          <p className="flex gap-2 items-end">
            <span className="font-semibold">{link.clickCount ?? 0}</span>
            <span className="text-gray-500">{`click${
              link.clickCount > 1 ? "s" : ""
            }`}</span>
          </p>
          <span>|</span>
          <time className="text-sm">{formatDate(link.createdAt)}</time>
        </div>
      </div>
    </li>
  );
};

export default LinkItem;
