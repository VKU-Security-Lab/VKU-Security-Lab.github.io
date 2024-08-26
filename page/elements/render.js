import Header from "./header.js"
import Footer from "./footer.js";

const headerContainer = document.getElementById("header");
const footerContainer = document.getElementById("footer");

headerContainer.innerHTML = Header();
footerContainer.innerHTML = Footer();