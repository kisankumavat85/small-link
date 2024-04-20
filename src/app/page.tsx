"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { MouseEvent, MouseEventHandler, useState } from "react";
import { Copy, Globe, QrCode } from "lucide-react";
import Link from "next/link";

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
    <div className="fluid-container">
      <div className="flex flex-col h-full md:gap-[80px] gap-10 w-full max-w-[650px] mx-auto">
        <div className="text-center">
          <h1 className="lg:text-5xl text-4xl text-white font-sansBungee text-center mb-4">
            Your Small Link
          </h1>
          <h2 className="text-lg">
            The simplest URL shortener you were waiting for
          </h2>
        </div>

        <div className="text-center text-white flex flex-col justify-center gap-4 items-center">
          <div className="grid grid-cols-12 gap-4 w-full text-slate-300">
            <Input
              value={longLink}
              onChange={(e) => setLongLink(e.target.value)}
              name="url"
              className="md:col-span-9 col-span-12"
              placeholder="Enter URL"
            />
            <Button
              className="md:col-span-3 col-span-12"
              onClick={handleClick}
              variant="default"
            >
              Short
            </Button>
          </div>
          {shortLink && (
            <div className="flex flex-col gap-4 w-full p-4 border rounded-md bg-background">
              <div className="flex md:flex-row flex-col md:items-center gap-2 w-full text-slate-300">
                <Link
                  href={shortLink}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex gap-1 w-full h-[40px] items-center justify-start underline rounded-md text-blue-600"
                >
                  <Globe className="h-5 w-5" /> {shortLink}
                </Link>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-shrink-0"
                    size="icon"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-shrink-0"
                    size="icon"
                  >
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-[14px] text-left">URL: {longLink}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
