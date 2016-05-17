'use strict';

var express = require('express');
var controller = require('./bookmark.controller');
var auth = require('../../auth/auth');

var router = express.Router();

// router.use(function(req, res, next){
//     console.log('cookies', req.cookies)
//     // res.renderDefault = function(ejsTemp, opts){
//     //     this.render(ejsTemp, opts)
//     // }
//     next();
// });

router.use(auth.isAuthenticated());

router.get('/', controller.list);
// router.get('/filter/:selector', controller.list);
// router.get('/:search', controller.search);


router.get('/editForm/:bid(\\d+)', controller.updateForm);
router.post('/edit/:bid(\\d+)', controller.update);



router.get('/addForm', controller.insertForm);// uid
router.post('/add/', controller.insert);// uid

router.get('/deleteForm/:bid(\\d+)', controller.deleteForm);
router.post('/delete/:bid(\\d+)', controller.delete);


router.get('/star/:bookmark_id', controller.star);

router.get('/addFolderForm', controller.addFolderForm); // uid
router.post('/addFolder', controller.addFolder); // uid
// router.get('/:id', controller.show);
// router.post('/', controller.create);

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
