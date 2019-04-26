const bby = require("bestbuy")("TGp7jkZIbKOzfRTDzkofjo2O");

class BestbuyHandler {
  static async getCategories() {
    try {
      const data = await bby.categories('(id="abcat*")', { pageSize: 10 });
      if (data.total === 0) return console.log("No categories found");
      const { categories } = data;
      const elements = [];
      for (let i = 0; i < 5; i++) {
        elements[i] = {
          content_type: "text",
          title: categories[i].name,
          payload: categories[i].name
        };
      }
      return elements;
    } catch (err) {
      console.warn("getCategories", err);
    }
  }
  static async getProducts(x) {
    try {
      const data = await bby.products(`(${x})`, {
        show: "salePrice,name,url,thumbnailImage,shortDescription,image",
        pageSize: 5
      });
      if (data.total === 0) return console.log("No products found");
      const { products } = data;
      const elements = [];
      for (let i = 0; i < 5; i++) {
        elements[i] = {
          title: products[i].name,
          subtitle: products[i].shortDescription,
          image_url: products[i].image,
          buttons: [
            {
              type: "web_url",
              url: products[i].url,
              title: "Web URL"
            },
            {
              type: "postback",
              title: "Buy",
              payload: "produsts[i].name"
            }
          ]
        };
      }
      console.log(elements);
      return elements;
      //return products.map(i => i.name);
    } catch (err) {
      console.warn("getProducts", err);
    }
  }
}

module.exports = BestbuyHandler;
