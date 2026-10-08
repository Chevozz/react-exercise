import { useState } from "react";

export default function ProductImage({ src, alt, className = "" }) {
  const [isBroken, setIsBroken] = useState(false);

  if (isBroken) {
    return (
      <div
        className={`flex items-center justify-center bg-sand text-center text-xs text-muted ${className}`}
      >
        <span className="px-3">
          Ilustrasi produk
          <br />
          tidak tersedia
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setIsBroken(true)}
      className={className}
    />
  );
}
