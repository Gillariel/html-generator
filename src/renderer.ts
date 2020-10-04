import {
  HeaderSection,
  BusinessCoordonate,
  SectionWithContent,
  SectionWithContentAndPageBreak,
  HighlightedText,
  ListItem,
  List,
  Text,
  Paragraph,
  Grid,
  GridItem,
  Container,
  PageBreak,
  BoldParagraph,
  InnerText,
  ConditionalText,
} from './helper';
import { CheckSimpleCondition } from './condition-checker';
import moment from 'moment';

type Template = {
  location?: string;
  content?: string;
  css?: string;
};

type PdfOptions = {
  scheme: 'http' | 'https' | 'file';
  host: string;
  endpoint: string;
  body: { [key: string]: any };
  headers: { [key: string]: string };
  filename: string;
  notReportedLabel: string;
};

type Labels = {
  businessNameNonHightlighted: string;
  businessNameHightlighted: string;
  patientName: string;
  dateOfBirth: string;
  doctorName: string;
  dateOfReport: string;
};

type Block = {
  name: string;
  children?: Block[];
  param: Map<string, string>;
};

type MountingBlock = {
  children?: MountingBlock[];
  content: string;
};

type Icons = {
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
abstract class Renderer {
  private templateContent: string = '';
  private templateFile: Template = {} as Template;
  private lang: string = 'en-GB';
  private variablesMap: Map<string, string>;
  private pdfOptions = {} as PdfOptions;
  private inDev: boolean = false;
  private icons: Icons = {} as Icons;
  /**
   *
   * @param templateFile Name of the type of report (located in /public/template/__templateFile__)
   * @param lang  ISO 639-1 language code of the template to fetch inside [templateFile] folder
   * @param pdfOptions An object defining the way to transform the HTML to a PDF (Body should be html:string and header responseType: arraybuffer)
   * @param variables Map of KeyValue where Key is the identifier as a string and the Value the value translated to [lang]
   * @throws __Error__ if D.O type extension is not installed
   */
  constructor(
    templateFile: Template,
    lang: string,
    pdfOptions: PdfOptions,
    variables?: Map<string, string>,
    customIcons?: Icons,
    isInDeveloment?: boolean,
  ) {
    if (!(String.prototype as any).__isLetter) {
      throw new Error('Type prototype extensions is not installed');
    }
    if (!templateFile.location) {
      if (!templateFile.content) throw new Error('Template.content should be defined if Template.location is not set.');
      if (!templateFile.css) throw new Error('Template.css should be defined if Template.location is not set.');
    }
    if (customIcons) this.icons = customIcons;
    if (isInDeveloment !== undefined) this.inDev = isInDeveloment;
    this.templateFile = templateFile;
    this.lang = lang;
    this.pdfOptions = pdfOptions;
    this.variablesMap = new Map<string, string>();
    if (variables) {
      // Lower any keys to avoid typo from template
      variables.forEach((value, key) => this.variablesMap.set(key.toLowerCase(), value));
    }
  }

  /**
   * @summary Convert the template file to a PDF and automatically save it
   * @returns true if no exception
   * @throws return false if StatusCode of request is not 200 when generating PDF or if error appears during template conversion
   */
  public render = async (): Promise<Blob | undefined> => {
    const error = await this.fetchTemplate();
    if (error) return undefined;
    this.pdfOptions.body.html = this.templateContent;
    this.pdfOptions.headers['content-type'] = 'application/json';
    this.pdfOptions.headers['response-type'] = 'arraybuffer';
    const res = await fetch(`${this.pdfOptions.scheme}://${this.pdfOptions.host}${this.pdfOptions.endpoint}`, {
      method: 'POST',
      headers: this.pdfOptions.headers,
      body: JSON.stringify(this.pdfOptions.body),
    });
    if (res.status === 200) {
      const resBody = await res.arrayBuffer();
      if (resBody) return new Blob([resBody], { type: 'application/pdf' });
    }
    return undefined;
  };

  /**
   * @summary Convert the template file to an HTML and automatically save it
   * @description Use in development only!
   * @returns true if no exception
   * @throws Exption may appears, it is log in console
   */
  public renderAsHtml = async (): Promise<Blob | undefined> => {
    const error = await this.fetchTemplate();
    if (error) return undefined;
    return new Blob([this.templateContent], { type: 'text/html' });
  };

  private fetchTemplate = async (): Promise<void | string> => {
    try {
      const templateContent = this.templateFile.content
        ? this.templateFile.content
        : await (await fetch(`/template/${this.templateFile.location}/${this.lang}.template`)).text();

      const css = this.templateFile.css
        ? this.templateFile.css
        : await (await fetch(`/template/${this.templateFile.location}/css.css`)).text();

      if (templateContent) {
        let htmlBody = '';

        // THe problem is the missing block text is here during the construction/: => Result is a content starting with "undefined/... }})"
        // Some parsing should be wrong, due to what?
        const mountingBlocks = this.getBlockTree(templateContent);
        const blocks = this.parseTreeParameter(mountingBlocks);
        blocks
          .map((b) => this.constructBlock(b))
          .forEach((stringBlock) => {
            // Undefined = conditional non respected block OR not parsed in production block
            // trim is to avoid block of whitespace only
            if (stringBlock !== undefined && stringBlock.trim() !== '') htmlBody += stringBlock;
          });
        this.templateContent = this.injectCss(this.injectDocType(htmlBody), css).replace(/class"/g, 'class="');
        return;
      }
    } catch (error) {
      return error;
    }
  };

  private injectDocType = (html: string): string => {
    const docType = `
      <!DOCTYPE html>
      <html lang="${this.lang.split('-')[0]}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <style> __CSS__ </style> 
        <title>${this.templateFile.location ? this.templateFile.location : 'Report'} - ${this.lang}</title>
      </head>
      <body>
    `.trim();
    const result = docType + html + `</body></html>`;
    return result.replace(/(\r\n|\n|\r)/gm, '');
  };

  private injectCss = (html: string, css: string) => html.replace('__CSS__', css.replace(/(\r\n|\n|\r)/gm, ''));

  private replaceVariable = (variableName: string): string => {
    const variableValue = this.variablesMap.get(variableName.toLowerCase().trim());
    return variableValue ? variableValue : this.pdfOptions.notReportedLabel;
  };

  private applyCondition = (params: Map<string, string>): boolean => {
    const condition = params.get('condition');
    if (!condition) return true;

    // Starting by getting all && conditions as flat arrays since they are maximum priority
    let conditionFailed = false;
    const ANDs = condition.split('<AND>');
    ANDs.forEach((AND) => {
      // If true, current AND is not true => the all condition is not true!
      if (!conditionFailed)
        if (AND.split('<OR>').findIndex((OR) => CheckSimpleCondition(OR, this.pdfOptions.notReportedLabel)) === -1)
          conditionFailed = true;
    });
    // (`condition [${condition}]: ${conditionFailed ? "failed" : "pass" }`)
    return !conditionFailed;
  };

  //#region Block tree generation
  // As the detection is made in one level of depth, I had to recursively detect the next level of depth
  // Only if this level includes a [ (the detection is made char by char => heavy cost)
  private getBlockTree = (body: string): MountingBlock[] => {
    const escapedBody = this.escapeComments(body);
    const bodyWithVariable = this.injectVariables(escapedBody);
    const bodyWithVariableAndModifier = this.injectModifiers(bodyWithVariable);
    const data: MountingBlock[] = this.SingleDepthTagDetection(bodyWithVariableAndModifier);
    const innerFetching = (innerData: MountingBlock[]): MountingBlock[] => {
      innerData.forEach((shot, i) => {
        if (shot.content.includes('[')) {
          innerData[i] = {
            content: innerData[i].content.split('[[')[0],
            children: this.SingleDepthTagDetection(innerData[i].content),
          };
        }
      });

      innerData.forEach((de) => {
        if (de.children) {
          const indexMatching = de.children.findIndex((dd) => dd.content.includes('[[')) > -1;
          if (indexMatching) innerFetching(de.children);
        }
      });
      return innerData;
    };
    return innerFetching(data);
  };

  private escapeComments = (text: string): string => {
    let textWithoutComment = '';
    let isComment: 'none' | 'line' | 'block' = 'none';
    [...text].forEach((char, index) => {
      // Pretty simple comment system: // comment the line, /* block */ comment the all block
      if (char === '/' && isComment === 'none') {
        // /* is the beginning of a block comment
        if (text[index + 1] === '*') isComment = 'block';
        // // is the beginning of a line comment
        else if (text[index + 1] === '/' && text[index - 1] !== ':') isComment = 'line';
        else textWithoutComment += char;
      } else if (isComment !== 'none') {
        if (isComment === 'line') {
          /* Note in case of: line-break is OS dependant:
              For Windows, it is CRLF
              For UNIX, it is LF
              For MAC (up through version 9) it was CR
              For MAC OS X, it is LF
          */
          if (char === '\n' || (char === '\r' && text[index + 1] !== '\n')) isComment = 'none';
        }
        // */ is the ending of a block comment
        else if (char === '/' && text[index - 1] === '*') isComment = 'none';
      } else textWithoutComment += char;
    });
    return textWithoutComment;
  };

  private injectVariables = (text: string): string => {
    let result = text;
    let tempVariable = '';
    let isVariable = false;
    if (text.indexOf('@') > 0) {
      [...text].forEach((char) => {
        if (char === '@') isVariable = true;
        else if (isVariable) {
          if (char === ' ' || char === '$' || char === '}' || char === '{' || char === '<') {
            if (tempVariable !== '') {
              result = result.replace('@' + tempVariable, this.replaceVariable(tempVariable));
              isVariable = false;
              tempVariable = '';
            }
          } else tempVariable += char;
        }
      });
    }
    return result;
  };

  private injectModifiers = (text: string): string => {
    let result = text;
    if (text.indexOf('{{') > 0) {
      const allModiferNonFormatted = text.split('{{');
      allModiferNonFormatted.splice(0, 1);
      allModiferNonFormatted.forEach((mod) => {
        const modFormatted = mod.split('}}');
        if (modFormatted.length === 2) {
          const realModifier = modFormatted[0];
          const injectedModifier = this.constructInlineModifier(`{{${realModifier}}}`);
          result = result.replace(`{{${realModifier}}}`, injectedModifier);
        }
      });
    }
    return result;
  };

  // Pretty basic stuff here:
  // Just keep a counter of the number of the [ ] seen.
  // If the counter go back to 0, then the ] is the one that close the first [
  private SingleDepthTagDetection = (s: string): MountingBlock[] => {
    const blocks = new Array<MountingBlock>();
    let tempContent: string | undefined;
    let openingEndingRatio = 0;
    let cpt = 0;
    for (const char of s) {
      // While in comment mode, just do nothing to the buffer
      if (char === '[') {
        if (openingEndingRatio > 0) tempContent += char;
        else if (tempContent === undefined) tempContent = '';
        if (s[cpt - 1] === '[') openingEndingRatio++;
      } else if (char === ']') {
        if (s[cpt + 1] === ']') openingEndingRatio--;
        if (openingEndingRatio > 0) tempContent += char;
        else {
          if (tempContent !== undefined) {
            blocks.push({ content: tempContent });
            tempContent = undefined;
          }
        }
      }

      // If here, nothing has been detected, this is a normal char.
      else if (tempContent !== undefined) if (char !== '[' && char !== ']') tempContent += char;
      cpt++;
    }
    return blocks;
  };
  //#endregion

  //#region Inline Modifiers
  private parseInlineModifiers = (block: MountingBlock): void => {
    if (block.content.includes('{{')) {
      const regex = /(\{\{[^\}]+\}\})/gm; // fetch anything inside {{ }}
      let m = regex.exec(block.content);
      while (m !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) regex.lastIndex++;

        // The result can be accessed through the `m`-variable.
        m.forEach((match) => {
          block.content = block.content.replace(match, this.constructInlineModifier(match));
        });
        m = regex.exec(block.content);
      }
    }
  };

  private constructInlineModifier = (text: string): string => {
    text = text.replace('{{', '').replace('}}', '');
    text = text.trim();
    const splitted = text.split('$');
    const blockName = splitted[0].trim();
    const paramsRaw = [...splitted];
    paramsRaw.splice(0, 1);
    const params = new Map<string, string>();
    splitted.forEach((param) => {
      const splittedParam = param.split('=');
      if (splittedParam.length > 2) {
        // Need to check if a HTML from an Inline mofidier is here
        let value = '';
        splittedParam.forEach((v, i) => {
          if (i > 0 && splittedParam[i - 1].trim()[splittedParam[i - 1].trim().length - 1] !== '>') value += v + '=';
        });
        params.set(splittedParam[0], value);
      } else if (splittedParam.length === 2) params.set(splittedParam[0], splittedParam[1]);
    });
    if (!this.applyCondition(params)) {
      return '';
    }

    switch (blockName) {
      case 'HighlightedText':
        return HighlightedText(params.get('text') ? (params.get('text') as string) : '');
      case 'ConditionalText':
        return ConditionalText(params.get('text') ? (params.get('text') as string) : '');
      default:
        return `<span>Cannot parsed ${blockName}</span>`;
    }
  };
  //#endregion

  //#region Parameters
  private parseParameters = (block: MountingBlock): Block => {
    const constructedBlock = {
      name: '',
      param: new Map<string, string>(),
      children: block.children,
    } as Block;
    const splitted = block.content.split('$');
    constructedBlock.name = splitted[0];
    const params = [...splitted];
    params.splice(0, 1);
    for (const param of params) {
      // Just splitting the param identifier and the value as KeyValue to make a Map
      const kv = param.split('=');
      if (kv && kv.length >= 2) {
        if (kv.length > 2) {
          // Need to check if a HTML from an Inline mofidier is here
          let value = '';
          kv.forEach((v, i) => {
            if (i > 0) value += v;
          });
          constructedBlock.param.set(kv[0], value);
        } else constructedBlock.param.set(kv[0], kv[1]);
      }
    }
    return constructedBlock;
  };

  private parseTreeParameter = (blocks: MountingBlock[]): Block[] => {
    const results: Block[] = new Array();
    const recursivelyParseParameter = (block: MountingBlock): Block => {
      const parsedBlock = this.parseParameters(block);
      if (block.children && block.children.length > 0) {
        parsedBlock.children = block.children.map((b) => recursivelyParseParameter(b));
      }
      return parsedBlock;
    };
    blocks.forEach((b) => {
      results.push(recursivelyParseParameter(b));
    });
    return results;
  };
  //#endregion

  private constructBlock = (block: Block): string | undefined => {
    if (!this.applyCondition(block.param)) return undefined;

    const constructedChildren = new Array<string>();
    if (block.children) {
      block.children.forEach((c) => {
        const constructed = this.constructBlock(c);
        if (constructed !== undefined) constructedChildren.push(constructed);
      });
    }
    switch (block.name.trim()) {
      case 'HeaderSection': {
        const labels = this.parseJSONParam<Labels>(block.param.get('labels') as string);
        return HeaderSection(
          block.param.get('title') ? (block.param.get('title') as string) : '',
          block.param.get('titleColor') ? (block.param.get('titleColor') as string) : 'black',
          labels,
          this.icons.logo,
          {
            fullName: this.replaceVariable('FullName'),
            gender: this.replaceVariable('Gender'),
            DateOfBirth: this.replaceVariable('DateOfBirth'),
          },
          {
            lastName: this.replaceVariable('DoctorName'),
            consultationDate: moment(new Date()).format('DD/MM/YYYY'),
          },
        );
      }
      case 'SectionWithContent':
        return SectionWithContent(
          block.param.get('title') ? (block.param.get('title') as string) : '',
          constructedChildren,
        );
      case 'SectionWithContentAndPageBreak':
        return SectionWithContentAndPageBreak(
          block.param.get('title') ? (block.param.get('title') as string) : '',
          constructedChildren,
        );
      case 'Container':
        return Container();
      case 'PageBreak':
        return PageBreak();
      case 'Text':
        return Text(block.param.get('text') ? (block.param.get('text') as string) : '', constructedChildren);
      case 'Paragraph':
        return Paragraph(
          block.param.get('text') ? (block.param.get('text') as string) : '',
          block.param.get('align') ? (block.param.get('align') as any) : 'default',
          constructedChildren,
        );
      case 'BoldParagraph':
        return BoldParagraph(
          block.param.get('text') ? (block.param.get('text') as string) : '',
          block.param.get('boldText') ? (block.param.get('boldText') as any) : '',
          block.param.get('color') ? (block.param.get('color') as any) : 'black',
          constructedChildren,
        );
      case 'List':
        return List(block.param.get('text') ? (block.param.get('text') as string) : '', constructedChildren);
      case 'ListItem':
        return ListItem(
          block.param.get('text') ? (block.param.get('text') as string) : '',
          block.param.has('inline'),
          this.icons.checkedIcon,
          constructedChildren,
        );
      case 'Grid':
        return Grid(constructedChildren);
      case 'GridItem':
        return GridItem(block.param.get('size') ? Number(block.param.get('size')) : 12, constructedChildren);
      default:
        return this.inDev ? `<p>Cannot Parsed Tag ${block.name.trim()}</p>` : undefined;
    }
  };

  private parseJSONParam = <T>(json: string): T => {
    const res: T = {} as T;
    const keyValues = json.replace(/(\{|\})/gm, '');
    keyValues.split(',').forEach((keyValueStr) => {
      const keyValue = keyValueStr.split(':');
      if (keyValue.length === 2) {
        // @ts-ignore
        res[keyValue[0].trim()] = keyValue[1];
      } else {
        // Specific detection http link as value (img for example)
        if (keyValue.length > 2) {
          if (keyValue[1].includes('http')) {
            // @ts-ignore
            res[keyValue[0].trim()] = keyValue.slice(1).join(':').trim();
          }
        }
      }
    });
    return res;
  };
}

export default Renderer;
