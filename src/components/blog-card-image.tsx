"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";

interface Props {
  src: string;
  alt: string;
  featured?: boolean;
}

export function BlogCardImage({ src, alt, featured = false }: Props) {
  const [error, setError] = useState(!src);

  if (error) {
    return (
      <div className={`absolute inset-0 flex items-center justify-center ${featured ? "bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" : "bg-gradient-to-br from-purple-mid/30 to-purple-bright/20"}`}>
        <BookOpen className={`${featured ? "w-24 h-24 text-white/20" : "w-16 h-16 text-purple-bright/30"}`} strokeWidth={1} />
      </div>
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={() => setError(true)}
      />
      <div className={`absolute inset-0 ${featured ? "bg-gradient-to-t from-purple-deep/60 via-transparent to-transparent" : "bg-gradient-to-t from-purple-deep/40 via-transparent to-transparent"}`} />
    </>
  );
}
