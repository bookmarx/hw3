'use strict';

var express = require('express');
var controller = require('./bookmark.controller');
var auth = require('../../auth/auth');

var router = express.Router();

router.get('/', controller.list);


router.get('/editForm/:bid(\\d+)', controller.updateForm);
router.post('/edit/:bid(\\d+)', controller.update);



router.get('/addForm/:uid(\\d+)', controller.insertForm);
router.post('/add/:uid(\\d+)', controller.insert);

router.get('/deleteForm/:bid(\\d+)', controller.deleteForm);
router.post('/delete/:bid(\\d+)', controller.delete);

// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);


// app.get('/', bm.list);
//
// app.get('/bm/add', bm.add);

// app.get('/bm/confirmdelete/:book_id(\\d+)', bm.confirmdelete);
// app.get('/bm/delete/:book_id(\\d+)', bm.delete);
// app.post('/bm/update/:book_id(\\d+)', bm.update);
// app.post('/bm/insert', bm.insert);

module.exports = router;
