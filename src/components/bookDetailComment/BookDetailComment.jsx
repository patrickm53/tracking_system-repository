import Link from "next/link";
import { ProfileImageControl } from "../imageUndefined/ImageUndefined";
import classes from "./bookDetailComment.module.css";

const BookDetailComment = ({ bookDetails }) => {
  return (
    <div className={classes.container}>
      <div className={classes.bookDetailsProfil}>
        <div>
          <Link
            className={classes.link}
            href={`/profile/${bookDetails?.user?._id}`}
          >
            <ProfileImageControl
              altImage="detailProfil"
              imageName={bookDetails?.user?.profilImage}
              widthImage="30"
              heightImage="30"
              className={classes.detailsProfilImage}
              person={true}
            />
            {bookDetails?.user?.name}
          </Link>
          <div>
            - paylaşım <span>12</span> - yorum <span>72</span>
          </div>
        </div>
      </div>
      <div
        className={classes.desc}
        dangerouslySetInnerHTML={{ __html: bookDetails?.description }}
      />
    </div>
  );
};

export default BookDetailComment;
