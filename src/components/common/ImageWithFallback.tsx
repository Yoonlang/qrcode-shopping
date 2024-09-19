import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
  width: number;
  height: number;
  src: string | null;
  alt?: string;
  className?: string;
}

const ImageWithFallback = ({
  width,
  height,
  src,
  alt = "",
  className = "",
}: ImageWithFallbackProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (!src || imageError) {
    return <ImageNotSupportedIcon className={className} />;
  }

  return (
    <Image
      className={className}
      width={width}
      height={height}
      src={src}
      loading="lazy"
      unoptimized
      alt={alt}
      onError={handleImageError}
    />
  );
};

export default ImageWithFallback;
