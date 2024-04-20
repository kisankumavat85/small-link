import React from "react";
import { AvatarImage, Avatar as AvatarUI, AvatarFallback } from "../ui/avatar";

type Props = {
  image: string;
  fallback: string;
};

const Avatar = ({ image, fallback }: Props) => {
  return (
    <AvatarUI>
      <AvatarImage src={image} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarUI>
  );
};

export default Avatar;
