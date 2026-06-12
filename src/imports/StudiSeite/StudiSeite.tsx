import imgImageProfil from "./acc4291260e1f05f1a14cc0893d23296c2967e5d.png";

function Button() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Button">
      <p className="[word-break:break-word] font-['Segoe_UI:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#00718b] text-[14px] text-center whitespace-nowrap">← Zurück zur Modulwahl</p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col h-[24px] items-start left-0 pr-[993.578px] pt-[3px] top-0 w-[1152px]" data-name="Container">
      <Button />
    </div>
  );
}

function Text() {
  return (
    <div className="bg-[#e0f4f8] h-[24px] relative rounded-[4px] shrink-0 w-[84.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#005b70] text-[12px] whitespace-nowrap">Vertiefung A</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="bg-[#d4edda] h-[24px] relative rounded-[4px] shrink-0 w-[46.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#155724] text-[12px] whitespace-nowrap">Offen</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Bold',sans-serif] leading-[32px] min-w-px not-italic relative text-[#1d2125] text-[24px]">Projekt(rahmen): Mobile</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#6a737b] text-[14px]">Sommersemester 2026</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[104px] relative shrink-0 w-[937.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container4 />
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#00afd7] h-[44px] relative rounded-[10px] shrink-0 w-[148.5px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[24px] py-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Segoe_UI:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Jetzt bewerben</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[104px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Button1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[16px] min-w-px not-italic relative text-[#6a737b] text-[12px]">Lehrende</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#1d2125] text-[14px]">Prof. Dr.-Ing. Christian Noss</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[40px] items-start left-0 top-[17px] w-[356.656px]" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[16px] min-w-px not-italic relative text-[#6a737b] text-[12px]">Verfügbare Plätze</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Bold',sans-serif] leading-[20px] min-w-px not-italic relative text-[#1d2125] text-[14px]">18 Plätze</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[40px] items-start left-[372.66px] top-[17px] w-[356.672px]" data-name="Container">
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[16px] min-w-px not-italic relative text-[#6a737b] text-[12px]">Bewerbungsfrist</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#1d2125] text-[14px]">08.04.2026, 08:00 Uhr</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[40px] items-start left-[745.33px] top-[17px] w-[356.656px]" data-name="Container">
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[57px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dee2e6] border-solid border-t inset-0 pointer-events-none" />
      <Container6 />
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_2px_2px_rgba(0,0,0,0.08)] flex flex-col gap-[16px] h-[227px] items-start left-0 pb-px pt-[25px] px-[25px] rounded-[10px] top-[36px] w-[1152px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.13)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container2 />
      <Container5 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="[word-break:break-word] absolute font-['Segoe_UI:Bold',sans-serif] leading-[28px] left-0 not-italic text-[#1d2125] text-[18px] top-[-1px] whitespace-nowrap">Kurzbeschreibung</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[45.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Segoe_UI:Regular',sans-serif] leading-[22.75px] left-0 not-italic text-[#6a737b] text-[14px] top-[-1px] w-[1110px]">In diesem Projekt konzentrieren wir uns auf die Entwicklung von Mobile-First Anwendungen. Sie lernen die Besonderheiten mobiler Plattformen kennen und entwickeln eine eigene App.</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_2px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[12px] h-[127.5px] items-start left-0 pb-px pt-[21px] px-[21px] rounded-[10px] top-[283px] w-[1152px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.13)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Heading1 />
      <Paragraph7 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="[word-break:break-word] absolute font-['Segoe_UI:Bold',sans-serif] leading-[28px] left-0 not-italic text-[#1d2125] text-[18px] top-[-1px] whitespace-nowrap">{`Inhalte & Ziele`}</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#00afd7] text-[14px] whitespace-nowrap">•</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[185.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6a737b] text-[14px] whitespace-nowrap">Mobile-First Design Prinzipien</p>
      </div>
    </div>
  );
}

function ListItem() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#00afd7] text-[14px] whitespace-nowrap">•</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[241.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6a737b] text-[14px] whitespace-nowrap">Native und Cross-Platform Entwicklung</p>
      </div>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#00afd7] text-[14px] whitespace-nowrap">•</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[191.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6a737b] text-[14px] whitespace-nowrap">Mobile User Experience Design</p>
      </div>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text6 />
      <Text7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#00afd7] text-[14px] whitespace-nowrap">•</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[274.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6a737b] text-[14px] whitespace-nowrap">Performance-Optimierung für mobile Geräte</p>
      </div>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text8 />
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#00afd7] text-[14px] whitespace-nowrap">•</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[199.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="[word-break:break-word] font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6a737b] text-[14px] whitespace-nowrap">App-Publishing und Distribution</p>
      </div>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text10 />
      <Text11 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[132px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
      <ListItem4 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_2px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[12px] h-[214px] items-start left-0 pb-px pt-[21px] px-[21px] rounded-[10px] top-[430.5px] w-[1152px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.13)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Heading2 />
      <List />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="[word-break:break-word] absolute font-['Segoe_UI:Bold',sans-serif] leading-[28px] left-0 not-italic text-[#1d2125] text-[18px] top-[-1px] whitespace-nowrap">Voraussetzungen</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[22.75px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Segoe_UI:Regular',sans-serif] leading-[22.75px] left-0 not-italic text-[#6a737b] text-[14px] top-[-1px] whitespace-nowrap">Programmierkenntnisse, Interesse an Mobile Development</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_2px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[12px] h-[104.75px] items-start left-0 pb-px pt-[21px] px-[21px] rounded-[10px] top-[664.5px] w-[1152px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.13)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Heading3 />
      <Paragraph8 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="[word-break:break-word] absolute font-['Segoe_UI:Bold',sans-serif] leading-[28px] left-0 not-italic text-[#1d2125] text-[18px] top-[-1px] whitespace-nowrap">Organisation</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[16px] min-w-px not-italic relative text-[#6a737b] text-[12px]">Rhythmus</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#1d2125] text-[14px]">Wöchentlich, 4 SWS</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[40px] items-start left-0 top-0 w-[547px]" data-name="Container">
      <Paragraph9 />
      <Paragraph10 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[16px] min-w-px not-italic relative text-[#6a737b] text-[12px]">Workload</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#1d2125] text-[14px]">ca. 300 Stunden pro Semester</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[40px] items-start left-[563px] top-0 w-[547px]" data-name="Container">
      <Paragraph11 />
      <Paragraph12 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[16px] min-w-px not-italic relative text-[#6a737b] text-[12px]">Projekttyp</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#1d2125] text-[14px]">Einzelarbeit oder Zweierteams</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[40px] items-start left-0 top-[56px] w-[547px]" data-name="Container">
      <Paragraph13 />
      <Paragraph14 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[16px] min-w-px not-italic relative text-[#6a737b] text-[12px]">Sprache</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#1d2125] text-[14px]">Deutsch</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[40px] items-start left-[563px] top-[56px] w-[547px]" data-name="Container">
      <Paragraph15 />
      <Paragraph16 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[16px] min-w-px not-italic relative text-[#6a737b] text-[12px]">Format</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#1d2125] text-[14px]">Hybrid (Präsenz + Online)</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[40px] items-start left-0 top-[112px] w-[547px]" data-name="Container">
      <Paragraph17 />
      <Paragraph18 />
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[16px] min-w-px not-italic relative text-[#6a737b] text-[12px]">Verfügbarkeit</p>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#1d2125] text-[14px]">Sommersemester 2026</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[40px] items-start left-[563px] top-[112px] w-[547px]" data-name="Container">
      <Paragraph19 />
      <Paragraph20 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[152px] relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
      <Container16 />
      <Container17 />
      <Container18 />
      <Container19 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_2px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] h-[238px] items-start left-0 pb-px pt-[21px] px-[21px] rounded-[10px] top-[789.25px] w-[1152px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.13)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Heading4 />
      <Container13 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="[word-break:break-word] absolute font-['Segoe_UI:Bold',sans-serif] leading-[28px] left-0 not-italic text-[#1d2125] text-[18px] top-[-1px] whitespace-nowrap">Bewerbungsinformationen</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[16px] min-w-px not-italic relative text-[#6a737b] text-[12px]">Bewerbungstyp</p>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#1d2125] text-[14px]">Priorisiertes Bewerbungsverfahren</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph21 />
      <Paragraph22 />
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[16px] min-w-px not-italic relative text-[#6a737b] text-[12px]">Motivationsschreiben</p>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#1d2125] text-[14px]">Nicht erforderlich</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph23 />
      <Paragraph24 />
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[16px] min-w-px not-italic relative text-[#6a737b] text-[12px]">Auswahlverfahren</p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#1d2125] text-[14px]">Vergabe nach Priorität und verfügbaren Plätzen</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph25 />
      <Paragraph26 />
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[16px] min-w-px not-italic relative text-[#6a737b] text-[12px]">Mehrfachbewerbungen</p>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#1d2125] text-[14px]">Erlaubt</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph27 />
      <Paragraph28 />
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[16px] min-w-px not-italic relative text-[#6a737b] text-[12px]">Wiederverwendung in Folgesemestern</p>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#1d2125] text-[14px]">Möglich</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph29 />
      <Paragraph30 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[248px] items-start relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container23 />
      <Container24 />
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_2px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] h-[334px] items-start left-0 pb-px pt-[21px] px-[21px] rounded-[10px] top-[1047.25px] w-[1152px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.13)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Heading5 />
      <Container21 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="[word-break:break-word] absolute font-['Segoe_UI:Bold',sans-serif] leading-[28px] left-0 not-italic text-[#1d2125] text-[18px] top-[-1px] whitespace-nowrap">Lehrende</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-[#00afd7] content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Container">
      <p className="[word-break:break-word] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">PD</p>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Segoe_UI:Semi_Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1d2125] text-[14px] whitespace-nowrap">Prof. Dr.-Ing. Christian Noss</p>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[16px] min-w-px not-italic relative text-[#6a737b] text-[12px]">Fachbereich Medien</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start relative shrink-0 w-[174.563px]" data-name="Container">
      <Paragraph31 />
      <Paragraph32 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center relative shrink-0 w-full" data-name="Container">
      <Container29 />
      <Container30 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_2px_1px_rgba(0,0,0,0.06)] flex flex-col gap-[16px] h-[126px] items-start left-0 pb-px pt-[21px] px-[21px] rounded-[10px] top-[1401.25px] w-[1152px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.13)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Heading6 />
      <Container28 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#00afd7] h-[44px] relative rounded-[10px] shrink-0 w-[164.5px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[32px] py-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Segoe_UI:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Jetzt bewerben</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex h-[84px] items-start justify-center left-0 pb-[24px] pt-[16px] px-[493.75px] top-[1547.25px] w-[1152px]" data-name="Container">
      <Button2 />
    </div>
  );
}

function AngebotDetailPage() {
  return (
    <div className="h-[1631.25px] relative shrink-0 w-full" data-name="AngebotDetailPage">
      <Container />
      <Container1 />
      <Container9 />
      <Container10 />
      <Container11 />
      <Container12 />
      <Container20 />
      <Container27 />
      <Container31 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="h-[1740.25px] relative shrink-0 w-full" data-name="Main Content">
      <div className="content-stretch flex flex-col items-start pt-[85px] px-[24px] relative size-full">
        <AngebotDetailPage />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f4f6f8] h-[1740.25px] relative shrink-0 w-full" data-name="App">
      <div className="content-stretch flex flex-col items-start px-[182px] relative size-full">
        <MainContent />
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="absolute content-stretch flex flex-col h-[896px] items-start left-0 top-[-844px] w-[1564px]" data-name="Body">
      <App />
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[60px] relative shrink-0 w-[104.047px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pr-[24px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[38px] not-italic relative shrink-0 text-[#e60028] text-[38px] uppercase whitespace-nowrap">HSD</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center left-0 px-[12px] py-[2px] top-0 w-[85.922px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid border-t-2 inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Segoe_UI:Medium',sans-serif] leading-[20.714px] not-italic relative shrink-0 text-[#6a737b] text-[14.5px] text-center whitespace-nowrap">Startseite</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[103.8px] size-[9px] top-[23.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
        <g id="Icon">
          <path d="M0 2.5L4.5 6.5L9 2.5H0Z" fill="var(--fill-0, #6A737B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid border-t-2 h-[60px] left-[85.92px] top-0 w-[124.797px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Segoe_UI:Medium',sans-serif] leading-[20.714px] left-[55px] not-italic text-[#6a737b] text-[14.5px] text-center top-[15.64px] whitespace-nowrap">Mein Bereich</p>
      <Icon />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[78.69px] size-[9px] top-[23.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
        <g id="Icon">
          <path d="M0 2.5L4.5 6.5L9 2.5H0Z" fill="var(--fill-0, #6A737B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid border-t-2 h-[60px] left-[210.72px] top-0 w-[99.688px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Segoe_UI:Medium',sans-serif] leading-[20.714px] left-[42px] not-italic text-[#6a737b] text-[14.5px] text-center top-[15.64px] whitespace-nowrap">Personen</p>
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[65.22px] size-[9px] top-[23.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
        <g id="Icon">
          <path d="M0 2.5L4.5 6.5L9 2.5H0Z" fill="var(--fill-0, #6A737B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid border-t-2 h-[60px] left-[310.41px] top-0 w-[86.219px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Segoe_UI:Medium',sans-serif] leading-[20.714px] left-[36.5px] not-italic text-[#6a737b] text-[14.5px] text-center top-[15.64px] whitespace-nowrap">Service</p>
      <Icon2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[132.47px] size-[9px] top-[23.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
        <g id="Icon">
          <path d="M0 2.5L4.5 6.5L9 2.5H0Z" fill="var(--fill-0, #6A737B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid border-t-2 h-[60px] left-[396.63px] top-0 w-[153.469px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Segoe_UI:Medium',sans-serif] leading-[20.714px] left-[69px] not-italic text-[#6a737b] text-[14.5px] text-center top-[15.64px] whitespace-nowrap">Webseite Medien</p>
      <Icon3 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[48.95px] size-[9px] top-[23.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
        <g id="Icon">
          <path d="M0 2.5L4.5 6.5L9 2.5H0Z" fill="var(--fill-0, #6A737B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid border-t-2 h-[60px] left-[550.09px] top-0 w-[69.953px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Segoe_UI:Medium',sans-serif] leading-[20.714px] left-[27px] not-italic text-[#6a737b] text-[14.5px] text-center top-[15.64px] whitespace-nowrap">Hilfe</p>
      <Icon4 />
    </div>
  );
}

function Container34() {
  return (
    <div className="flex-[1149.016_0_0] h-[60px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button3 />
        <Button4 />
        <Button5 />
        <Button6 />
        <Button7 />
        <Button8 />
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute h-[24px] left-[17px] top-[18px] w-[21.969px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Segoe_UI:Medium',sans-serif] leading-[24px] left-[11px] not-italic text-[#6a7282] text-[16px] text-center top-[-2px] whitespace-nowrap">🔔</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute h-[24px] left-[50.97px] top-[18px] w-[21.969px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Segoe_UI:Medium',sans-serif] leading-[24px] left-[11px] not-italic text-[#6a7282] text-[16px] text-center top-[-2px] whitespace-nowrap">💬</p>
    </div>
  );
}

function Container36() {
  return <div className="absolute bg-[#dee2e6] h-[32px] left-[88.94px] top-[14px] w-px" data-name="Container" />;
}

function ImageProfil() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-w-px relative rounded-[33554400px]" data-name="Image (Profil)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImageProfil} />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[9px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
        <g id="Icon">
          <path d="M0 2.5L4.5 6.5L9 2.5H0Z" fill="var(--fill-0, #1D2125)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[32px] items-center left-[105.94px] top-[14px] w-[49px]" data-name="Container">
      <ImageProfil />
      <Icon5 />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[60px] relative shrink-0 w-[154.938px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dee2e6] border-l border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button9 />
        <Button10 />
        <Container36 />
        <Container37 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start px-[16px] relative size-full">
        <Container33 />
        <Container34 />
        <Container35 />
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[61px] items-start left-0 pb-px px-[62px] top-0 w-[1564px]" data-name="NavBar">
      <div aria-hidden="true" className="absolute border-[#dee2e6] border-b border-solid inset-0 pointer-events-none" />
      <Container32 />
    </div>
  );
}

export default function StudiSeite() {
  return (
    <div className="bg-white relative size-full" data-name="studi seite">
      <Body />
      <NavBar />
    </div>
  );
}