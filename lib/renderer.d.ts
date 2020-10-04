declare type Template = {
    location?: string;
    content?: string;
    css?: string;
};
declare type PdfOptions = {
    scheme: 'http' | 'https' | 'file';
    host: string;
    endpoint: string;
    body: {
        [key: string]: any;
    };
    headers: {
        [key: string]: string;
    };
    filename: string;
    notReportedLabel: string;
};
declare type Icons = {
    checkedIcon: string;
    logo: string;
};
/**
 * @summary A class that will generate a PDF based on a .template file using a custom templating engine
 * @function render render the template, pass it to the Pdf generator and automatically downlod it
 * @variation renderAsHtml allow the rendering to stop before generating the PDF to const you directly get the HTML output.
 * Pay attention that it does not reflect the real pdf result as the pdf parser may not be able tu use some css properties
 * @example
 * const genPDF = async () => {
 *   const myVariables = new Map<string, string>();
 *   myVariables.set("myVariable", "lolilol");
 *   const isPdfGenerated = await new ConcreteRenderer("mytemplate", "en-GB", {
 *     scheme: "https",
 *     host: "pdf.com",
 *     endpoint: "/api/create-pdf"
 *     body: {
 *       myBodyParam: "blblbl"
 *     },
 *     headers: {
 *       'access-token': "XXXXXXXXXXX-XXXXX-XXXX-XXXXX-XXXXXXXX",
 *       'Guid': "XXXXXXXXXXX-XXXXX-XXXX-XXXXX-XXXXXXXX"
 *     }
 *   }, myVariables).render();
 *   if(!isPdfGenerated) alert("Error while generating PDF");
 * }
 */
declare abstract class Renderer {
    private templateContent;
    private templateFile;
    private lang;
    private variablesMap;
    private pdfOptions;
    private inDev;
    private icons;
    /**
     *
     * @param templateFile Name of the type of report (located in /public/template/__templateFile__)
     * @param lang  ISO 639-1 language code of the template to fetch inside [templateFile] folder
     * @param pdfOptions An object defining the way to transform the HTML to a PDF (Body should be html:string and header responseType: arraybuffer)
     * @param variables Map of KeyValue where Key is the identifier as a string and the Value the value translated to [lang]
     * @throws __Error__ if D.O type extension is not installed
     */
    constructor(templateFile: Template, lang: string, pdfOptions: PdfOptions, variables?: Map<string, string>, customIcons?: Icons, isInDeveloment?: boolean);
    /**
     * @summary Convert the template file to a PDF and automatically save it
     * @returns true if no exception
     * @throws return false if StatusCode of request is not 200 when generating PDF or if error appears during template conversion
     */
    render: () => Promise<Blob | undefined>;
    /**
     * @summary Convert the template file to an HTML and automatically save it
     * @description Use in development only!
     * @returns true if no exception
     * @throws Exption may appears, it is log in console
     */
    renderAsHtml: () => Promise<Blob | undefined>;
    private fetchTemplate;
    private injectDocType;
    private injectCss;
    private replaceVariable;
    private applyCondition;
    private getBlockTree;
    private escapeComments;
    private injectVariables;
    private injectModifiers;
    private SingleDepthTagDetection;
    private parseInlineModifiers;
    private constructInlineModifier;
    private parseParameters;
    private parseTreeParameter;
    private constructBlock;
    private parseJSONParam;
}
export default Renderer;
