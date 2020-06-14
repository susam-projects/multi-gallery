import React, { useCallback, useLayoutEffect, useState } from "react";
import { useRouteMatch } from "react-router";
// @ts-ignore
import StackGrid from "react-stack-grid";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { makeStyles } from "@material-ui/core/styles";
import { useWidth } from "../theme";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

import img1 from "./TestImages/analysis-blackboard-board-bubble-355952.jpg";
import img2 from "./TestImages/ask-blackboard-chalk-board-chalkboard-356079.jpg";
import img3 from "./TestImages/daniel-roe-lpjb_UMOyx8-unsplash.jpg";
import img4 from "./TestImages/henry-be-IicyiaPYGGI-unsplash.jpg";
import img5 from "./TestImages/ilyuza-mingazova-9x5HzipVSEs-unsplash.jpg";
import img6 from "./TestImages/ilyuza-mingazova-QdSYNigPc3s-unsplash.jpg";
import img7 from "./TestImages/james-l-w-PT-gOmCUlCY-unsplash.jpg";
import img8 from "./TestImages/jeremy-bishop-EwKXn5CapA4-unsplash.jpg";
import img9 from "./TestImages/photo-1472068996216-8c972a0af9bd.jpeg";
import img10 from "./TestImages/priscilla-du-preez-XZEYdvJznMQ-unsplash.jpg";
import img11 from "./TestImages/qingbao-meng-01_igFr7hd4-unsplash.jpg";
import img12 from "./TestImages/sangga-rima-roman-selia-7_EpxMdCMRc-unsplash.jpg";
import img13 from "./TestImages/shifaaz-shamoon-oR0uERTVyD0-unsplash.jpg";
import img14 from "./TestImages/susan-yin-YQhhlCS9Hto-unsplash.jpg";
import img15 from "./TestImages/lachlan-dempsey-6VPEOdpFNAs-unsplash.jpg";

export interface ICollectionViewerRouteParams {
  slug: string;
}

const photos = [
  img1,
  img2,
  img15,
  img3,
  img4,
  img7,
  img5,
  img6,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
];

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}));

function CollectionViewerPage() {
  const match = useRouteMatch<ICollectionViewerRouteParams>();
  const { slug } = match.params;

  console.log("view collection", slug);

  const styles = useStyles();

  const [isSlideShow, setIsSlideShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageClick = useCallback(imageId => {
    setSelectedImage(imageId);
    setIsSlideShow(true);
  }, []);

  const handleCloseViewerClick = useCallback(() => {
    setIsSlideShow(false);
  }, []);

  const width = useWidth();
  const COLUMNS_COUNT: Record<Breakpoint, number> = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  };
  const columnWidth = `${Math.floor(100 / COLUMNS_COUNT[width])}%`;

  return (
    <div className={styles.root}>
      {!isSlideShow && (
        <StackGrid columnWidth={columnWidth} monitorImagesLoaded gutterWidth={5} gutterHeight={0}>
          {photos.map((src, i) => (
            <Image key={src} src={src} name={src} onClick={() => handleImageClick(i)} />
          ))}
        </StackGrid>
      )}
      {isSlideShow && (
        <ImageViewer
          images={photos}
          selectedImage={selectedImage}
          onCloseViewerClick={handleCloseViewerClick}
        />
      )}
    </div>
  );
}

interface IImageProps {
  src: string;
  name?: string;
  onClick?: () => void;
}

const Image: React.FC<IImageProps> = ({ src, name = "", onClick }) => {
  return (
    <div onClick={onClick}>
      <img style={{ maxWidth: "100%" }} src={src} alt={name} />
    </div>
  );
};

interface IImageViewerProps {
  images: string[];
  selectedImage: number;
  onCloseViewerClick: () => void;
}

const ImageViewer: React.FC<IImageViewerProps> = ({
  images,
  selectedImage,
  onCloseViewerClick,
}) => {
  const imageItems: ReactImageGalleryItem[] = images.map(src => ({
    original: src,
    thumbnail: src,
    description: "test description",
  }));

  let imagesGalleryRef: ImageGallery | null = null;

  const getGalleryRef = useCallback(instance => {
    imagesGalleryRef = instance;
  }, []);

  useLayoutEffect(() => {
    imagesGalleryRef?.fullScreen();
  });

  const handleScreenChange = useCallback(isFullScreen => {
    if (!isFullScreen) {
      onCloseViewerClick();
    }
  }, []);

  return (
    <ImageGallery
      items={imageItems}
      startIndex={selectedImage}
      lazyLoad
      thumbnailPosition="bottom"
      onScreenChange={handleScreenChange}
      ref={getGalleryRef}
    />
  );
};

export default CollectionViewerPage;
