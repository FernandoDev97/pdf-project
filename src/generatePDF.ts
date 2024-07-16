import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {
  TDocumentDefinitions,
  Content,
  StyleDictionary,
} from "pdfmake/interfaces";
import { ReportData, Section } from "./types";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generatePDF = (reportData: ReportData): void => {
  const { title, author, sections } = reportData;

  const content: Content = [
    {
      text: title,
      style: "coverTitle",
      margin: [0, 0, 0, 20],
    },
    {
      text: `Relatório realizado por ${author}\n\n\n`,
      style: "coverSubtitle",
    },
    ...sections.flatMap((section: Section): Content[] => [
      {
        text: section.header,
        style: "sectionHeader",
      },
      {
        text: section.content,
        style: "content",
      },
    ]),
  ];

  const styles: StyleDictionary = {
    coverTitle: {
      fontSize: 22,
      bold: true,
      alignment: "center",
      margin: [0, 300, 0, 10],
    },
    coverSubtitle: {
      fontSize: 14,
      alignment: "center",
      margin: [0, 0, 0, 40],
    },
    content: {
      fontSize: 12,
      alignment: "left",
      margin: [0, 5, 0, 5],
    },
    sectionHeader: {
      fontSize: 14,
      bold: true,
      margin: [0, 15, 0, 5],
    },
  };

  const docDefinition: TDocumentDefinitions = {
    content: content,
    styles: styles,
    defaultStyle: {
      font: "Roboto",
    },
    pageMargins: [40, 60, 40, 60],
    footer: (currentPage: number, pageCount: number) => ({
      text: `Page ${currentPage} of ${pageCount}`,
      alignment: "center",
      margin: [0, 10, 0, 0],
    }),
  };

  pdfMake.createPdf(docDefinition).download("documento.pdf");
};
