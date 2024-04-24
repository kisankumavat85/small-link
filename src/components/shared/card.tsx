import React, { ReactNode } from "react";
import {
  Card as CardUI,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

type Props = {
  title?: string;
  description?: string;
  children?: ReactNode;
};

const Card = ({ title, description, children }: Props) => {
  return (
    <CardUI className="rounded-3xl">
      <CardHeader>
        {description && <CardDescription>{description}</CardDescription>}
        {title && <CardTitle>{title}</CardTitle>}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
    </CardUI>
  );
};

export default Card;
