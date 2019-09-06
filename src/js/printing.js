//Load NPM modules
const printPDF = require("mapbox-print-pdf");

function setFormat(file) {
  let format = document.querySelector("#pdf-format").value;
  file.format(format);
}

function setOrientation(file) {
  let orientation = document.querySelector("#pdf-orientation").value;
  if (orientation === "landscape") {
    file.landscape();
  }
}

function setScale(file) {
  let includeScale = document.querySelector("#pdf-scale").checked;
  let scaleUnits = document.querySelector("#pdf-scale-units").value;

  if (includeScale) {
    file.scale({ maxWidthPercent: 20, unit: scaleUnits });
  }
}

function setMargins(file) {
  let marginTop = document.querySelector("#margin-top").value;
  let marginRight = document.querySelector("#margin-right").value;
  let marginBottom = document.querySelector("#margin-bottom").value;
  let marginLeft = document.querySelector("#margin-left").value;
  let marginUnits = document.querySelector("#margin-units").value;

  let margins = {
    top: isNaN(parseInt(marginTop)) || marginTop < 0 ? 0 : parseInt(marginTop),
    right:
      isNaN(parseInt(marginRight)) || marginRight < 0
        ? 0
        : parseInt(marginRight),
    bottom:
      isNaN(parseInt(marginBottom)) || marginBottom < 0
        ? 0
        : parseInt(marginBottom),
    left:
      isNaN(parseInt(marginLeft)) || marginLeft < 0 ? 0 : parseInt(marginLeft)
  };

  file.margins(margins, marginUnits);
}

printMap = () => {
  let file = printPDF.build();
  setFormat(file);
  setOrientation(file);
  setScale(file);
  setMargins(file);
  file.print(map, mapboxgl).then(function(pdf) {
    pdf.save("accident-map.pdf");
  });
};
