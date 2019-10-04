# Accident Mapper

This application was designed to help quickly analyze crash/accident data provided by local/state for the purpose of understanding how the existing infrastructure impacts the likelyhood of future accidents.

[Live Application](http://accident-mapper.herokuapp.com/)

![Screenshot of application after accidents loaded](/readme/screenshots/post-accident-import-with-menu.png?raw=true)

# Author(s)

- Martin K. Teufel - Creator

Also see the list of [credits](#credits) for work done by other developers that signaficantly helped during the development of this project.

# Installation

To install a local copy:

1. Clone repository to local folder:

```
$ git clone https://github.com/martinkt14/accident-mapper.git
```

2. Install dependencies:

```
$ npm install
```

3. Once the dependencies are installed, you can run the code below to start the application. You will then be able to access it at `localhost:3000`

```
$ npm start
```

# Usage

To get started, it is recommended to download the sample data file below to view the headings/information required for full functionality.

[Sample Data | Template](/sample/traffic_data.xlsx)

## Uploading Data

![Uploading Data](/readme/upload_data.gif)

## Filtering Data

Data can be filtered multiple ways:

1. Street name
2. Accident Type

![Filtering Data](/readme/filter_data.gif)

# Credits

- [html2canvas](https://www.npmjs.com/package/html2canvas) - [Niklas von Hertzen](https://www.npmjs.com/~niklasvh)
- [jspdf](https://www.npmjs.com/package/jspdf) - [mrjameshall](https://www.npmjs.com/~mrjameshall)
