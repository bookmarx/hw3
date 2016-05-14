'use strict';

var express = require('express');
var controller = require('./bookmark.controller');

var router = express.Router();

router.get('/', controller.list);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);


// app.get('/', bm.list);
//
// app.get('/bm/add', bm.add);
// app.get('/bm/edit/:book_id(\\d+)', bm.edit);
// app.get('/bm/confirmdelete/:book_id(\\d+)', bm.confirmdelete);
// app.get('/bm/delete/:book_id(\\d+)', bm.delete);
// app.post('/bm/update/:book_id(\\d+)', bm.update);
// app.post('/bm/insert', bm.insert);

module.exports = router;
