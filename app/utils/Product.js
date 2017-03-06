(function (global) {
    'use strict';

  function Product (data) {
      this.Id = data.Id;
      this.Name = data.Name;
      this.Price = data.Price;
      this.ImageData = data.ImageData;
  }

  global.Product = Product;


})(window);
