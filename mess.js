const restaurants = require('./restaurants.json');



//go through array from top level (restaurants) - i
for(let i = 0; i < restaurants.length; i++) {
    //populate restaurants
    stmt = db.prepare(`INSERT INTO restaurants (name, imagelink)
                       VALUES(?,?)`);
    stmt.run(restaurants[i].name, restaurants[i].image)
    stmt.finalize();

    //populate menus
    for(let j = 0; j < restaurants[i].menus.length; j++) {
        stmt = db.prepare(`INSERT INTO menus (title, restaurant_ID)
                           VALUES (?, ?)`);
        stmt.run(restaurants[i].menus[j].title, i+1)

        //populate menuItems
        for(let k = 0; k < restaurants[i].menus[j].items.length; k++) {
            stmt = db.prepare(`INSERT INTO menuItems (name, price, menu_ID)
                               VALUES (?, ?, ?)`);
            stmt.run(restaurants[i].menus[j].items[k].name,
                     restaurants[i].menus[j].items[k].price,
                     j+1);
        }
    }
}
