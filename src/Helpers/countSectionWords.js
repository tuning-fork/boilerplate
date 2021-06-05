import countWords from "./countWords";

export default function countSectionWords(section) {
  return countWords(section.title) + section.wordcount;
}
