"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalText = exports.InnerText = exports.HighlightedText = exports.Video = exports.Img = exports.GridItem = exports.Grid = exports.BoldParagraph = exports.Paragraph = exports.Text = exports.ListItem = exports.List = exports.PageBreak = exports.Container = exports.SectionWithContentAndPageBreak = exports.SectionWithContent = exports.SectionContentWithPageBreak = exports.SectionContent = exports.SectionSubtitle = exports.Section = exports.HeaderSection = void 0;
var Block;
(function (Block) {
    Block["HeaderSection"] = "HeaderSection";
    Block["Section"] = "Section";
})(Block || (Block = {}));
var HeaderSection = function (title, titleColor, labels, logo, patient, doctor) {
    var res = "<div class=\"container\">\n    <div class=\"col col-3\">\n      <div class=\"col-content\"></div>\n    </div>\n    <div class=\"col col-6\">\n      <h2 class=\"header-title color--" + titleColor + "\">" + title + "</h2>\n    </div>\n    <div style=\"max-height:150px\" class=\"col col-3\">\n      " + (logo && logo.includes('<svg')
        ? "<div style=\"width: 100%\" class=\"col-content\">" + logo + "</div>"
        : "<img width=\"100%\" class=\"col-content\" src='" + logo + "' />") + "\n      <p style=\"width: 100%; margin-left: 30px;\">3DOrtho<span style=\"color: #7db700\"><b>Check</b></span></p>\n    </div>\n  </div>\n  <div \n  <div class=\"header-section\">\n    <div style=\"margin: 0% 2%\">\n      <div class=\"col col-6\">\n        <p>" + labels.patientName + " : <span class=\"data-text\">" + patient.fullName + "</span> (<span class=\"data-text\">" + patient.gender + "</span>)</p>\n        <p>" + labels.dateOfBirth + " : <span class=\"data-text\">" + patient.DateOfBirth + "</span></p>\n      </div>\n      <div class=\"col col-6\">\n        <p style=\"text-align:right\">" + labels.doctorName + " : <span class=\"data-text\">" + doctor.lastName + "</span></p>\n        <p style=\"text-align:right\">" + labels.dateOfReport + " : <span class=\"data-text\">" + doctor.consultationDate + "</span></p>\n      </div>\n    </div>\n  </div>";
    res.trim();
    return res;
};
exports.HeaderSection = HeaderSection;
var Section = function (title) { return "<h2 class=\"section-title\">" + title + "</h2>"; };
exports.Section = Section;
var SectionSubtitle = function (subtitle) { return "<p class=\"section-subtitle\">" + subtitle + "</p>"; };
exports.SectionSubtitle = SectionSubtitle;
var SectionContent = function (children) {
    return ("<div class=\"section-content\">" + (children && children.join('')) + "</div>").trim();
};
exports.SectionContent = SectionContent;
var SectionContentWithPageBreak = function (children) {
    return "<div class=\"section-content page-break-section\">" + (children && children.join('')) + "</div>";
};
exports.SectionContentWithPageBreak = SectionContentWithPageBreak;
var SectionWithContent = function (title, children) { return "" + Section(title) + SectionContent(children); };
exports.SectionWithContent = SectionWithContent;
var SectionWithContentAndPageBreak = function (title, children) {
    return "" + Section(title) + SectionContentWithPageBreak(children);
};
exports.SectionWithContentAndPageBreak = SectionWithContentAndPageBreak;
var Container = function (children) { return "<div>" + (children && children.join('')) + "</div>"; };
exports.Container = Container;
var PageBreak = function (children) {
    return "<div style=\"page-break-before: always\">" + (children && children.join('')) + "</div>";
};
exports.PageBreak = PageBreak;
var Text = function (text, children) { return "<span>" + text + " " + (children && children.join('')) + "</span>"; };
exports.Text = Text;
var Paragraph = function (text, align, children) {
    return "<p class=\"--align-" + align + "\">" + text + (children && children.join('')) + "</p>";
};
exports.Paragraph = Paragraph;
var BoldParagraph = function (text, boldText, color, children) {
    return "<p>\n    " + (boldText && "<b style=\"color: " + color + "\">" + boldText + "</b>") + "\n    " + text + (children && children.join('')) + "\n  </p>";
};
exports.BoldParagraph = BoldParagraph;
var List = function (title, children) {
    return "<ul >" + (title ? "<p>" + title + "</p>" : '') + (children && children.join('')) + "</ul>";
};
exports.List = List;
var ListItem = function (text, isInline, checkedIcon, children) { return "<li " + (isInline ? 'style="display: inline-block; width: 49%; vertical-align: top;"' : '') + " " + (checkedIcon && 'class="no-bullet"') + ">\n  " + (checkedIcon && checkedIcon.includes('<svg')
    ? "<div class=\"icon\">" + checkedIcon + "</div>"
    : "<img src='" + checkedIcon + "' class=\"icon\" />") + "\n  " + text + " " + (children && children.join('')) + "\n</li>"; };
exports.ListItem = ListItem;
var Grid = function (children) { return "<div class=\"container\">" + (children && children.join('')) + "</div>"; };
exports.Grid = Grid;
var GridItem = function (size, children) {
    return "<div class=\"col col-" + size + "\"><div class=\"col-content\">" + (children && children.join('')) + "</div></div>";
};
exports.GridItem = GridItem;
var Img = function (url) { return "<img src=" + url + " />"; };
exports.Img = Img;
var Video = function (src) { return "<video src=" + src + "/>"; };
exports.Video = Video;
var HighlightedText = function (text) { return "<span class=\"data-text\">" + text + "</span>"; };
exports.HighlightedText = HighlightedText;
var InnerText = function (text) { return "" + text; };
exports.InnerText = InnerText;
var ConditionalText = function (text) { return "<span>" + text + "</span>"; };
exports.ConditionalText = ConditionalText;
