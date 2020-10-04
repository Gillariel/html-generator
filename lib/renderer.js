"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var condition_checker_1 = require("./condition-checker");
var moment_1 = __importDefault(require("moment"));
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
var Renderer = /** @class */ (function () {
    /**
     *
     * @param templateFile Name of the type of report (located in /public/template/__templateFile__)
     * @param lang  ISO 639-1 language code of the template to fetch inside [templateFile] folder
     * @param pdfOptions An object defining the way to transform the HTML to a PDF (Body should be html:string and header responseType: arraybuffer)
     * @param variables Map of KeyValue where Key is the identifier as a string and the Value the value translated to [lang]
     * @throws __Error__ if D.O type extension is not installed
     */
    function Renderer(templateFile, lang, pdfOptions, variables, customIcons, isInDeveloment) {
        var _this = this;
        this.templateContent = '';
        this.templateFile = {};
        this.lang = 'en-GB';
        this.pdfOptions = {};
        this.inDev = false;
        this.icons = {};
        /**
         * @summary Convert the template file to a PDF and automatically save it
         * @returns true if no exception
         * @throws return false if StatusCode of request is not 200 when generating PDF or if error appears during template conversion
         */
        this.render = function () { return __awaiter(_this, void 0, void 0, function () {
            var error, res, resBody;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchTemplate()];
                    case 1:
                        error = _a.sent();
                        if (error)
                            return [2 /*return*/, undefined];
                        this.pdfOptions.body.html = this.templateContent;
                        this.pdfOptions.headers['content-type'] = 'application/json';
                        this.pdfOptions.headers['response-type'] = 'arraybuffer';
                        return [4 /*yield*/, fetch(this.pdfOptions.scheme + "://" + this.pdfOptions.host + this.pdfOptions.endpoint, {
                                method: 'POST',
                                headers: this.pdfOptions.headers,
                                body: JSON.stringify(this.pdfOptions.body),
                            })];
                    case 2:
                        res = _a.sent();
                        if (!(res.status === 200)) return [3 /*break*/, 4];
                        return [4 /*yield*/, res.arrayBuffer()];
                    case 3:
                        resBody = _a.sent();
                        if (resBody)
                            return [2 /*return*/, new Blob([resBody], { type: 'application/pdf' })];
                        _a.label = 4;
                    case 4: return [2 /*return*/, undefined];
                }
            });
        }); };
        /**
         * @summary Convert the template file to an HTML and automatically save it
         * @description Use in development only!
         * @returns true if no exception
         * @throws Exption may appears, it is log in console
         */
        this.renderAsHtml = function () { return __awaiter(_this, void 0, void 0, function () {
            var error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchTemplate()];
                    case 1:
                        error = _a.sent();
                        if (error)
                            return [2 /*return*/, undefined];
                        return [2 /*return*/, new Blob([this.templateContent], { type: 'text/html' })];
                }
            });
        }); };
        this.fetchTemplate = function () { return __awaiter(_this, void 0, void 0, function () {
            var templateContent, _a, css, _b, htmlBody_1, mountingBlocks, blocks, error_1;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 9, , 10]);
                        if (!this.templateFile.content) return [3 /*break*/, 1];
                        _a = this.templateFile.content;
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, fetch("/template/" + this.templateFile.location + "/" + this.lang + ".template")];
                    case 2: return [4 /*yield*/, (_c.sent()).text()];
                    case 3:
                        _a = _c.sent();
                        _c.label = 4;
                    case 4:
                        templateContent = _a;
                        if (!this.templateFile.css) return [3 /*break*/, 5];
                        _b = this.templateFile.css;
                        return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, fetch("/template/" + this.templateFile.location + "/css.css")];
                    case 6: return [4 /*yield*/, (_c.sent()).text()];
                    case 7:
                        _b = _c.sent();
                        _c.label = 8;
                    case 8:
                        css = _b;
                        if (templateContent) {
                            htmlBody_1 = '';
                            mountingBlocks = this.getBlockTree(templateContent);
                            blocks = this.parseTreeParameter(mountingBlocks);
                            blocks
                                .map(function (b) { return _this.constructBlock(b); })
                                .forEach(function (stringBlock) {
                                // Undefined = conditional non respected block OR not parsed in production block
                                // trim is to avoid block of whitespace only
                                if (stringBlock !== undefined && stringBlock.trim() !== '')
                                    htmlBody_1 += stringBlock;
                            });
                            this.templateContent = this.injectCss(this.injectDocType(htmlBody_1), css).replace(/class"/g, 'class="');
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 10];
                    case 9:
                        error_1 = _c.sent();
                        return [2 /*return*/, error_1];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.injectDocType = function (html) {
            var docType = ("\n      <!DOCTYPE html>\n      <html lang=\"" + _this.lang.split('-')[0] + "\">\n      <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n        <style> __CSS__ </style> \n        <title>" + (_this.templateFile.location ? _this.templateFile.location : 'Report') + " - " + _this.lang + "</title>\n      </head>\n      <body>\n    ").trim();
            var result = docType + html + "</body></html>";
            return result.replace(/(\r\n|\n|\r)/gm, '');
        };
        this.injectCss = function (html, css) { return html.replace('__CSS__', css.replace(/(\r\n|\n|\r)/gm, '')); };
        this.replaceVariable = function (variableName) {
            var variableValue = _this.variablesMap.get(variableName.toLowerCase().trim());
            return variableValue ? variableValue : _this.pdfOptions.notReportedLabel;
        };
        this.applyCondition = function (params) {
            var condition = params.get('condition');
            if (!condition)
                return true;
            // Starting by getting all && conditions as flat arrays since they are maximum priority
            var conditionFailed = false;
            var ANDs = condition.split('<AND>');
            ANDs.forEach(function (AND) {
                // If true, current AND is not true => the all condition is not true!
                if (!conditionFailed)
                    if (AND.split('<OR>').findIndex(function (OR) { return condition_checker_1.CheckSimpleCondition(OR, _this.pdfOptions.notReportedLabel); }) === -1)
                        conditionFailed = true;
            });
            // (`condition [${condition}]: ${conditionFailed ? "failed" : "pass" }`)
            return !conditionFailed;
        };
        //#region Block tree generation
        // As the detection is made in one level of depth, I had to recursively detect the next level of depth
        // Only if this level includes a [ (the detection is made char by char => heavy cost)
        this.getBlockTree = function (body) {
            var escapedBody = _this.escapeComments(body);
            var bodyWithVariable = _this.injectVariables(escapedBody);
            var bodyWithVariableAndModifier = _this.injectModifiers(bodyWithVariable);
            var data = _this.SingleDepthTagDetection(bodyWithVariableAndModifier);
            var innerFetching = function (innerData) {
                innerData.forEach(function (shot, i) {
                    if (shot.content.includes('[')) {
                        innerData[i] = {
                            content: innerData[i].content.split('[[')[0],
                            children: _this.SingleDepthTagDetection(innerData[i].content),
                        };
                    }
                });
                innerData.forEach(function (de) {
                    if (de.children) {
                        var indexMatching = de.children.findIndex(function (dd) { return dd.content.includes('[['); }) > -1;
                        if (indexMatching)
                            innerFetching(de.children);
                    }
                });
                return innerData;
            };
            return innerFetching(data);
        };
        this.escapeComments = function (text) {
            var textWithoutComment = '';
            var isComment = 'none';
            __spread(text).forEach(function (char, index) {
                // Pretty simple comment system: // comment the line, /* block */ comment the all block
                if (char === '/' && isComment === 'none') {
                    // /* is the beginning of a block comment
                    if (text[index + 1] === '*')
                        isComment = 'block';
                    // // is the beginning of a line comment
                    else if (text[index + 1] === '/' && text[index - 1] !== ':')
                        isComment = 'line';
                    else
                        textWithoutComment += char;
                }
                else if (isComment !== 'none') {
                    if (isComment === 'line') {
                        /* Note in case of: line-break is OS dependant:
                            For Windows, it is CRLF
                            For UNIX, it is LF
                            For MAC (up through version 9) it was CR
                            For MAC OS X, it is LF
                        */
                        if (char === '\n' || (char === '\r' && text[index + 1] !== '\n'))
                            isComment = 'none';
                    }
                    // */ is the ending of a block comment
                    else if (char === '/' && text[index - 1] === '*')
                        isComment = 'none';
                }
                else
                    textWithoutComment += char;
            });
            return textWithoutComment;
        };
        this.injectVariables = function (text) {
            var result = text;
            var tempVariable = '';
            var isVariable = false;
            if (text.indexOf('@') > 0) {
                __spread(text).forEach(function (char) {
                    if (char === '@')
                        isVariable = true;
                    else if (isVariable) {
                        if (char === ' ' || char === '$' || char === '}' || char === '{' || char === '<') {
                            if (tempVariable !== '') {
                                result = result.replace('@' + tempVariable, _this.replaceVariable(tempVariable));
                                isVariable = false;
                                tempVariable = '';
                            }
                        }
                        else
                            tempVariable += char;
                    }
                });
            }
            return result;
        };
        this.injectModifiers = function (text) {
            var result = text;
            if (text.indexOf('{{') > 0) {
                var allModiferNonFormatted = text.split('{{');
                allModiferNonFormatted.splice(0, 1);
                allModiferNonFormatted.forEach(function (mod) {
                    var modFormatted = mod.split('}}');
                    if (modFormatted.length === 2) {
                        var realModifier = modFormatted[0];
                        var injectedModifier = _this.constructInlineModifier("{{" + realModifier + "}}");
                        result = result.replace("{{" + realModifier + "}}", injectedModifier);
                    }
                });
            }
            return result;
        };
        // Pretty basic stuff here:
        // Just keep a counter of the number of the [ ] seen.
        // If the counter go back to 0, then the ] is the one that close the first [
        this.SingleDepthTagDetection = function (s) {
            var e_1, _a;
            var blocks = new Array();
            var tempContent;
            var openingEndingRatio = 0;
            var cpt = 0;
            try {
                for (var s_1 = __values(s), s_1_1 = s_1.next(); !s_1_1.done; s_1_1 = s_1.next()) {
                    var char = s_1_1.value;
                    // While in comment mode, just do nothing to the buffer
                    if (char === '[') {
                        if (openingEndingRatio > 0)
                            tempContent += char;
                        else if (tempContent === undefined)
                            tempContent = '';
                        if (s[cpt - 1] === '[')
                            openingEndingRatio++;
                    }
                    else if (char === ']') {
                        if (s[cpt + 1] === ']')
                            openingEndingRatio--;
                        if (openingEndingRatio > 0)
                            tempContent += char;
                        else {
                            if (tempContent !== undefined) {
                                blocks.push({ content: tempContent });
                                tempContent = undefined;
                            }
                        }
                    }
                    // If here, nothing has been detected, this is a normal char.
                    else if (tempContent !== undefined)
                        if (char !== '[' && char !== ']')
                            tempContent += char;
                    cpt++;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (s_1_1 && !s_1_1.done && (_a = s_1.return)) _a.call(s_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return blocks;
        };
        //#endregion
        //#region Inline Modifiers
        this.parseInlineModifiers = function (block) {
            if (block.content.includes('{{')) {
                var regex = /(\{\{[^\}]+\}\})/gm; // fetch anything inside {{ }}
                var m = regex.exec(block.content);
                while (m !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (m.index === regex.lastIndex)
                        regex.lastIndex++;
                    // The result can be accessed through the `m`-variable.
                    m.forEach(function (match) {
                        block.content = block.content.replace(match, _this.constructInlineModifier(match));
                    });
                    m = regex.exec(block.content);
                }
            }
        };
        this.constructInlineModifier = function (text) {
            text = text.replace('{{', '').replace('}}', '');
            text = text.trim();
            var splitted = text.split('$');
            var blockName = splitted[0].trim();
            var paramsRaw = __spread(splitted);
            paramsRaw.splice(0, 1);
            var params = new Map();
            splitted.forEach(function (param) {
                var splittedParam = param.split('=');
                if (splittedParam.length > 2) {
                    // Need to check if a HTML from an Inline mofidier is here
                    var value_1 = '';
                    splittedParam.forEach(function (v, i) {
                        if (i > 0 && splittedParam[i - 1].trim()[splittedParam[i - 1].trim().length - 1] !== '>')
                            value_1 += v + '=';
                    });
                    params.set(splittedParam[0], value_1);
                }
                else if (splittedParam.length === 2)
                    params.set(splittedParam[0], splittedParam[1]);
            });
            if (!_this.applyCondition(params)) {
                return '';
            }
            switch (blockName) {
                case 'HighlightedText':
                    return helper_1.HighlightedText(params.get('text') ? params.get('text') : '');
                case 'ConditionalText':
                    return helper_1.ConditionalText(params.get('text') ? params.get('text') : '');
                default:
                    return "<span>Cannot parsed " + blockName + "</span>";
            }
        };
        //#endregion
        //#region Parameters
        this.parseParameters = function (block) {
            var e_2, _a;
            var constructedBlock = {
                name: '',
                param: new Map(),
                children: block.children,
            };
            var splitted = block.content.split('$');
            constructedBlock.name = splitted[0];
            var params = __spread(splitted);
            params.splice(0, 1);
            var _loop_1 = function (param) {
                // Just splitting the param identifier and the value as KeyValue to make a Map
                var kv = param.split('=');
                if (kv && kv.length >= 2) {
                    if (kv.length > 2) {
                        // Need to check if a HTML from an Inline mofidier is here
                        var value_2 = '';
                        kv.forEach(function (v, i) {
                            if (i > 0)
                                value_2 += v;
                        });
                        constructedBlock.param.set(kv[0], value_2);
                    }
                    else
                        constructedBlock.param.set(kv[0], kv[1]);
                }
            };
            try {
                for (var params_1 = __values(params), params_1_1 = params_1.next(); !params_1_1.done; params_1_1 = params_1.next()) {
                    var param = params_1_1.value;
                    _loop_1(param);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (params_1_1 && !params_1_1.done && (_a = params_1.return)) _a.call(params_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return constructedBlock;
        };
        this.parseTreeParameter = function (blocks) {
            var results = new Array();
            var recursivelyParseParameter = function (block) {
                var parsedBlock = _this.parseParameters(block);
                if (block.children && block.children.length > 0) {
                    parsedBlock.children = block.children.map(function (b) { return recursivelyParseParameter(b); });
                }
                return parsedBlock;
            };
            blocks.forEach(function (b) {
                results.push(recursivelyParseParameter(b));
            });
            return results;
        };
        //#endregion
        this.constructBlock = function (block) {
            if (!_this.applyCondition(block.param))
                return undefined;
            var constructedChildren = new Array();
            if (block.children) {
                block.children.forEach(function (c) {
                    var constructed = _this.constructBlock(c);
                    if (constructed !== undefined)
                        constructedChildren.push(constructed);
                });
            }
            switch (block.name.trim()) {
                case 'HeaderSection': {
                    var labels = _this.parseJSONParam(block.param.get('labels'));
                    return helper_1.HeaderSection(block.param.get('title') ? block.param.get('title') : '', block.param.get('titleColor') ? block.param.get('titleColor') : 'black', labels, _this.icons.logo, {
                        fullName: _this.replaceVariable('FullName'),
                        gender: _this.replaceVariable('Gender'),
                        DateOfBirth: _this.replaceVariable('DateOfBirth'),
                    }, {
                        lastName: _this.replaceVariable('DoctorName'),
                        consultationDate: moment_1.default(new Date()).format('DD/MM/YYYY'),
                    });
                }
                case 'SectionWithContent':
                    return helper_1.SectionWithContent(block.param.get('title') ? block.param.get('title') : '', constructedChildren);
                case 'SectionWithContentAndPageBreak':
                    return helper_1.SectionWithContentAndPageBreak(block.param.get('title') ? block.param.get('title') : '', constructedChildren);
                case 'Container':
                    return helper_1.Container();
                case 'PageBreak':
                    return helper_1.PageBreak();
                case 'Text':
                    return helper_1.Text(block.param.get('text') ? block.param.get('text') : '', constructedChildren);
                case 'Paragraph':
                    return helper_1.Paragraph(block.param.get('text') ? block.param.get('text') : '', block.param.get('align') ? block.param.get('align') : 'default', constructedChildren);
                case 'BoldParagraph':
                    return helper_1.BoldParagraph(block.param.get('text') ? block.param.get('text') : '', block.param.get('boldText') ? block.param.get('boldText') : '', block.param.get('color') ? block.param.get('color') : 'black', constructedChildren);
                case 'List':
                    return helper_1.List(block.param.get('text') ? block.param.get('text') : '', constructedChildren);
                case 'ListItem':
                    return helper_1.ListItem(block.param.get('text') ? block.param.get('text') : '', block.param.has('inline'), _this.icons.checkedIcon, constructedChildren);
                case 'Grid':
                    return helper_1.Grid(constructedChildren);
                case 'GridItem':
                    return helper_1.GridItem(block.param.get('size') ? Number(block.param.get('size')) : 12, constructedChildren);
                default:
                    return _this.inDev ? "<p>Cannot Parsed Tag " + block.name.trim() + "</p>" : undefined;
            }
        };
        this.parseJSONParam = function (json) {
            var res = {};
            var keyValues = json.replace(/(\{|\})/gm, '');
            keyValues.split(',').forEach(function (keyValueStr) {
                var keyValue = keyValueStr.split(':');
                if (keyValue.length === 2) {
                    // @ts-ignore
                    res[keyValue[0].trim()] = keyValue[1];
                }
                else {
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
        if (!String.prototype.__isLetter) {
            throw new Error('Type prototype extensions is not installed');
        }
        if (!templateFile.location) {
            if (!templateFile.content)
                throw new Error('Template.content should be defined if Template.location is not set.');
            if (!templateFile.css)
                throw new Error('Template.css should be defined if Template.location is not set.');
        }
        if (customIcons)
            this.icons = customIcons;
        if (isInDeveloment !== undefined)
            this.inDev = isInDeveloment;
        this.templateFile = templateFile;
        this.lang = lang;
        this.pdfOptions = pdfOptions;
        this.variablesMap = new Map();
        if (variables) {
            // Lower any keys to avoid typo from template
            variables.forEach(function (value, key) { return _this.variablesMap.set(key.toLowerCase(), value); });
        }
    }
    return Renderer;
}());
exports.default = Renderer;
