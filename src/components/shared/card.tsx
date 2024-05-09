import React, { ReactNode } from "react";
import {
  Card as CardUI,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

const Card = ({ title, description, children, className }: Props) => {
  return (
    <CardUI className={cn("rounded-2xl p-0", className)}>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
    </CardUI>
  );
};

export default Card;
