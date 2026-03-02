const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.style.background = "white";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.08)";
    } else {
        header.style.background = "rgba(255, 255, 255, 0.85)";
        header.style.boxShadow = "none";
    }
});
