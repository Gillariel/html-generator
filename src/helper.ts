export type BusinessCoordonate = {
  building?: string;
  street: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
  imgSrc?: string;
};

type PatientData = {
  fullName: string;
  gender: string;
  DateOfBirth: string;
};

type DoctorData = {
  lastName: string;
  consultationDate: string;
};

enum Block {
  HeaderSection = 'HeaderSection',
  Section = 'Section',
}

type HeaderLabel = {
  businessNameNonHightlighted: string;
  businessNameHightlighted: string;
  patientName: string;
  dateOfBirth: string;
  doctorName: string;
  dateOfReport: string;
};

const HeaderSection = (
  title: string,
  titleColor: string,
  labels: HeaderLabel,
  logo: string,
  patient: PatientData,
  doctor: DoctorData,
) => {
  const res = `<div class="container">
    <div class="col col-3">
      <div class="col-content"></div>
    </div>
    <div class="col col-6">
      <h2 class="header-title color--${titleColor}">${title}</h2>
    </div>
    <div style="max-height:150px" class="col col-3">
      ${
        logo && logo.includes('<svg')
          ? `<div style="width: 100%" class="col-content">${logo}</div>`
          : `<img width="100%" class="col-content" src='${logo}' />`
      }
      <p style="width: 100%; margin-left: 30px;">3DOrtho<span style="color: #7db700"><b>Check</b></span></p>
    </div>
  </div>
  <div 
  <div class="header-section">
    <div style="margin: 0% 2%">
      <div class="col col-6">
        <p>${labels.patientName} : <span class="data-text">${patient.fullName}</span> (<span class="data-text">${
    patient.gender
  }</span>)</p>
        <p>${labels.dateOfBirth} : <span class="data-text">${patient.DateOfBirth}</span></p>
      </div>
      <div class="col col-6">
        <p style="text-align:right">${labels.doctorName} : <span class="data-text">${doctor.lastName}</span></p>
        <p style="text-align:right">${labels.dateOfReport} : <span class="data-text">${
    doctor.consultationDate
  }</span></p>
      </div>
    </div>
  </div>`;
  res.trim();
  return res;
};

const Section = (title: string) => `<h2 class="section-title">${title}</h2>`;
const SectionSubtitle = (subtitle: string) => `<p class="section-subtitle">${subtitle}</p>`;
const SectionContent = (children?: string[]) =>
  `<div class="section-content">${children && children.join('')}</div>`.trim();
const SectionContentWithPageBreak = (children?: string[]) =>
  `<div class="section-content page-break-section">${children && children.join('')}</div>`;
const SectionWithContent = (title: string, children?: string[]) => `${Section(title)}${SectionContent(children)}`;
const SectionWithContentAndPageBreak = (title: string, children?: string[]) =>
  `${Section(title)}${SectionContentWithPageBreak(children)}`;
const Container = (children?: string[]) => `<div>${children && children.join('')}</div>`;
const PageBreak = (children?: string[]) =>
  `<div style="page-break-before: always">${children && children.join('')}</div>`;
const Text = (text: string, children?: string[]) => `<span>${text} ${children && children.join('')}</span>`;
const Paragraph = (text: string, align: 'default' | 'center' | 'right', children?: string[]) =>
  `<p class="--align-${align}">${text}${children && children.join('')}</p>`;
const BoldParagraph = (text: string, boldText: string, color: string, children?: string[]) =>
  `<p>
    ${boldText && `<b style="color: ${color}">${boldText}</b>`}
    ${text}${children && children.join('')}
  </p>`;
const List = (title: string, children?: string[]) =>
  `<ul >${title ? `<p>${title}</p>` : ''}${children && children.join('')}</ul>`;
const ListItem = (text: string, isInline: boolean, checkedIcon?: string, children?: string[]) => `<li ${
  isInline ? 'style="display: inline-block; width: 49%; vertical-align: top;"' : ''
} ${checkedIcon && 'class="no-bullet"'}>
  ${
    checkedIcon && checkedIcon.includes('<svg')
      ? `<div class="icon">${checkedIcon}</div>`
      : `<img src='${checkedIcon}' class="icon" />`
  }
  ${text} ${children && children.join('')}
</li>`;
const Grid = (children?: string[]) => `<div class="container">${children && children.join('')}</div>`;
const GridItem = (size: number, children?: string[]) =>
  `<div class="col col-${size}"><div class="col-content">${children && children.join('')}</div></div>`;
const Img = (url: string) => `<img src=${url} />`;
const Video = (src: string) => `<video src=${src}/>`;

const HighlightedText = (text: string) => `<span class="data-text">${text}</span>`;
const InnerText = (text: string) => `${text}`;

const ConditionalText = (text: string) => `<span>${text}</span>`;
export {
  HeaderSection,
  Section,
  SectionSubtitle,
  SectionContent,
  SectionContentWithPageBreak,
  SectionWithContent,
  SectionWithContentAndPageBreak,
  Container,
  PageBreak,
  List,
  ListItem,
  Text,
  Paragraph,
  BoldParagraph,
  Grid,
  GridItem,
  Img,
  Video,
  HighlightedText,
  InnerText,
  ConditionalText,
};
