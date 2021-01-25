/*
    2006-30-84
    Leeroy was here!!
    
    Leeroy <lerooy@example.com>
*/
var GildedRose = function () {
  var items = [];
  items.push(new Item("+5 Dexterity Vest", 10, 20));
  items.push(new Item("Aged Brie", 2, 0));
  items.push(new Item("Elixir of the Mongoose", 5, 7));
  items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
  items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
  items.push(new Item("Conjured Mana Cake", 3, 6));
  GildedRose.updateQuality(items);
};

/*
  Proposed solutions:
  1. redo updateQuality with the README conditions.
  2. create new function that extends function Item with new "changeAttributes" function,
    an extra argument that specifies how each individual item will change.

  Criteria:
  1. I would to (1) if I had access to the code, like below. It's easier and a cleaner solution (in this case), but it depends a lot on
    scalability and how many ad-hoc cases do you have. If we want reusability, option 2 would be better.
  2. I would do (2) by changing the items that are pushed, but some code (e.g. expired and regular items) will be duplicated.
    This can be solved by adding a default fallback case if the `changeAttributes` function is not provided.

  Implemented: (1)
*/

GildedRose.updateQuality = (items) =>
  items.map((item) => {
    if (item.quality > 0 && item.name !== "Sulfuras, Hand of Ragnaros") {
      // We update the expiry date / sellIn value unless it's Sulfuras
      item.sellIn -= 1;

      // Some products get better as they age
      if (item.name === "Aged Brie" || item.name.includes("Backstage passes")) {
        // Quality drops to 0 after the concert.
        if (item.sellIn <= 0) item.quality = 0;
        // Quality increases by 3 when there are 5 days or less
        else if (item.sellIn <= 5) item.quality += 3;
        // Quality increases by 2 when there are 10 days or less
        else if (item.sellIn <= 10) item.quality += 2;
        // Default: increase by one as its SellIn value approaches, up to 50
        else item.quality += 1;

        // Readjust quality if needed
        if (item.quality > 50) item.quality = 50;
      } else if (item.sellIn <= 0 || item.name.includes("Conjured")) {
        // expired and conjured items degrade twice as fast
        item.quality -= 2;
      } else {
        // default
        item.quality -= 1;
      }
    }
    return item;
  });
