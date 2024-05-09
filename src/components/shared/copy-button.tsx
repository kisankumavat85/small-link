"use client";

import { useState, useCallback, useMemo } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "../ui/button";
import { copyToClipboard } from "@/utils";

const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyButtonHandler = useCallback(async () => {
    const copied = await copyToClipboard(text);
    setIsCopied(copied);
    setTimeout(() => setIsCopied(false), 1500);
  }, [text]);

  const Icon = useMemo(() => (isCopied ? Check : Copy), [isCopied]);

  return (
    <Button
      variant="outline"
      className="flex-shrink-0"
      size="icon"
      onClick={copyButtonHandler}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};

export default CopyButton;
