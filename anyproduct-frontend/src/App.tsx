import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [images, setImages] = useState<{ id: string; name: string; image_url: string; presignedUrl: string }[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`/api/images?page=${page}`)
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
      <h1>AnyProduct Gallery</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px" }}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.presignedUrl} alt={image.name} style={{ width: "100%", borderRadius: "8px" }} />
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
}

export default App;
