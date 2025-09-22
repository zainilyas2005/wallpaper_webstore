const API_KEY = "52420752-acdda774014f7fe93be0030ea"; // Replace with your Pixabay API key
const BASE_URL = "https://pixabay.com/api/";

async function searchWallpapers() {
  const query = document.getElementById("searchInput").value || "nature";
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=12`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    if (data.hits.length === 0) {
      gallery.innerHTML = "<p>No wallpapers found.</p>";
      return;
    }

    data.hits.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("wallpaper");
      div.innerHTML = `
        <img src="${item.webformatURL}" alt="${item.tags}">
        <a href="${item.largeImageURL}" target="_blank" download>Download</a>
      `;
      gallery.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching wallpapers:", error);
  }
}

// load default wallpapers on start
window.onload = searchWallpapers;