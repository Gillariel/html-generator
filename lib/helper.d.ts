export declare type BusinessCoordonate = {
    building?: string;
    street: string;
    streetNumber: string;
    postalCode: string;
    city: string;
    phoneNumber: string;
    imgSrc?: string;
};
declare type PatientData = {
    fullName: string;
    gender: string;
    DateOfBirth: string;
};
declare type DoctorData = {
    lastName: string;
    consultationDate: string;
};
declare type HeaderLabel = {
    businessNameNonHightlighted: string;
    businessNameHightlighted: string;
    patientName: string;
    dateOfBirth: string;
    doctorName: string;
    dateOfReport: string;
};
declare const HeaderSection: (title: string, titleColor: string, labels: HeaderLabel, logo: string, patient: PatientData, doctor: DoctorData) => string;
declare const Section: (title: string) => string;
declare const SectionSubtitle: (subtitle: string) => string;
declare const SectionContent: (children?: string[] | undefined) => string;
declare const SectionContentWithPageBreak: (children?: string[] | undefined) => string;
declare const SectionWithContent: (title: string, children?: string[] | undefined) => string;
declare const SectionWithContentAndPageBreak: (title: string, children?: string[] | undefined) => string;
declare const Container: (children?: string[] | undefined) => string;
declare const PageBreak: (children?: string[] | undefined) => string;
declare const Text: (text: string, children?: string[] | undefined) => string;
declare const Paragraph: (text: string, align: 'default' | 'center' | 'right', children?: string[] | undefined) => string;
declare const BoldParagraph: (text: string, boldText: string, color: string, children?: string[] | undefined) => string;
declare const List: (title: string, children?: string[] | undefined) => string;
declare const ListItem: (text: string, isInline: boolean, checkedIcon?: string | undefined, children?: string[] | undefined) => string;
declare const Grid: (children?: string[] | undefined) => string;
declare const GridItem: (size: number, children?: string[] | undefined) => string;
declare const Img: (url: string) => string;
declare const Video: (src: string) => string;
declare const HighlightedText: (text: string) => string;
declare const InnerText: (text: string) => string;
declare const ConditionalText: (text: string) => string;
export { HeaderSection, Section, SectionSubtitle, SectionContent, SectionContentWithPageBreak, SectionWithContent, SectionWithContentAndPageBreak, Container, PageBreak, List, ListItem, Text, Paragraph, BoldParagraph, Grid, GridItem, Img, Video, HighlightedText, InnerText, ConditionalText, };
