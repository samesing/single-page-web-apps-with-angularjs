(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
  ;

  ToBuyController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this;
    var itemName = '';
    var itemQuantity = '';
    var itemsToBuy = [];

    toBuy.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

    toBuy.addItem = function () {
      if(
        (toBuy.itemQuantity!= undefined) &&
        (toBuy.itemQuantity != '') &&
        (toBuy.itemName != undefined) &&
        ((toBuy.itemName) != '')
     ){
        ShoppingListCheckOffService.addItemToBuy(toBuy.itemName, toBuy.itemQuantity);
        toBuy.itemName = '';
        toBuy.itemQuantity = '';
      }
    }

    toBuy.removeItem = function (itemIndex) {
      ShoppingListCheckOffService.removeItem(itemIndex);
    };

    toBuy.checkoffItem = function (itemIndex) {
      ShoppingListCheckOffService.checkoffItemBought(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var alreadyBought = this;
    var itemsBought = [];

    alreadyBought.itemsBought = ShoppingListCheckOffService.getItemsBought();
  }

  function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [
    {name: 'Juice', quantity: '10 Bottles'},
    {name: 'Cookies', quantity: '10 Boxes'}
  ];
  var itemsBought = [];

  service.addItemToBuy = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    itemsToBuy.push(item);
  };

  service.checkoffItemBought = function (itemIndex){
    var item = itemsToBuy[itemIndex];
    itemsBought.push(item);
    itemsToBuy.splice(itemIndex, 1);
  }

  service.removeItem = function (itemIndex) {
    itemsToBuy.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function() {
    return itemsBought;
  }
}


})();
