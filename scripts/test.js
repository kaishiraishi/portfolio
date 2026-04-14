const fs = require('fs');

const images = [
    { src: "/image/otherworks/OtherWorks_1_3.jpeg", alt: "" },
    { src: "/image/otherworks/OtherWorks_1_1.jpeg", alt: "" },
    { src: "/image/otherworks/OtherWorks_1_2.jpeg", alt: "" }
];
const mainImage = "/image/otherworks/OtherWorks_1_1.jpeg";

const isMainImageInList = images.some(img => 
    typeof img === "string" ? img === mainImage : img.src === mainImage
);

console.log(isMainImageInList);
