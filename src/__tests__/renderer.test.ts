import '../index';
import Renderer from '../index';

const simpleRenderer = class extends Renderer {};

const contentTest = `[[HeaderSection  $title=Anamnesis Report  $business={    building:My Building,    street:My street,    streetNumber:5,    postalCode:5000,    city:My city,    phoneNumber:+32 478 62 89 27,    imgSrc:https://blog-fr.orson.io/wp-content/uploads/2017/06/jpeg-ou-png.jpg  }]]/*[[Grid  [[GridItem $size=6    [[Paragraph $text=I'm a size 6 item]]  ]]  [[GridItem $size=3    [[Paragraph $text=I'm a size 3 item]]  ]]  [[GridItem $size=2    [[Paragraph $text=I'm a size 2 item]]  ]]  [[GridItem $size=1    [[Paragraph $text=I'm a size 1 item]]  ]]]]*/[[SectionWithContent  $title=Main Complaint  [[Paragraph    $align=center    $text=Patient presented with {{HightlightedText $text=@ComplaintSide}} complaint ({{HightlightedText $text=@ComplaintType}}).    Pain started {{HightlightedText $text=@ComplaintStart}} ago.  ]]  [[Paragraph    $text=@OtherSymptoms    $condition=OtherSymptoms  ]]  [[Paragraph    $text=Associated symptoms have been mentioned : {{HightlightedText $text=@AssociatedSymptoms}}    $condition=@AssociatedSymptoms  ]]  [[Paragraph    $text=Previous treatment(s) has/ve been undergone including :    $condition=@PreviousConservativeTreatments >> 0 <AND> @PreviousSurgicalTreatments>>0    [[List      [[ListItem        $text=Conservative treatments : {{HightlightedText $text=@PreviousConservativeTreatments}}      ]]      [[ListItem        $text=Surgical treatments : {{HightlightedText $text=@PreviousSurgicalTreatments}}      ]]    ]]  ]]  [[Paragraph    $text=Impact on activities : {{HightlightedText $text=@ImpactActivities}}  ]]  [[Paragraph    $text=Patient goals : {{HightlightedText $text=@PatientExpectations}}  ]]  [[Paragraph    $text=Expectations from treatment : {{HightlightedText $text=@TreatmentExpectations}}  ]]  [[Paragraph    $text=Footwear assessment : {{HightlightedText $text=@FootwearFeelings}}  ]]]][[SectionWithContentAndPageBreak  $title=Heatlh status & medical history  [[Paragraph    $text=The patient ({{HightlightedText $text=@Gender}}) is a {{HightlightedText $text=@Age}} years old with a BMI of {{HightlightedText $text=@BMI}}  ]]  [[Paragraph $text=Social history : the patient is ({{HightlightedText $text=@EmploymentType}})]].  [[Paragraph $text=Patient is a {{HightlightedText $text=@HowLongSmoke}}]].  [[Paragraph $text=Patient {{HightlightedText $text=@AlcoholConsumption}}]].  [[Paragraph $text=His / her physical activity level is {{HightlightedText $text=@SportFrequency}}]]  [[Paragraph $text=Concomitant diseases : {{HightlightedText $text=@ConcomitantDiseases}}]]  [[Paragraph $text=Concomitant medication : {{HightlightedText $text=@ConcomitantMedication}}]]  [[Paragraph $text=Allergies : {{HightlightedText $text=@Allergies}}]]  [[Paragraph    $text=General Inquiry :    [[List      [[ListItem $text=Post-operative complications : {{HightlightedText $text=@OperativeComplications}}]]      [[ListItem $text=General symptoms : {{HightlightedText $text=@GeneralHealth}}]]    ]]  ]]  [[Paragraph $text=Previous foot / ankle injuries : {{HightlightedText $text=@PreviousInjuries}}]]  [[Paragraph    $text=Surgical history :    [[List      [[ListItem $text=Injury related : {{HightlightedText $text=@SurgicalHistoryInjury}}]]      [[ListItem $text=Prosthetics related : {{HightlightedText $text=@Prosthetics}}]]      [[ListItem $text=Other surgery : {{HightlightedText $text=@SurgicalHistoryOther}}]]    ]]  ]]]][[FooterSection  $text=Patient is advised to follow-up in X weeks / months]]`;
const cssTest = `.container{max-width:100%;margin:0 auto;display:block}.col{display:inline-block;width:100%}.col-1{max-width:8.3333333333%}.col-2{max-width:16.6666666667%}.col-3{max-width:25%}.col-4{max-width:33.3333333333%}.col-5{max-width:41.6666666667%}.col-6{max-width:50%}.col-7{max-width:58.3333333333%}.col-8{max-width:66.6666666667%}.col-9{max-width:75%}.col-10{max-width:83.3333333333%}.col-11{max-width:91.6666666667%}.col-12{max-width:100%}.col-content{background-color:#fff;border:#fff0f5 2px solid;border-radius:8px;padding:16px}.--align-center{text-align:center}.--align-right{text-align:right}.header-section{height:2%;width:100%;border-bottom:1px solid#2484f2;text-align:center}.header-title{text-align:center;justify-content:center;text-decoration:underline;text-decoration-color:#00f;text-decoration-skip:1;font-weight:700;font-style:italic}.header-elements{display:flex;flex-wrap:nowrap;flex-direction:row}.header-elements-2{display:flex;flex-wrap:nowrap;flex-direction:row}.header-element-1{order:1;text-align:left}.header-element-2{order:2;text-align:left}.inline{display:inline-block}.data-text{color:#2484f2;font-style:italic}.section-title{margin-left:20px;text-align:left;font-style:italic;color:#3a3c3f;text-decoration:underline;text-decoration-color:#2484f2;text-decoration-skip:1}.section-subtitle{margin-left:20px;margin-top:10px;text-align:left;color:#2484f2;font-weight:700;font-size:18px}.section-content{text-align:left;margin-left:40px;font-style:italic;margin-right:30px;break-after:avoid!important;break-before:avoid!important}.page-break-section{page-break-after:always}li::marker{content:"(" counter(list-item,lower-roman) ")"}li{display:list-item}p{margin:7px}`;

test('to compile', () => expect(true).toBe(true));

// test('b', async () => {
//   (String.prototype as any).__isLetter = () => true;
//   const reportVar = new Map<string, string>();
//   reportVar.set("ComplAintType", "This is a complaint type")
//   const blob = await new simpleRenderer({
//     content: contentTest,
//     css: cssTest
//   }, "en-GB", {
//     scheme: "https",
//     host: "jabba-maker.3doxpert.com",
//     endpoint: "/create-pdf",
//     filename: "anamnesis-report",
//     notReportedLabel: "Not reported",
//     body: {},
//     headers: {}
//   }, reportVar).render()
//   expect(blob).toBeDefined();
// })
// describe("Renderer", () => {
//   describe("Constructor", () => {

//   })
//   describe("render", () => {
//     test('A letter is a letter', () => {
//       expect("baiuebfgaeiudbgaie".__isLetter()).toBe(true);
//     });
//     test('Unicode characters are letters', () => {
//       expect("âéèçàèìùûôêâöïëä".__isLetter()).toBe(true);
//     })
//   });
//   describe("renderAsHTML", () => {
//     test('A letter is a letter', () => {
//       expect("baiuebfgaeiudbgaie".__isLetter()).toBe(true);
//     });
//     test('Unicode characters are letters', () => {
//       expect("âéèçàèìùûôêâöïëä".__isLetter()).toBe(true);
//     })
//     test('Whitespace is not a letter', () => {
//       expect(" ".__isLetter()).toBe(false);
//     })
//   });
// });
