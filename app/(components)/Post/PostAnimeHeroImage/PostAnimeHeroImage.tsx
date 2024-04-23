"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
  imgSrc: string;
};

export const PostAnimeHeroImage = ({ className, imgSrc }: Props) => {
  const currentPage = usePathname();
  return (
    <Link href={`${currentPage}/?modal=true`} className={className}>
      <Image src={imgSrc} fill={true} alt="collage image" />
    </Link>
  );
};
