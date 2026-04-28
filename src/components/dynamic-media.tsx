"use client";

import { useEffect, useState, createContext, useContext, ReactNode } from "react";

type AssetEntry = { url: string; type: string; alt: string };
type AssetsMap = Record<string, AssetEntry>;

const AssetsContext = createContext<AssetsMap>({});

export function AssetsProvider({ children }: { children: ReactNode }) {
  const [assets, setAssets] = useState<AssetsMap>({});
  useEffect(() => {
    fetch("/api/public/assets")
      .then((r) => r.json())
      .then((j) => setAssets(j.assets || {}))
      .catch(() => {});
  }, []);
  return <AssetsContext.Provider value={assets}>{children}</AssetsContext.Provider>;
}

export function useAssetUrl(key: string, fallback: string): string {
  const map = useContext(AssetsContext);
  return map[key]?.url || fallback;
}

interface DynamicImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  assetKey: string;
  fallback: string;
  alt: string;
}

export function DynamicImage({ assetKey, fallback, alt, ...rest }: DynamicImageProps) {
  const url = useAssetUrl(assetKey, fallback);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={alt} {...rest} />;
}

interface DynamicVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  assetKey: string;
  fallback: string;
}

export function DynamicVideo({ assetKey, fallback, ...rest }: DynamicVideoProps) {
  const url = useAssetUrl(assetKey, fallback);
  return (
    <video {...rest} key={url}>
      <source src={url} type="video/mp4" />
    </video>
  );
}
