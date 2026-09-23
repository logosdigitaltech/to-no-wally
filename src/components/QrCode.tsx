"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";

export function QrCode({ value, size = 104 }: { value: string; size?: number }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(value, { width: size, margin: 1, color: { dark: "#06306f", light: "#ffffff" } })
      .then((url) => {
        if (active) setSrc(url);
      })
      .catch(() => setSrc(""));
    return () => {
      active = false;
    };
  }, [size, value]);

  if (!src) return <div className="rounded-2xl bg-white/80" style={{ width: size, height: size }} />;
  return <img src={src} width={size} height={size} alt="QR Code para baixar o Wally" />;
}
