import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import Image from "next/image";
import { useState } from "react";

const ImageWithFallback = ({ width, height, src, alt, className = "" }) => {
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
