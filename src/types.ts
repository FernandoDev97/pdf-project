export interface ReportData {
  title: string;
  author: string;
  sections: Section[];
}

export interface Section {
  header: string;
  content: string;
}
