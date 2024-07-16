import React from "react";

const DownloadPDFButton: React.FC = () => {
  const handleDownload = () => {
    const url = new URL(window.location.href);
    url.pathname = "/download-page";
    url.searchParams.set("generatePDF", "true");
    url.searchParams.set("reportId", "reports/2512/4/3265");
    url.searchParams.set(
      "hash",
      "53c6db87ab10115395d67b2ffbc1d9a6dac334d4d2fe891aef2b1527438a354d"
    );

    const newWindow = window.open(url.toString(), "_blank") as Window;

    return (newWindow.opener = null);
  };

  return <button onClick={handleDownload}>Download PDF</button>;
};

export default DownloadPDFButton;

// import React from "react";

// const DownloadPDFButton: React.FC = () => {
//   const handleDownload = () => {
//     const url = new URL(window.location.href);
//     url.pathname = "/download-page";
//     url.searchParams.set("generatePDF", "true");

//     window.open(url.toString(), "_blank");
//   };

//   return <button onClick={handleDownload}>Download PDF</button>;
// };

// export default DownloadPDFButton;
