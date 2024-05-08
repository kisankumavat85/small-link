"use client";

import { Copy } from "lucide-react";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { copyToClipboard } from "@/utils";

const CopyButton = ({ text }: { text: string }) => {
  const { toast } = useToast();

  const copyButtonHandler = async () => {
    const isCopied = await copyToClipboard(text);
    toast({
      title: isCopied ? "Link copied" : "Could not copy",
      variant: isCopied ? "default" : "destructive",
    });
  };

  return (
    <Button
      variant="outline"
      className="flex-shrink-0"
      size="icon"
      onClick={copyButtonHandler}
    >
      <Copy className="h-4 w-4" />
    </Button>
  );
};

export default CopyButton;
