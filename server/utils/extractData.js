// extract product data
exports.extractProductData = (reqBody) => {
  const { name, price, shortDesc, longDesc, category, images, stock } = reqBody;
  const [img1, img2, img3, img4] = images;

  return {
    name,
    price,
    short_desc: shortDesc,
    long_desc: longDesc,
    category,
    img1,
    img2,
    img3,
    img4,
    stock,
  };
};
