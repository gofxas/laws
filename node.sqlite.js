const sqlite3 = require('sqlite3');
const fs = require('fs');
var db;
var law = {};
db = new sqlite3.Database('db.sqlite3', function() {
    db.all('select * from law', function(err, res) {
        res.forEach(item => {
            if (law[item.category_id]) {
                law[item.category_id].push(item)
            } else {
                law[item.category_id] = [item]
            }
        })
        fs.appendFileSync('law.json', JSON.stringify(law))
    })
})