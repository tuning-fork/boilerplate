/* eslint-disable no-unused-vars */
import * as docx from "docx";
import * as fs from "fs";
import { parseQuillDelta } from "quilljs-parser";
import {
  Document,
  // AlignmentType,
  // HyperlinkRef,
  ExternalHyperlink,
  HyperlinkType,
  Media,
  // Numbering,
  Packer,
  Paragraph,
  TextRun,
  UnderlineType,
} from "docx";
import {
  // customBulletLevels,
  customNumberedLevels,
  defaultStyles,
} from "./defaultStyles";

let linkTracker = 0;
let numberedTracker = -1;
let styles = defaultStyles;
let levels = customNumberedLevels;
let customBullets = false;

// main public function to generate docx document
export async function generateWord(delta, config) {
  linkTracker = 0; // reset link tracker
  numberedTracker = -1; // reset numered list tracker
  customBullets = false; // reset custom bullets
  let doc;
  // create a container for the docx doc sections
  const sections = [];
  // create a container for the parsed Quill deltas
  const parsedDeltas = [];
  // if input is a raw quill delta
  if (delta.ops) {
    const parsedDelta = parseQuillDelta(delta);
    parsedDeltas.push(parsedDelta);
    // if input is an array of parsed quill deltas
  } else if (Array.isArray(delta)) {
    for (const eachDelta of delta) {
      parsedDeltas.push(eachDelta);
    }
    // if input is a single parsed quill delta
  } else if (delta.paragraphs) {
    parsedDeltas.push(delta);
    // if input is not recognized
  } else {
    throw new Error(
      "Please provide a raw Quill Delta, a parsed Quill delta, or an Array of parsed Quill deltas. See QuillTodocx readme."
    );
  }
  // set up the docx document based on configuration

  console.log("parsedDeltas[0]", parsedDeltas[0]);

  styles = defaultStyles; // reset back to original
  levels = customNumberedLevels; // reset back to original
  if (config) {
    setupConfig(config);
  }
  let hyperlinks = undefined;
  let numbering = undefined;
  // build the hyperlinks property
  if (parsedDeltas[0].setup.hyperlinks.length > 0) {
    hyperlinks = buildHyperlinks(parsedDeltas[0].setup.hyperlinks);
  }
  // build the numbering property
  if (parsedDeltas[0].setup.numberedLists > 0) {
    numbering = buildNumbering(parsedDeltas[0].setup.numberedLists);
  }
  if (config?.customBulletLevels) {
    numbering = addCustomBullets(numbering, config.customBulletLevels);
    customBullets = true;
  }
  // parsedDeltas[0].paragraphs[parsedDeltas[0].paragraphs.length - 1].textRuns = [
  //   { text: "" },
  // ];
  // doc = setupDoc(parsedDeltas[0], config);
  // console.log("doc", doc);
  // build docx sections
  for (const delta of parsedDeltas) {
    sections.push(buildSection(delta.paragraphs, doc));
  }
  // add docx sections to doc
  // for (const section of sections) {
  //   doc.addSection({
  //     children: section,
  //   });
  // }
  console.log("sections", sections);
  doc = new Document({
    styles: {
      paragraphStyles: styles,
    },
    numbering: numbering,
    hyperlinks: hyperlinks,
    sections: [
      {
        properties: {},
        children: [...sections],
      },
    ],
  });
  // return the appropriate export object based on configuration
  return exportDoc(doc, config);
}

// sets up the docx document
function setupDoc(parsedDelta, config) {
  styles = defaultStyles; // reset back to original
  levels = customNumberedLevels; // reset back to original
  if (config) {
    setupConfig(config);
  }
  let hyperlinks = undefined;
  let numbering = undefined;
  // build the hyperlinks property
  if (parsedDelta.setup.hyperlinks.length > 0) {
    hyperlinks = buildHyperlinks(parsedDelta.setup.hyperlinks);
  }
  // build the numbering property
  if (parsedDelta.setup.numberedLists > 0) {
    numbering = buildNumbering(parsedDelta.setup.numberedLists);
  }
  if (config?.customBulletLevels) {
    numbering = addCustomBullets(numbering, config.customBulletLevels);
    customBullets = true;
  }

  const doc = new Document({
    styles: {
      paragraphStyles: styles,
    },
    // numbering: numbering,
    // hyperlinks: hyperlinks,
  });
  return doc;
}

