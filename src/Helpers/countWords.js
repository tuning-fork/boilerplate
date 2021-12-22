const countWords = (string) => {
  if (string.trim().length === 0) {
    return 0;
  }
  if (string) {
    return string.trim().split(/\s+/).length;
  } else {
    return 0;
  }
};

export default countWords;
