"use client";

import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ShortLink from "./short-link";

const ShortLinkDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full rounded-lg" variant="outline">
          <span className="flex gap-2 items-center">
            <Plus className="w-4 h-4" />
            Short link
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-full max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Short link</DialogTitle>
          <DialogDescription>
            Enter long link to make your small link
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ShortLink />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShortLinkDialog;