// generate a section as an array of paragraphs
function buildSection(quillParagraphs, doc) {
  let quillParagraphTracker = 0;
  // create a container to hold the docx paragraphs
  const paragraphs = [];
  // build a docx paragraph from each delta paragraph
  for (const paragraph of quillParagraphs) {
    // if embed video or image
    if (paragraph.embed?.image) {
      const image = Media.addImage(doc, paragraph.embed.image);
      paragraphs.push(new Paragraph(image));
    } else if (paragraph.embed?.video) {
      const run = buildVideo(paragraph.embed.video);
      paragraphs.push(new Paragraph({ children: [run] }));
      // if text runs
    } else if (paragraph.textRuns) {
      // handle ordered list tracking
      if (
        quillParagraphTracker > 0 &&
        paragraph.attributes?.list === "ordered"
      ) {
        if (
          quillParagraphs[quillParagraphTracker - 1].attributes?.list ===
          "ordered"
        ) {
          // eslint-disable-next-line no-self-assign
          numberedTracker = numberedTracker;
        } else {
          numberedTracker++;
        }
      }
      paragraphs.push(buildParagraph(paragraph));
    }
    quillParagraphTracker++;
  }
  return paragraphs;
}

// export the appropriate object based on configuration
async function exportDoc(doc, config) {
  console.log("config", config);
  if (!config || !config.exportAs || config.exportAs === "doc") {
    return doc;
  }
  if (config.exportAs === "blob") {
    return Packer.toBlob(doc);
  }
  if (config.exportAs === "buffer") {
    // TODO: left off trying to get this work
    console.log("returning buffer");
    // return Packer.toBuffer(doc);
    return Packer.toBuffer(doc).then((buffer) => {
      console.log("buffer", buffer);
      fs.writeFileSync("My Document.docx", buffer);
    });
  }
  if (config.exportAs === "base64") {
    return Packer.toBase64String(doc);
  }
  throw new Error(
    "Please set exportAs configuration to blob, buffer, doc, or base64."
  );
}

// apply custom configuration from the user
function setupConfig(config) {
  if (config.paragraphStyles) {
    setParagraphsStyles(config.paragraphStyles);
  }
  if (config.customLevels) {
    levels = config.customLevels;
  }
}

// build a docx hyperlinks object from the quill hyperlinks
function buildHyperlinks(quillLinks) {
  let hyperlinks = {};
  let linkTracker = 0;
  // generate a new docx link object from each quill link; merge into hyperlinks object
  for (const link of quillLinks) {
    const docLink = {
      link: link.link,
      text: link.text,
      type: HyperlinkType.EXTERNAL,
    };
    hyperlinks = {
      ...hyperlinks,
      [`link${linkTracker}`]: docLink,
    };
    linkTracker++;
  }
  return hyperlinks;
}

// build docx numbering object from quill numbered lists
function buildNumbering(numberOfLists) {
  let config = [];
  let numberTracker = 0;
  // create a new docx numbering object for each quill numbered list
  while (numberTracker < numberOfLists) {
    const newList = {
      reference: `numbered_${numberTracker}`,
      levels: levels,
    };
    config.push(newList);
    numberTracker++;
  }
  const numberConfig = {
    config: config,
  };
  return numberConfig;
}

// adds a custom bullet styled list to the numbering configuration
function addCustomBullets(numberConfig, bulletLevels) {
  const customBullets = {
    reference: "customBullets",
    levels: bulletLevels,
  };
  if (numberConfig) {
    numberConfig.config.push(customBullets);
    return numberConfig;
  } else {
    return {
      config: [customBullets],
    };
  }
}

// build a video
function buildVideo(video) {
  return new TextRun({
    text: video,
  });
}

