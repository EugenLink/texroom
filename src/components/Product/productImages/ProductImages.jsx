import { useEffect, useState } from "react";
import styles from "./ProductImages.module.scss";

export const ProductImages = ({ images, id }) => {
  const [active, setActive] = useState("/noPhoto.png");

  useEffect(() => {
    if (images) {
      console.log(`/${images[0]}`);
      setActive(`/${images[0]}`);
    } else {
      console.log("NO-PHOTO");
      setActive("/noPhoto.png");
    }
  }, [images]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.ImagePicker}>
        {images
          ? images.map((el) => {
              return (
                <div
                  key={el}
                  className={`${styles.imageWrapper} ${
                    active === `/${el}` ? styles.active : null
                  }`}
                  onClick={() => setActive(`/${el}`)}
                >
                  <img
                    src={`https://u1978287.isp.regruhosting.ru/product/photos/${id}/images/${el}`}
                    alt="img1"
                    className={styles.ImageSmall}
                  />
                </div>
              );
            })
          : null}
      </div>
      <div className={styles.ImageFullScreenWrapper}>
        <img
          src={
            images
              ? `https://u1978287.isp.regruhosting.ru/product/photos/${id}/images${active}`
              : active
          }
          alt={"img"}
          className={styles.Image}
        />
      </div>
    </div>
  );
};
