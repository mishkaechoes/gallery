import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    // fetch(`${import.meta.env.BACKEND_ALB_URL}/images?page=${page}`)
    fetch(`https://dummyjson.com/recipes?skip=${page * 5}&limit=5&select=name,image`)
    .then((response) => response.json())
    .then((data) => setImages(data.recipes))
    .catch((error) => console.error("Error fetching images:",error))
  }, [page])

  return (
    <>
      <h1>AnyProduct</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px" }}>
        {images.map((image, index) => (
          <div>
            <img key={index} src={image.image} alt={`Image ${index}`} style={{ width: "100%", borderRadius: "8px" }} />
            <br/>
            {image.name}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
      <div className="card">
        page is {page}
      </div>
    </>
  )
}

export default App
