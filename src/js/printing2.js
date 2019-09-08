const html2canvas = require("html2canvas");
const jsPDF = require("jspdf");

printMap = () => {
  //HTML2Canvas
  html2canvas(document.querySelector("#map"), {
    dpi: 300,
    scale: 3
  }).then(canvas => {
    let imgData = canvas.toDataURL("image/jpeg", 1);

    let pdf = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: "ledger"
    });
    pdf.addImage(
      imgData,
      "JPEG",
      0.5,
      0.5,
      16,
      (16 / canvas.width) * canvas.height
    );
    pdf.save("accident-map.pdf");
  });
};
