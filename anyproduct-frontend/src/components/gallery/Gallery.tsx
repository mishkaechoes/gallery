import React from 'react';

type GalleryProps = {
  initialImages?: any[];
  initialPage?: number;
};

const Gallery: React.FC<GalleryProps> = ({ initialImages = [], initialPage = 1 }) => {
  const [images, setImages] = React.useState(initialImages);
  const [page, setPage] = React.useState(initialPage);

  React.useEffect(() => {
    fetch(`https://2d5dba7d-dd2a-4935-ba8b-ea9cb7578d34.mock.pstmn.io/api/images?page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setImages(data))
      .catch((error) => console.error("Error fetching images:", error));
  }, [page]);

  return (
    <>
      <h1>Gallery</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "10px",
        }}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image.presignedUrl}
              alt={image.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <br />
            {image.name}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
      <div className="card">
        <p>Page: {page}</p>
      </div>
    </>
  );
};

export default Gallery;