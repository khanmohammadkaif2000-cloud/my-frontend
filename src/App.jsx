import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://my-backend-pi1l.onrender.com/api/products?populate=*")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);

  return (
    <div style={{ padding: "20px", background: "#f5f5f5" }}>
      <h1 style={{ textAlign: "center" }}>💻 My Laptop Store</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        {products.map((p, index) => {

          const name = p.Name;
          const price = p.Price;
          const status = p.stocks;

          let imageUrl = "";
          if (p.Image && p.Image.length > 0) {
            imageUrl = "https://my-backend-pi1l.onrender.com/uploads/a_bug_is_becoming_a_meme_on_the_internet_e926fd7920.jpg";
          }

          return (
            <div key={index} style={{
              background: "white",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}>
              <img src={imageUrl} style={{ width: "100%", borderRadius: "8px" }} />

              <div style={{
                background: status === "Available" ? "green" : "red",
                color: "white",
                padding: "4px 8px",
                borderRadius: "5px",
                display: "inline-block",
                marginTop: "8px",
                fontSize: "12px"
              }}>
                {status}
              </div>

              <h3>{name}</h3>
              <p><b>₹{price}</b></p>

              {status === "Available" ? (
                <>
                  <a href={`https://wa.me/919137257510?text=I%20am%20interested%20in%20${name}%20for%20₹${price}`} target="_blank">
                    <button style={{ width: "100%", background: "#25D366", color: "white", padding: "8px", marginTop: "5px", border: "none" }}>
                      WhatsApp
                    </button>
                  </a>

                  <a href="tel:919876543210">
                    <button style={{ width: "100%", background: "#007BFF", color: "white", padding: "8px", marginTop: "5px", border: "none" }}>
                      Call Now
                    </button>
                  </a>
                </>
              ) : (
                <button style={{ width: "100%", background: "gray", color: "white", padding: "8px", marginTop: "5px", border: "none" }}>
                  Out of Stock
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
