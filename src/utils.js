export const randomStrGenerator = (length) => {
  let str = "";

  const collectionStr = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";

  for (let i = 0; i < length; i++) {
    const charPosition = Math.round(Math.random() * collectionStr);
    str += collectionStr(charPosition);
  }
};
