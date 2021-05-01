const countWords = (string) => {
  if (string) {
    return string.split(" ").length;
  } else {
    return 0;
  }
};

export default countWords;
