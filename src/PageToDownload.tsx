import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { Container, Title, Content } from "./StyledComponents";
import CryptoJS from "crypto-js";

const PageToDownload: React.FC = () => {
  const location = useLocation();

  const hashPdf = (code: string) => {
    const password: string = "123456";

    const hash = CryptoJS.SHA256(password + code).toString();

    console.log("Esse é o hash", hash);
    console.log("Esse é o code", code);
    return hash;
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const generatePDF = searchParams.get("generatePDF");
    const hash = searchParams.get("hash") as string;
    const reportId = searchParams.get("reportId") as string;

    if (generatePDF === "true" && hashPdf(reportId) === hash) {
      const pageContent = document.createElement("div");
      const content = document.querySelector(".pdf-content") as HTMLElement;

      if (content) {
        pageContent.innerHTML = content.innerHTML;
        html2pdf()
          .from(pageContent)
          .save()
          .then(() => {
            window.close();
          });
      }
    }
  }, [location]);

  return (
    <Container className="pdf-content">
      <Title>Título da Página</Title>
      <Content>
        Este é o conteúdo estilizado que será convertido em PDF. Adicione mais
        conteúdo conforme necessário.
      </Content>
    </Container>
  );
};

export default PageToDownload;

// import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import html2pdf from "html2pdf.js";
// import {
//   Container,
//   Title,
//   Content,
//   PageWrapper,
//   CoverPage,
//   Header,
//   Footer,
// } from "./StyledComponents";

// const PageToDownload: React.FC = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const generatePDF = searchParams.get("generatePDF");

//     if (generatePDF === "true") {
//       const pageContent = document.querySelector(".pdf-content") as HTMLElement;
//       const coverPage = document.querySelector(".cover-page") as HTMLElement;
//       const pages = document.querySelectorAll(
//         ".page"
//       ) as NodeListOf<HTMLElement>;

//       if (pageContent && coverPage && pages.length > 0) {
//         const combinedContent = document.createElement("div");
//         combinedContent.appendChild(coverPage.cloneNode(true));
//         pages.forEach((page, index) => {
//           const pageClone = page.cloneNode(true) as HTMLElement;
//           pageClone.querySelector(".footer")!.textContent = `Page ${
//             index + 1
//           } of ${pages.length}`;
//           combinedContent.appendChild(pageClone);
//         });

//         html2pdf()
//           .from(combinedContent)
//           .save()
//           .then(() => {
//             window.close();
//           });
//       }
//     }
//   }, [location]);

//   return (
//     <Container className="pdf-content">
//       <CoverPage className="cover-page">
//         <Title>Capa do Documento</Title>
//       </CoverPage>
//       <PageWrapper className="page">
//         <Header className="header">Header do Documento</Header>
//         <Content>
//           <p>
//             {" "}
//             Este é o conteúdo estilizado que será convertido em PDF. Adicione
//             mais conteúdo conforme necessário.
//           </p>
//         </Content>
//         <Footer className="footer"></Footer>
//       </PageWrapper>
//     </Container>
//   );
// };

// export default PageToDownload;
