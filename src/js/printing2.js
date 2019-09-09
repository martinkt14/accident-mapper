const html2canvas = require("html2canvas");
const jsPDF = require("jspdf");

var pdfFormat = () => {
  return document.querySelector("#pdf-format").value;
};

var imgWidth = () => {
  return pdfFormat() === "letter" ? 10 : 16;
};

printMap = () => {
  console.log(pdfFormat(), imgWidth());

  //HTML2Canvas
  html2canvas(document.querySelector("#map"), {
    dpi: 300,
    scale: 3
  }).then(canvas => {
    let imgData = canvas.toDataURL("image/jpeg", 1);

    let pdf = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: pdfFormat()
    });
    pdf.addImage(
      imgData,
      "JPEG",
      0.5,
      0.5,
      imgWidth(),
      (imgWidth() / canvas.width) * canvas.height
    );
    pdf.save("accident-map.pdf");
  });
};
