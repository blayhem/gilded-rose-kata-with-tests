function updateSellIn(item) {
  item.sellIn -= 1;
}

function betterAging(item) {
  updateSellIn(item);
  if (item.sellIn <= 0) item.quality = 0;
  else if (item.sellIn <= 5) item.quality += 3;
  else if (item.sellIn <= 10) item.quality += 2;
  else item.quality += 1;

  // Readjust quality if needed
  if (item.quality > 50) item.quality = 50;
}

function defaultAging(item) {
  updateSellIn(item);
  if (item.quality > 0) {
    if (item.sellIn <= 0) {
      item.quality -= 2;
    } else {
      item.quality -= 1;
    }
  }
}

function conjuredAging(item) {
  updateSellIn(item);
  if (item.quality > 0) item.quality -= 2;
}

// We can either modify the spec (and add the aging function for every new Item declaration),
// or bind each aging function to each object by name, and assign them in the constructor.

const agingByName = {
  "+5 Dexterity Vest": defaultAging,
  "Aged Brie": betterAging,
  "Elixir of the Mongoose": defaultAging,
  "Sulfuras, Hand of Ragnaros": () => {},
  "Backstage passes to a TAFKAL80ETC concert": betterAging,
  "Conjured Mana Cake": conjuredAging,
};

// no clean way to extend Item as we're not using classes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#as_a_constructor

var Item = function (name, sellIn, quality) {
  this.name = name;
  this.sellIn = sellIn;
  this.quality = quality;
  this.changeAttributes = () => {
    agingByName[name](this);
    // returning this/item here allows empty arrow functions like in Sulfuras
    return this;
  };
};
