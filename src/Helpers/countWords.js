const countWords = (string) => {
  if (string) {
    return string.trim().split(/\s+/).length;
  } else {
    return 0;
  }
};

export default countWords;
