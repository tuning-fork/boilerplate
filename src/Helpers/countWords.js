const countWords = (str) => {
  if (str.trim().length === 0) {
    return 0;
  }
  if (str) {
    return str.trim().split(/\s+/).length;
  } else {
    return 0;
  }
};

export default countWords;
