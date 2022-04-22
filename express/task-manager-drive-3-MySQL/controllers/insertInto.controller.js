const db = require('../utils/database');

exports.insertInto = (req, res) => {
    const { name, price } = req.body;
    const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
    db.execute(query, [name, price])
        .then(result => {
            res.send({
                message: 'Product inserted successfully',
                result: result
            });
        })
        .catch(err => {
            res.send({
                message: 'Failed to insert product',
                error: err
            });
        });
}