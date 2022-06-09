// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

window.addEventListener("load", (event) => {
    document.querySelectorAll(".preload").forEach((item, i, list) => {
        item.classList.remove("preload");
    })
});