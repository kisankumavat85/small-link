"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { MouseEvent, MouseEventHandler, useState } from "react";

export default function Home() {
  const [longLink, setLongLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = (e: any) => {
    (async () => {
      try {
        const res = await fetch("/api/link/add", {
          method: "post",
          body: JSON.stringify({
            url: longLink,
          }),
        });

        const { data } = (await res.json()) as any;
        setShortLink(data.shortLink);
      } catch (error) {}
    })();
  };

  return (
    <main className="">
      <div className="flex flex-col pt-[0%] h-full gap-[80px] w-full max-w-[650px] mx-auto">
        <div className="text-center">
          <h1 className="text-5xl text-white font-sansBungee text-center mb-4">
            Small link
          </h1>
          <h2 className="text-lg">
            The simplest URL shortener you were waiting for
          </h2>
        </div>

        <div className="text-center text-white flex flex-col justify-center items-center">
          <div className="grid grid-cols-12 grid-rows-[45px_45px] gap-4 p-4 w-full text-slate-300">
            <Input
              value={longLink}
              onChange={(e) => setLongLink(e.target.value)}
              name="url"
              className="col-span-9"
            />
            <Button
              className="col-span-3 uppercase font-bold"
              onClick={handleClick}
              variant="outline"
            >
              Get Link
            </Button>
            <div className="col-span-8 flex items-center justify-start border-2 px-4 border-[#3c3e40] bg-[#1c1e20] rounded-[5px] outline-1 outline-black ring-0">
              {shortLink}
            </div>
            <button className="col-span-2 border-2 px-4 border-[#3c3e40] bg-[#1c1e20] rounded-[5px] outline-1 outline-black ring-0">
              Copy
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
