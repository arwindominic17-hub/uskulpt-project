console.log("Main Pages Project loaded successfully.");

// Connect to Cloudflare Worker backend
const BACKEND_URL = "https://uskulpt-api.webmaster-c58.workers.dev/api/health";

fetch(BACKEND_URL)
  .then((response) => response.json())
  .then((data) => {
    console.log("Backend response:", data);
    const statusElem = document.getElementById("backend-status");
    if (statusElem) {
      statusElem.textContent = `Backend status: ${data.status}`;
      statusElem.style.color = "#16a34a";
    }
  })
  .catch((error) => {
    console.error("Error connecting to backend:", error);
    const statusElem = document.getElementById("backend-status");
    if (statusElem) {
      statusElem.textContent = "Backend connection failed.";
      statusElem.style.color = "#dc2626";
    }
  });
