import Image from "next/image";
import personDefault from "../../../public/defaultImageWomen.png";

export const ProfileImageControl = ({
  imageName,
  widthImage,
  heightImage,
  altImage,
  className,
}) => {
  return imageName && altImage ? (
    <Image
      alt={altImage}
      src={`https://bookwave-profile-image.s3.eu-central-1.amazonaws.com/profileImage/${imageName}`}
      width={widthImage}
      height={heightImage}
      className={className}
    />
  ) : (
    <Image
      alt="default Image"
      src={personDefault}
      width={widthImage}
      height={heightImage}
      className={className}
    />
  );
};
