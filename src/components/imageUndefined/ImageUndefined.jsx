import Image from "next/image";
import personDefault from "../../../public/defaultImageMan.png";
import defaultBookImage from "../../../public/default-book-image.png";

export const ProfileImageControl = ({
  imageName,
  widthImage,
  heightImage,
  altImage,
  className,
  person,
}) => {
  return imageName && altImage ? (
    <Image
      alt={altImage}
      src={
        person
          ? `https://bookwave-profile-image.s3.eu-central-1.amazonaws.com/profileImage/${imageName}`
          : `https://bookwave-profile-image.s3.eu-central-1.amazonaws.com/book/${imageName}`
      }
      width={widthImage}
      height={heightImage}
      className={className}
    />
  ) : (
    <Image
      alt="default Image"
      src={person ? personDefault : defaultBookImage}
      width={widthImage}
      height={heightImage}
      className={className}
    />
  );
};