// generate a paragraph as an array of text runs
function buildParagraph(paragraph) {
  // container to hold docx text runs
  const textRuns = [];
  // build a docx run from each delta run
  for (const run of paragraph.textRuns) {
    // if formula
    if (run.formula) {
      textRuns.push(buildFormula(run.formula));
      // if text
    } else if (run.text) {
      textRuns.push(buildTextRun(run, paragraph));
    }
  }
  const docxParagraph = new Paragraph({
    children: textRuns,

    heading:
      paragraph.attributes?.header === 1
        ? docx.HeadingLevel.HEADING_1
        : paragraph.attributes?.header === 2
        ? docx.HeadingLevel.HEADING_2
        : undefined,

    bullet:
      paragraph.attributes?.list === "bullet" && !customBullets
        ? {
            level: paragraph.attributes.indent
              ? paragraph.attributes.indent
              : 0,
          }
        : undefined,

    numbering:
      paragraph.attributes?.list === "ordered"
        ? {
            reference: `numbered_${numberedTracker}`,
            level: paragraph.attributes.indent
              ? paragraph.attributes.indent
              : 0,
          }
        : paragraph.attributes?.list === "bullet" && customBullets
        ? {
            reference: "customBullets",
            level: paragraph.attributes.indent
              ? paragraph.attributes.indent
              : 0,
          }
        : undefined,

    alignment:
      paragraph.attributes?.align === "left"
        ? "left"
        : paragraph.attributes?.align === "center"
        ? "center"
        : paragraph.attributes?.align === "right"
        ? "right"
        : paragraph.attributes?.align === "justify"
        ? "both"
        : undefined,

    style: paragraph.attributes?.["code-block"]
      ? "code_block"
      : paragraph.attributes?.blockquote
      ? "block_quote"
      : paragraph.attributes?.citation
      ? "citation"
      : undefined,
    // bidirectional: paragraph.attributes?.direction === 'rtl' ? true : undefined,
    // indent
  });
  return docxParagraph;
}

// generate a docx text run from quill text run
// eslint-disable-next-line no-unused-vars
function buildTextRun(run, paragraph) {
  let textRun;
  if (run.attributes?.link) {
    // textRun = new HyperlinkRef(`link${linkTracker}`);
    textRun = new ExternalHyperlink(`link${linkTracker}`);
    linkTracker++;
  } else {
    textRun = new TextRun({
      text: run.text,
      bold: run.attributes?.bold ? true : false,
      italics: run.attributes?.italic ? true : false,
      subScript: run.attributes?.script === "sub" ? true : false,
      superScript: run.attributes?.script === "super" ? true : false,
      strike: run.attributes?.strike ? true : false,
      underline: run.attributes?.underline
        ? { type: UnderlineType.SINGLE, color: "auto" }
        : undefined,
      color: run.attributes?.color ? run.attributes?.color.slice(1) : undefined,
      size:
        run.attributes?.size === "huge"
          ? 36
          : run.attributes?.size === "large"
          ? 32
          : run.attributes?.size === "small"
          ? 20
          : undefined,
      // rightToLeft: paragraph.attributes?.direction === 'rtl' ? true : undefined
      // font
      highlight: run.attributes?.background ? "yellow" : undefined,
    });
  }
  return textRun;
}

// set a style's paragraph and run properties
function setStyle(style, styleId, index) {
  if (style.paragraph) {
    styles[index].paragraph = style.paragraph;
  }
  if (style.run) {
    styles[index].run = style.run;
  }
}

// apply custom paragraph styles from the user
function setParagraphsStyles(paragraphStyles) {
  if (paragraphStyles.normal) {
    const index = styles.findIndex((style) => style.id === "normal");
    setStyle(paragraphStyles.normal, "normal", index);
  }
  if (paragraphStyles.header_1) {
    const index = styles.findIndex((style) => style.id === "header_1");
    setStyle(paragraphStyles.header_1, "header_1", index);
  }
  if (paragraphStyles.header_2) {
    const index = styles.findIndex((style) => style.id === "header_2");
    setStyle(paragraphStyles.header_2, "header_2", index);
  }
  if (paragraphStyles.list_paragraph) {
    const index = styles.findIndex((style) => style.id === "list_paragraph");
    setStyle(paragraphStyles.list_paragraph, "list_paragraph", index);
  }
  if (paragraphStyles.code_block) {
    const index = styles.findIndex((style) => style.id === "code_block");
    setStyle(paragraphStyles.code_block, "code_block", index);
  }
  if (paragraphStyles.block_quote) {
    const index = styles.findIndex((style) => style.id === "block_quote");
    setStyle(paragraphStyles.block_quote, "block_quote", index);
  }
  if (paragraphStyles.citation) {
    const index = styles.findIndex((style) => style.id === "citation");
    setStyle(paragraphStyles.citation, "citation", index);
  }
}

// build a formula
function buildFormula(formula) {
  return new TextRun({
    text: formula,
  });
}
