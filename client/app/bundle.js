/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(1);

	function loadTemplate(name, data){
	    var template = __webpack_require__(2)("./"+ name +'.ejs');
	    return template(data);
	}

	var options = util.filterOptions();
	var getModals = util.getModals;

	var opts = {
	    dd: options.dd,
	    bm: [],
	    folders : [],
	    loggedIn: true,
	    modals: getModals()
	}

	var tpl = loadTemplate('main', opts);

	document.write(tpl);


/***/ },
/* 1 */
/***/ function(module, exports) {

	exports.filterOptions = filterOptions;
	exports.getModals = getModals;

	function filterOptions(orderBy){
	    var options = [{
	        name: 'Most Recent',
	        value: 'MostRecent',
	        selected: '',
	        orderFilter: 'bookmark_id DESC'
	    },
	    {
	        name: 'Favorites',
	        value: 'Favorites',
	        selected: '',
	        orderFilter: 'star DESC'
	    },
	    {
	        name: 'Alphabetical',
	        value: 'Alphabetical',
	        selected: '',
	        orderFilter: 'dateAdded ASC'
	    },{
	        name: 'Date',
	        value: 'Date',
	        selected: '',
	        orderFilter: 'title ASC'
	    }];
	    var filter;

	    for(var i = 0; i < options; i++){
	        if(options[i].value === orderBy){
	            options[i].selected = 'selected';
	            filter = options[i];
	            break;
	        }
	    }
	    return {
	        dd : options,
	        filter : filter
	    };
	}

	function getModals(opts){
	    var opts = opts || {};
	    return {
	        addModal: opts.addModal || 0,
	        editModal: opts.editModal || 0,
	        deleteModal: opts.deleteModal || 0,
	        addFolderModal: opts.addFolderModal || 0,
	        changeModal: opts.changeModal || 0
	    };
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./index.ejs": 3,
		"./main.ejs": 4,
		"./partials/addFolderModal.ejs": 5,
		"./partials/addModal.ejs": 6,
		"./partials/change.ejs": 7,
		"./partials/deleteModal.ejs": 8,
		"./partials/editModal.ejs": 9,
		"./partials/header.ejs": 10,
		"./partials/list.ejs": 11
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 2;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function anonymous(locals, escape, include, rethrow) {
	    rethrow = rethrow || function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    };
	    escape = escape || function(markup) {
	        return markup == undefined ? "" : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	    }, _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	        return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __line = 1, __lines = '<!doctype html>\n<html lang="en">\n<head>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">\n    <title>Bookmarx</title>\n    <link href="/bower_components/skeleton/css/normalize.css" rel="stylesheet" type="text/css">\n    <link href="/bower_components/skeleton/css/skeleton.css" rel="stylesheet" type="text/css">\n    <link rel="stylesheet" href="/bower_components/font-awesome/css/font-awesome.min.css">\n    <link href="/style/main.css" rel="stylesheet" type="text/css">\n    <link href="/style/modal.css" rel="stylesheet" type="text/css">\n</head>\n<body style="margin-left: 0px">\n\n    <div class="bm-container">\n        <nav class="bm-nav dark-primary-color">\n            <% include partials/header %>\n        </nav>\n        <div class="bm-content">\n            <% include partials/list %>\n        </div>\n        <footer class="bm-footer dark-primary-color">\n            <form action="" method="get">\n                <button type="submit" class="button-primary"><i class="fa fa-upload"></i> Import</button>\n                <button type="submit" class="button-primary" action="/example.csv"><i class="fa fa-download"></i> Export</button>\n            </form>\n        </footer>\n    </div>\n\n    <% if(modals.addModal) { %>\n    <%    include partials/addModal %>\n    <% } else if(modals.editModal) { %>\n    <%    include partials/editModal %>\n    <% } else if(modals.addFolderModal) { %>\n    <%    include partials/addFolderModal %>\n    <% } else if(modals.deleteModal) { %>\n    <%    include partials/deleteModal %>\n    <% } else if(modals.changeModal) { %>\n    <%    include partials/change %>\n    <% } %>\n\n    <!-- <div class="bm-view">\n        <iframe src="http://www.apple.com/"></iframe>\n    </div> -->\n\n\n</body>\n</html>\n', __filename = "client-webpack/views/index.ejs";
	    try {
	        var __output = [], __append = __output.push.bind(__output);
	        with (locals || {}) {
	            __append('<!doctype html>\n<html lang="en">\n<head>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">\n    <title>Bookmarx</title>\n    <link href="/bower_components/skeleton/css/normalize.css" rel="stylesheet" type="text/css">\n    <link href="/bower_components/skeleton/css/skeleton.css" rel="stylesheet" type="text/css">\n    <link rel="stylesheet" href="/bower_components/font-awesome/css/font-awesome.min.css">\n    <link href="/style/main.css" rel="stylesheet" type="text/css">\n    <link href="/style/modal.css" rel="stylesheet" type="text/css">\n</head>\n<body style="margin-left: 0px">\n\n    <div class="bm-container">\n        <nav class="bm-nav dark-primary-color">\n            ');
	            __line = 17;
	            (function() {
	                __append('<nav>\n    <div class="bm-nav-top row">\n        <h4 class="bm-title">Bookmarx</h4>\n        <div class="right">\n            <a href="/v1/bm/addForm" class="button fa fa-plus fa-2x" aria-hidden="true" title="Add Form"></a>\n            <a href="/v1/bm/addFolderForm" class="button fa fa-folder fa-2x" aria-hidden="true" title="Add Folder"></a>\n            <a href="/v1/change" class="button fa fa-cog fa-2x" aria-hidden="true" title="Change Password"></a>\n            <a href="/v1/logout" class="button fa fa-sign-out fa-2x" aria-hidden="true" title="Logout"></a>\n        </div>\n    </div>\n    <div class="bm-nav-bottom row">\n        <form action="/v1/bm/" method="GET">\n            <input id="bm-search" type="text" name="keyword" placeholder="Search bookmarks">\n            <button type="submit" class="button sb-button-submit fa fa-search" ></button>\n        </form>\n        <form action="/v1/bm/" method="GET">\n            <select id="bm-sort" name="orderBy">\n                ');
	                __line = 18;
	                dd.forEach(function(val, key) {
	                    __append('\n                    <option value="');
	                    __line = 19;
	                    __append(escape(val.value));
	                    __append('" ');
	                    __append(escape(val.selected));
	                    __append(">");
	                    __append(escape(val.name));
	                    __append("</option>\n                ");
	                    __line = 20;
	                });
	                __append('\n\n            </select>\n            <button type="submit" class="button bm-icon-button fa fa-filter" ></button>\n        </form>\n    </div>\n</nav>\n');
	                __line = 27;
	            })();
	            __append('\n        </nav>\n        <div class="bm-content">\n            ');
	            __line = 20;
	            (function() {
	                __append("<ul>\n    ");
	                __line = 2;
	                for (var fname in folders) {
	                    __append('\n        <li class="bm-folder">\n            <i class="fa fa-folder" aria-hidden="true"></i> ');
	                    __line = 4;
	                    __append(escape(fname));
	                    __append("\n            <ul>\n                ");
	                    __line = 6;
	                    folders[fname].forEach(function(val, key) {
	                        __append("\n                    ");
	                        __line = 7;
	                        if (val.bookmark_id) {
	                            __append('\n                        <li>\n                            <a href="');
	                            __line = 9;
	                            __append(escape(val.url));
	                            __append('"> ');
	                            __append(escape(val.title));
	                            __append(' </a>\n                            <span class="right">\n                                <a href="/v1/bm/editForm/');
	                            __line = 11;
	                            __append(escape(val.bookmark_id));
	                            __append('"><i class="fa fa-edit" aria-hidden="true"></i></a>\n                                <a href="/v1/bm/star/');
	                            __line = 12;
	                            __append(escape(val.bookmark_id));
	                            __append('"><i class="fa ');
	                            __append(escape(val.starCSS));
	                            __append('" aria-hidden="true"></i></a>\n                                <a href="/v1/bm/deleteForm/');
	                            __line = 13;
	                            __append(escape(val.bookmark_id));
	                            __append('"><i class="fa fa-trash" aria-hidden="true"></i></a>\n                            </span>\n\n                        </li>\n                    ');
	                            __line = 17;
	                        }
	                        __append("\n                ");
	                        __line = 18;
	                    });
	                    __append("\n            </ul>\n        </li>\n    ");
	                    __line = 21;
	                }
	                __append("\n\n    ");
	                __line = 23;
	                bm.forEach(function(val, key) {
	                    __append('\n        <li>\n            <a href="');
	                    __line = 25;
	                    __append(escape(val.url));
	                    __append('"> ');
	                    __append(escape(val.title));
	                    __append(' </a>\n            <span class="right">\n                <a href="/v1/bm/editForm/');
	                    __line = 27;
	                    __append(escape(val.bookmark_id));
	                    __append('"><i class="fa fa-edit" aria-hidden="true"></i></a>\n                <a href="/v1/bm/star/');
	                    __line = 28;
	                    __append(escape(val.bookmark_id));
	                    __append('"><i class="fa ');
	                    __append(escape(val.starCSS));
	                    __append('" aria-hidden="true"></i></a>\n                <a href="/v1/bm/deleteForm/');
	                    __line = 29;
	                    __append(escape(val.bookmark_id));
	                    __append('"><i class="fa fa-trash" aria-hidden="true"></i></a>\n            </span>\n\n        </li>\n    ');
	                    __line = 33;
	                });
	                __append("\n</ul>\n");
	                __line = 35;
	            })();
	            __append('\n        </div>\n        <footer class="bm-footer dark-primary-color">\n            <form action="" method="get">\n                <button type="submit" class="button-primary"><i class="fa fa-upload"></i> Import</button>\n                <button type="submit" class="button-primary" action="/example.csv"><i class="fa fa-download"></i> Export</button>\n            </form>\n        </footer>\n    </div>\n\n    ');
	            __line = 30;
	            if (modals.addModal) {
	                __append("\n    ");
	                __line = 31;
	                (function() {
	                    __append('<div id="openAddModal" class="modal-dialog">\n    <section>\n        <form action="/v1/bm/add/" method="POST">\n            <header class="modal-header dark-primary-color">\n                <h2>Add Bookmark</h2>\n            </header>\n            <div class="modal-body">\n                <label for="name-add">Name</label>\n                <input type="text" placeholder="Name" id="name-add" name="title" required>\n                <label for="address-add">URL</label>\n                <input type="text" placeholder="URL" id="address-add" name="url" pattern="(http:\\/\\/.*)|(https:\\/\\/.*)" title="Must contain http:// or https://" required>\n                <label for="description-add">Description</label>\n                <textarea placeholder="Description" id="description-add" name="description"></textarea>\n                <label for="keyword-add">Keyword</label>\n                <input type="text" placeholder="Keyword" id="keyword-add" name="keywords">\n                <label for="folders">Folder</label>\n                <select name="folders">\n                    ');
	                    __line = 18;
	                    modals.addModal.folders.forEach(function(val, key) {
	                        __append('\n                        <option value="');
	                        __line = 19;
	                        __append(escape(val.folder_id));
	                        __append('">');
	                        __append(escape(val.name));
	                        __append("</option>\n                    ");
	                        __line = 20;
	                    });
	                    __append("\n\n                </select>\n\n\n                ");
	                    __line = 25;
	                    if (modals.addModal.errorMessage) {
	                        __append('\n                <p style="color: red;">');
	                        __line = 26;
	                        __append(escape(modals.addModal.errorMessage));
	                        __append("</p>\n                ");
	                        __line = 27;
	                    }
	                    __append('\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button input="submit" class="button button-primary">Save</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n');
	                    __line = 39;
	                })();
	                __append("\n    ");
	                __line = 32;
	            } else if (modals.editModal) {
	                __append("\n    ");
	                __line = 33;
	                (function() {
	                    __append('<!-- Edit Modal -->\n<div id="openEditModal" class="modal-dialog">\n    <section>\n        <form action="/v1/bm/edit/');
	                    __line = 4;
	                    __append(escape(modals.editModal.bm.bookmark_id));
	                    __append('" method="POST">\n            <header class="modal-header dark-primary-color">\n                <h2>Edit Bookmark</h2>\n            </header>\n            <div class="modal-body">\n                <label for="name-edit">Name</label>\n                <input type="text" placeholder="Name" id="name-edit" value="');
	                    __line = 10;
	                    __append(escape(modals.editModal.bm.title));
	                    __append('" name="title" required>\n                <label for="address-edit">URL</label>\n                <input type="text" placeholder="URL" id="address-edit" value="');
	                    __line = 12;
	                    __append(escape(modals.editModal.bm.url));
	                    __append('" name="url" pattern="(http:\\/\\/.*)|(https:\\/\\/.*)" title="Must contain http:// or https://"  required>\n                <label for="description-edit">Description</label>\n                <textarea placeholder="Description" id="description-edit" name="description">');
	                    __line = 14;
	                    __append(escape(modals.editModal.bm.description));
	                    __append('</textarea>\n                <label for="keyword-edit">Keyword</label>\n                <input type="text" placeholder="Keyword" id="keyword-edit" value="');
	                    __line = 16;
	                    __append(escape(modals.editModal.bm.keywords));
	                    __append('" name="keywords">\n\n                <label for="folders">Folders</label>\n                <select name="folders">\n                    ');
	                    __line = 20;
	                    modals.editModal.folders.forEach(function(val, key) {
	                        __append('\n                        <option value="');
	                        __line = 21;
	                        __append(escape(val.folder_id));
	                        __append('">');
	                        __append(escape(val.name));
	                        __append("</option>\n                    ");
	                        __line = 22;
	                    });
	                    __append("\n\n                </select>\n\n\n                ");
	                    __line = 27;
	                    if (modals.editModal.errorMessage) {
	                        __append('\n                <p style="color: red;">');
	                        __line = 28;
	                        __append(escape(modals.addModal.errorMessage));
	                        __append("</p>\n                ");
	                        __line = 29;
	                    }
	                    __append('\n\n\n\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button type="submit" class="button button-primary">Save</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n');
	                    __line = 44;
	                })();
	                __append("\n    ");
	                __line = 34;
	            } else if (modals.addFolderModal) {
	                __append("\n    ");
	                __line = 35;
	                (function() {
	                    __append('<!-- Add Folder Modal -->\n<div id="openAddFolderModal" class="modal-dialog">\n    <section>\n        <form action="/v1/bm/addFolder/" method="post">\n            <header class="modal-header dark-primary-color">\n                <h2>Add Folder</h2>\n            </header>\n            <div class="modal-body">\n                <label for="name-folder">Name</label>\n                <input type="text" name="name" placeholder="Name" id="name-folder">\n                <label for="description-folder">Description</label>\n                <textarea name="description" placeholder="Description" id="description-folder"></textarea>\n                <label for="keyword-folder">Keyword</label>\n                <input type="text" name="keyword" placeholder="Keyword" id="keyword-folder">\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button type="submit" class="button button-primary">Save</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n');
	                    __line = 26;
	                })();
	                __append("\n    ");
	                __line = 36;
	            } else if (modals.deleteModal) {
	                __append("\n    ");
	                __line = 37;
	                (function() {
	                    __append('<div id="openAddModal" class="modal-dialog">\n    <section>\n        <form action="/v1/bm/delete/');
	                    __line = 3;
	                    __append(escape(modals.deleteModal.bookmark_id));
	                    __append('" method="POST">\n            <header class="modal-header dark-primary-color">\n                <h2>Are you sure you wish to delete \'');
	                    __line = 5;
	                    __append(escape(modals.deleteModal.title));
	                    __append('\'</h2>\n            </header>\n            <div class="modal-body">\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button input="submit" class="button button-primary">Yes</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n');
	                    __line = 19;
	                })();
	                __append("\n    ");
	                __line = 38;
	            } else if (modals.changeModal) {
	                __append("\n    ");
	                __line = 39;
	                (function() {
	                    __append('<div id="changeModal" class="modal-dialog">\n    <section>\n        <form action="/v1/change/" method="POST">\n            <header class="modal-header dark-primary-color">\n                <h2>Change Password</h2>\n            </header>\n            <div class="modal-body">\n                <!-- <label for="name-add">Username</label>\n                <input type="email" placeholder="test@test.com" name="username"> -->\n                <label for="keyword-add">Old Password</label>\n                <input type="password" placeholder="old" name="oldPassword">\n                <label for="keyword-add">New Password</label>\n                <input type="password" placeholder="new" name="newPassword">\n                <label for="keyword-add">Retype New Password</label>\n                <input type="password" placeholder="again" name="reNewPassword">\n                ');
	                    __line = 16;
	                    if (modals.changeModal.errorMessage) {
	                        __append('\n                <p class="bm-error-message">\n                    ');
	                        __line = 18;
	                        __append(escape(modals.changeModal.errorMessage));
	                        __append("\n                <p>\n                ");
	                        __line = 20;
	                    }
	                    __append('\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button input="submit" class="button button-primary">Save</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n');
	                    __line = 32;
	                })();
	                __append("\n    ");
	                __line = 40;
	            }
	            __append('\n\n    <!-- <div class="bm-view">\n        <iframe src="http://www.apple.com/"></iframe>\n    </div> -->\n\n\n</body>\n</html>\n');
	            __line = 49;
	        }
	        return __output.join("");
	    } catch (e) {
	        rethrow(e, __lines, __filename, __line);
	    }
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function anonymous(locals, escape, include, rethrow) {
	    rethrow = rethrow || function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    };
	    escape = escape || function(markup) {
	        return markup == undefined ? "" : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	    }, _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	        return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __line = 1, __lines = '<div class="bm-container">\n    <nav class="bm-nav dark-primary-color">\n        <% include partials/header %>\n    </nav>\n    <div class="bm-content">\n        <% include partials/list %>\n    </div>\n    <footer class="bm-footer dark-primary-color">\n        <form action="" method="get">\n            <button type="submit" class="button-primary"><i class="fa fa-upload"></i> Import</button>\n            <button type="submit" class="button-primary" action="/example.csv"><i class="fa fa-download"></i> Export</button>\n        </form>\n    </footer>\n</div>\n\n<% if(modals.addModal) { %>\n<%    include partials/addModal %>\n<% } else if(modals.editModal) { %>\n<%    include partials/editModal %>\n<% } else if(modals.addFolderModal) { %>\n<%    include partials/addFolderModal %>\n<% } else if(modals.deleteModal) { %>\n<%    include partials/deleteModal %>\n<% } else if(modals.changeModal) { %>\n<%    include partials/change %>\n<% } %>\n\n<!-- <div class="bm-view">\n    <iframe src="http://www.apple.com/"></iframe>\n</div> -->\n', __filename = "client-webpack/views/main.ejs";
	    try {
	        var __output = [], __append = __output.push.bind(__output);
	        with (locals || {}) {
	            __append('<div class="bm-container">\n    <nav class="bm-nav dark-primary-color">\n        ');
	            __line = 3;
	            (function() {
	                __append('<nav>\n    <div class="bm-nav-top row">\n        <h4 class="bm-title">Bookmarx</h4>\n        <div class="right">\n            <a href="/v1/bm/addForm" class="button fa fa-plus fa-2x" aria-hidden="true" title="Add Form"></a>\n            <a href="/v1/bm/addFolderForm" class="button fa fa-folder fa-2x" aria-hidden="true" title="Add Folder"></a>\n            <a href="/v1/change" class="button fa fa-cog fa-2x" aria-hidden="true" title="Change Password"></a>\n            <a href="/v1/logout" class="button fa fa-sign-out fa-2x" aria-hidden="true" title="Logout"></a>\n        </div>\n    </div>\n    <div class="bm-nav-bottom row">\n        <form action="/v1/bm/" method="GET">\n            <input id="bm-search" type="text" name="keyword" placeholder="Search bookmarks">\n            <button type="submit" class="button sb-button-submit fa fa-search" ></button>\n        </form>\n        <form action="/v1/bm/" method="GET">\n            <select id="bm-sort" name="orderBy">\n                ');
	                __line = 18;
	                dd.forEach(function(val, key) {
	                    __append('\n                    <option value="');
	                    __line = 19;
	                    __append(escape(val.value));
	                    __append('" ');
	                    __append(escape(val.selected));
	                    __append(">");
	                    __append(escape(val.name));
	                    __append("</option>\n                ");
	                    __line = 20;
	                });
	                __append('\n\n            </select>\n            <button type="submit" class="button bm-icon-button fa fa-filter" ></button>\n        </form>\n    </div>\n</nav>\n');
	                __line = 27;
	            })();
	            __append('\n    </nav>\n    <div class="bm-content">\n        ');
	            __line = 6;
	            (function() {
	                __append("<ul>\n    ");
	                __line = 2;
	                for (var fname in folders) {
	                    __append('\n        <li class="bm-folder">\n            <i class="fa fa-folder" aria-hidden="true"></i> ');
	                    __line = 4;
	                    __append(escape(fname));
	                    __append("\n            <ul>\n                ");
	                    __line = 6;
	                    folders[fname].forEach(function(val, key) {
	                        __append("\n                    ");
	                        __line = 7;
	                        if (val.bookmark_id) {
	                            __append('\n                        <li>\n                            <a href="');
	                            __line = 9;
	                            __append(escape(val.url));
	                            __append('"> ');
	                            __append(escape(val.title));
	                            __append(' </a>\n                            <span class="right">\n                                <a href="/v1/bm/editForm/');
	                            __line = 11;
	                            __append(escape(val.bookmark_id));
	                            __append('"><i class="fa fa-edit" aria-hidden="true"></i></a>\n                                <a href="/v1/bm/star/');
	                            __line = 12;
	                            __append(escape(val.bookmark_id));
	                            __append('"><i class="fa ');
	                            __append(escape(val.starCSS));
	                            __append('" aria-hidden="true"></i></a>\n                                <a href="/v1/bm/deleteForm/');
	                            __line = 13;
	                            __append(escape(val.bookmark_id));
	                            __append('"><i class="fa fa-trash" aria-hidden="true"></i></a>\n                            </span>\n\n                        </li>\n                    ');
	                            __line = 17;
	                        }
	                        __append("\n                ");
	                        __line = 18;
	                    });
	                    __append("\n            </ul>\n        </li>\n    ");
	                    __line = 21;
	                }
	                __append("\n\n    ");
	                __line = 23;
	                bm.forEach(function(val, key) {
	                    __append('\n        <li>\n            <a href="');
	                    __line = 25;
	                    __append(escape(val.url));
	                    __append('"> ');
	                    __append(escape(val.title));
	                    __append(' </a>\n            <span class="right">\n                <a href="/v1/bm/editForm/');
	                    __line = 27;
	                    __append(escape(val.bookmark_id));
	                    __append('"><i class="fa fa-edit" aria-hidden="true"></i></a>\n                <a href="/v1/bm/star/');
	                    __line = 28;
	                    __append(escape(val.bookmark_id));
	                    __append('"><i class="fa ');
	                    __append(escape(val.starCSS));
	                    __append('" aria-hidden="true"></i></a>\n                <a href="/v1/bm/deleteForm/');
	                    __line = 29;
	                    __append(escape(val.bookmark_id));
	                    __append('"><i class="fa fa-trash" aria-hidden="true"></i></a>\n            </span>\n\n        </li>\n    ');
	                    __line = 33;
	                });
	                __append("\n</ul>\n");
	                __line = 35;
	            })();
	            __append('\n    </div>\n    <footer class="bm-footer dark-primary-color">\n        <form action="" method="get">\n            <button type="submit" class="button-primary"><i class="fa fa-upload"></i> Import</button>\n            <button type="submit" class="button-primary" action="/example.csv"><i class="fa fa-download"></i> Export</button>\n        </form>\n    </footer>\n</div>\n\n');
	            __line = 16;
	            if (modals.addModal) {
	                __append("\n");
	                __line = 17;
	                (function() {
	                    __append('<div id="openAddModal" class="modal-dialog">\n    <section>\n        <form action="/v1/bm/add/" method="POST">\n            <header class="modal-header dark-primary-color">\n                <h2>Add Bookmark</h2>\n            </header>\n            <div class="modal-body">\n                <label for="name-add">Name</label>\n                <input type="text" placeholder="Name" id="name-add" name="title" required>\n                <label for="address-add">URL</label>\n                <input type="text" placeholder="URL" id="address-add" name="url" pattern="(http:\\/\\/.*)|(https:\\/\\/.*)" title="Must contain http:// or https://" required>\n                <label for="description-add">Description</label>\n                <textarea placeholder="Description" id="description-add" name="description"></textarea>\n                <label for="keyword-add">Keyword</label>\n                <input type="text" placeholder="Keyword" id="keyword-add" name="keywords">\n                <label for="folders">Folder</label>\n                <select name="folders">\n                    ');
	                    __line = 18;
	                    modals.addModal.folders.forEach(function(val, key) {
	                        __append('\n                        <option value="');
	                        __line = 19;
	                        __append(escape(val.folder_id));
	                        __append('">');
	                        __append(escape(val.name));
	                        __append("</option>\n                    ");
	                        __line = 20;
	                    });
	                    __append("\n\n                </select>\n\n\n                ");
	                    __line = 25;
	                    if (modals.addModal.errorMessage) {
	                        __append('\n                <p style="color: red;">');
	                        __line = 26;
	                        __append(escape(modals.addModal.errorMessage));
	                        __append("</p>\n                ");
	                        __line = 27;
	                    }
	                    __append('\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button input="submit" class="button button-primary">Save</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n');
	                    __line = 39;
	                })();
	                __append("\n");
	                __line = 18;
	            } else if (modals.editModal) {
	                __append("\n");
	                __line = 19;
	                (function() {
	                    __append('<!-- Edit Modal -->\n<div id="openEditModal" class="modal-dialog">\n    <section>\n        <form action="/v1/bm/edit/');
	                    __line = 4;
	                    __append(escape(modals.editModal.bm.bookmark_id));
	                    __append('" method="POST">\n            <header class="modal-header dark-primary-color">\n                <h2>Edit Bookmark</h2>\n            </header>\n            <div class="modal-body">\n                <label for="name-edit">Name</label>\n                <input type="text" placeholder="Name" id="name-edit" value="');
	                    __line = 10;
	                    __append(escape(modals.editModal.bm.title));
	                    __append('" name="title" required>\n                <label for="address-edit">URL</label>\n                <input type="text" placeholder="URL" id="address-edit" value="');
	                    __line = 12;
	                    __append(escape(modals.editModal.bm.url));
	                    __append('" name="url" pattern="(http:\\/\\/.*)|(https:\\/\\/.*)" title="Must contain http:// or https://"  required>\n                <label for="description-edit">Description</label>\n                <textarea placeholder="Description" id="description-edit" name="description">');
	                    __line = 14;
	                    __append(escape(modals.editModal.bm.description));
	                    __append('</textarea>\n                <label for="keyword-edit">Keyword</label>\n                <input type="text" placeholder="Keyword" id="keyword-edit" value="');
	                    __line = 16;
	                    __append(escape(modals.editModal.bm.keywords));
	                    __append('" name="keywords">\n\n                <label for="folders">Folders</label>\n                <select name="folders">\n                    ');
	                    __line = 20;
	                    modals.editModal.folders.forEach(function(val, key) {
	                        __append('\n                        <option value="');
	                        __line = 21;
	                        __append(escape(val.folder_id));
	                        __append('">');
	                        __append(escape(val.name));
	                        __append("</option>\n                    ");
	                        __line = 22;
	                    });
	                    __append("\n\n                </select>\n\n\n                ");
	                    __line = 27;
	                    if (modals.editModal.errorMessage) {
	                        __append('\n                <p style="color: red;">');
	                        __line = 28;
	                        __append(escape(modals.addModal.errorMessage));
	                        __append("</p>\n                ");
	                        __line = 29;
	                    }
	                    __append('\n\n\n\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button type="submit" class="button button-primary">Save</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n');
	                    __line = 44;
	                })();
	                __append("\n");
	                __line = 20;
	            } else if (modals.addFolderModal) {
	                __append("\n");
	                __line = 21;
	                (function() {
	                    __append('<!-- Add Folder Modal -->\n<div id="openAddFolderModal" class="modal-dialog">\n    <section>\n        <form action="/v1/bm/addFolder/" method="post">\n            <header class="modal-header dark-primary-color">\n                <h2>Add Folder</h2>\n            </header>\n            <div class="modal-body">\n                <label for="name-folder">Name</label>\n                <input type="text" name="name" placeholder="Name" id="name-folder">\n                <label for="description-folder">Description</label>\n                <textarea name="description" placeholder="Description" id="description-folder"></textarea>\n                <label for="keyword-folder">Keyword</label>\n                <input type="text" name="keyword" placeholder="Keyword" id="keyword-folder">\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button type="submit" class="button button-primary">Save</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n');
	                    __line = 26;
	                })();
	                __append("\n");
	                __line = 22;
	            } else if (modals.deleteModal) {
	                __append("\n");
	                __line = 23;
	                (function() {
	                    __append('<div id="openAddModal" class="modal-dialog">\n    <section>\n        <form action="/v1/bm/delete/');
	                    __line = 3;
	                    __append(escape(modals.deleteModal.bookmark_id));
	                    __append('" method="POST">\n            <header class="modal-header dark-primary-color">\n                <h2>Are you sure you wish to delete \'');
	                    __line = 5;
	                    __append(escape(modals.deleteModal.title));
	                    __append('\'</h2>\n            </header>\n            <div class="modal-body">\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button input="submit" class="button button-primary">Yes</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n');
	                    __line = 19;
	                })();
	                __append("\n");
	                __line = 24;
	            } else if (modals.changeModal) {
	                __append("\n");
	                __line = 25;
	                (function() {
	                    __append('<div id="changeModal" class="modal-dialog">\n    <section>\n        <form action="/v1/change/" method="POST">\n            <header class="modal-header dark-primary-color">\n                <h2>Change Password</h2>\n            </header>\n            <div class="modal-body">\n                <!-- <label for="name-add">Username</label>\n                <input type="email" placeholder="test@test.com" name="username"> -->\n                <label for="keyword-add">Old Password</label>\n                <input type="password" placeholder="old" name="oldPassword">\n                <label for="keyword-add">New Password</label>\n                <input type="password" placeholder="new" name="newPassword">\n                <label for="keyword-add">Retype New Password</label>\n                <input type="password" placeholder="again" name="reNewPassword">\n                ');
	                    __line = 16;
	                    if (modals.changeModal.errorMessage) {
	                        __append('\n                <p class="bm-error-message">\n                    ');
	                        __line = 18;
	                        __append(escape(modals.changeModal.errorMessage));
	                        __append("\n                <p>\n                ");
	                        __line = 20;
	                    }
	                    __append('\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button input="submit" class="button button-primary">Save</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n');
	                    __line = 32;
	                })();
	                __append("\n");
	                __line = 26;
	            }
	            __append('\n\n<!-- <div class="bm-view">\n    <iframe src="http://www.apple.com/"></iframe>\n</div> -->\n');
	            __line = 31;
	        }
	        return __output.join("");
	    } catch (e) {
	        rethrow(e, __lines, __filename, __line);
	    }
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function anonymous(locals, escape, include, rethrow) {
	    rethrow = rethrow || function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    };
	    escape = escape || function(markup) {
	        return markup == undefined ? "" : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	    }, _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	        return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __line = 1, __lines = '<!-- Add Folder Modal -->\n<div id="openAddFolderModal" class="modal-dialog">\n    <section>\n        <form action="/v1/bm/addFolder/" method="post">\n            <header class="modal-header dark-primary-color">\n                <h2>Add Folder</h2>\n            </header>\n            <div class="modal-body">\n                <label for="name-folder">Name</label>\n                <input type="text" name="name" placeholder="Name" id="name-folder">\n                <label for="description-folder">Description</label>\n                <textarea name="description" placeholder="Description" id="description-folder"></textarea>\n                <label for="keyword-folder">Keyword</label>\n                <input type="text" name="keyword" placeholder="Keyword" id="keyword-folder">\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button type="submit" class="button button-primary">Save</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n', __filename = "client-webpack/views/partials/addFolderModal.ejs";
	    try {
	        var __output = [], __append = __output.push.bind(__output);
	        with (locals || {}) {
	            __append('<!-- Add Folder Modal -->\n<div id="openAddFolderModal" class="modal-dialog">\n    <section>\n        <form action="/v1/bm/addFolder/" method="post">\n            <header class="modal-header dark-primary-color">\n                <h2>Add Folder</h2>\n            </header>\n            <div class="modal-body">\n                <label for="name-folder">Name</label>\n                <input type="text" name="name" placeholder="Name" id="name-folder">\n                <label for="description-folder">Description</label>\n                <textarea name="description" placeholder="Description" id="description-folder"></textarea>\n                <label for="keyword-folder">Keyword</label>\n                <input type="text" name="keyword" placeholder="Keyword" id="keyword-folder">\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button type="submit" class="button button-primary">Save</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n');
	            __line = 26;
	        }
	        return __output.join("");
	    } catch (e) {
	        rethrow(e, __lines, __filename, __line);
	    }
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function anonymous(locals, escape, include, rethrow) {
	    rethrow = rethrow || function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    };
	    escape = escape || function(markup) {
	        return markup == undefined ? "" : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	    }, _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	        return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __line = 1, __lines = '<div id="openAddModal" class="modal-dialog">\n    <section>\n        <form action="/v1/bm/add/" method="POST">\n            <header class="modal-header dark-primary-color">\n                <h2>Add Bookmark</h2>\n            </header>\n            <div class="modal-body">\n                <label for="name-add">Name</label>\n                <input type="text" placeholder="Name" id="name-add" name="title" required>\n                <label for="address-add">URL</label>\n                <input type="text" placeholder="URL" id="address-add" name="url" pattern="(http:\\/\\/.*)|(https:\\/\\/.*)" title="Must contain http:// or https://" required>\n                <label for="description-add">Description</label>\n                <textarea placeholder="Description" id="description-add" name="description"></textarea>\n                <label for="keyword-add">Keyword</label>\n                <input type="text" placeholder="Keyword" id="keyword-add" name="keywords">\n                <label for="folders">Folder</label>\n                <select name="folders">\n                    <% modals.addModal.folders.forEach(function(val, key){%>\n                        <option value="<%= val.folder_id %>"><%= val.name %></option>\n                    <% }); %>\n\n                </select>\n\n\n                <% if(modals.addModal.errorMessage) { %>\n                <p style="color: red;"><%= modals.addModal.errorMessage %></p>\n                <% } %>\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button input="submit" class="button button-primary">Save</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n', __filename = "client-webpack/views/partials/addModal.ejs";
	    try {
	        var __output = [], __append = __output.push.bind(__output);
	        with (locals || {}) {
	            __append('<div id="openAddModal" class="modal-dialog">\n    <section>\n        <form action="/v1/bm/add/" method="POST">\n            <header class="modal-header dark-primary-color">\n                <h2>Add Bookmark</h2>\n            </header>\n            <div class="modal-body">\n                <label for="name-add">Name</label>\n                <input type="text" placeholder="Name" id="name-add" name="title" required>\n                <label for="address-add">URL</label>\n                <input type="text" placeholder="URL" id="address-add" name="url" pattern="(http:\\/\\/.*)|(https:\\/\\/.*)" title="Must contain http:// or https://" required>\n                <label for="description-add">Description</label>\n                <textarea placeholder="Description" id="description-add" name="description"></textarea>\n                <label for="keyword-add">Keyword</label>\n                <input type="text" placeholder="Keyword" id="keyword-add" name="keywords">\n                <label for="folders">Folder</label>\n                <select name="folders">\n                    ');
	            __line = 18;
	            modals.addModal.folders.forEach(function(val, key) {
	                __append('\n                        <option value="');
	                __line = 19;
	                __append(escape(val.folder_id));
	                __append('">');
	                __append(escape(val.name));
	                __append("</option>\n                    ");
	                __line = 20;
	            });
	            __append("\n\n                </select>\n\n\n                ");
	            __line = 25;
	            if (modals.addModal.errorMessage) {
	                __append('\n                <p style="color: red;">');
	                __line = 26;
	                __append(escape(modals.addModal.errorMessage));
	                __append("</p>\n                ");
	                __line = 27;
	            }
	            __append('\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button input="submit" class="button button-primary">Save</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n');
	            __line = 39;
	        }
	        return __output.join("");
	    } catch (e) {
	        rethrow(e, __lines, __filename, __line);
	    }
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function anonymous(locals, escape, include, rethrow) {
	    rethrow = rethrow || function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    };
	    escape = escape || function(markup) {
	        return markup == undefined ? "" : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	    }, _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	        return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __line = 1, __lines = '<div id="changeModal" class="modal-dialog">\n    <section>\n        <form action="/v1/change/" method="POST">\n            <header class="modal-header dark-primary-color">\n                <h2>Change Password</h2>\n            </header>\n            <div class="modal-body">\n                <!-- <label for="name-add">Username</label>\n                <input type="email" placeholder="test@test.com" name="username"> -->\n                <label for="keyword-add">Old Password</label>\n                <input type="password" placeholder="old" name="oldPassword">\n                <label for="keyword-add">New Password</label>\n                <input type="password" placeholder="new" name="newPassword">\n                <label for="keyword-add">Retype New Password</label>\n                <input type="password" placeholder="again" name="reNewPassword">\n                <% if(modals.changeModal.errorMessage) { %>\n                <p class="bm-error-message">\n                    <%= modals.changeModal.errorMessage %>\n                <p>\n                <% } %>\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button input="submit" class="button button-primary">Save</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n', __filename = "client-webpack/views/partials/change.ejs";
	    try {
	        var __output = [], __append = __output.push.bind(__output);
	        with (locals || {}) {
	            __append('<div id="changeModal" class="modal-dialog">\n    <section>\n        <form action="/v1/change/" method="POST">\n            <header class="modal-header dark-primary-color">\n                <h2>Change Password</h2>\n            </header>\n            <div class="modal-body">\n                <!-- <label for="name-add">Username</label>\n                <input type="email" placeholder="test@test.com" name="username"> -->\n                <label for="keyword-add">Old Password</label>\n                <input type="password" placeholder="old" name="oldPassword">\n                <label for="keyword-add">New Password</label>\n                <input type="password" placeholder="new" name="newPassword">\n                <label for="keyword-add">Retype New Password</label>\n                <input type="password" placeholder="again" name="reNewPassword">\n                ');
	            __line = 16;
	            if (modals.changeModal.errorMessage) {
	                __append('\n                <p class="bm-error-message">\n                    ');
	                __line = 18;
	                __append(escape(modals.changeModal.errorMessage));
	                __append("\n                <p>\n                ");
	                __line = 20;
	            }
	            __append('\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button input="submit" class="button button-primary">Save</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n');
	            __line = 32;
	        }
	        return __output.join("");
	    } catch (e) {
	        rethrow(e, __lines, __filename, __line);
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function anonymous(locals, escape, include, rethrow) {
	    rethrow = rethrow || function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    };
	    escape = escape || function(markup) {
	        return markup == undefined ? "" : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	    }, _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	        return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __line = 1, __lines = '<div id="openAddModal" class="modal-dialog">\n    <section>\n        <form action="/v1/bm/delete/<%= modals.deleteModal.bookmark_id %>" method="POST">\n            <header class="modal-header dark-primary-color">\n                <h2>Are you sure you wish to delete \'<%= modals.deleteModal.title %>\'</h2>\n            </header>\n            <div class="modal-body">\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button input="submit" class="button button-primary">Yes</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n', __filename = "client-webpack/views/partials/deleteModal.ejs";
	    try {
	        var __output = [], __append = __output.push.bind(__output);
	        with (locals || {}) {
	            __append('<div id="openAddModal" class="modal-dialog">\n    <section>\n        <form action="/v1/bm/delete/');
	            __line = 3;
	            __append(escape(modals.deleteModal.bookmark_id));
	            __append('" method="POST">\n            <header class="modal-header dark-primary-color">\n                <h2>Are you sure you wish to delete \'');
	            __line = 5;
	            __append(escape(modals.deleteModal.title));
	            __append('\'</h2>\n            </header>\n            <div class="modal-body">\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button input="submit" class="button button-primary">Yes</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n');
	            __line = 19;
	        }
	        return __output.join("");
	    } catch (e) {
	        rethrow(e, __lines, __filename, __line);
	    }
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function anonymous(locals, escape, include, rethrow) {
	    rethrow = rethrow || function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    };
	    escape = escape || function(markup) {
	        return markup == undefined ? "" : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	    }, _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	        return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __line = 1, __lines = '<!-- Edit Modal -->\n<div id="openEditModal" class="modal-dialog">\n    <section>\n        <form action="/v1/bm/edit/<%= modals.editModal.bm.bookmark_id %>" method="POST">\n            <header class="modal-header dark-primary-color">\n                <h2>Edit Bookmark</h2>\n            </header>\n            <div class="modal-body">\n                <label for="name-edit">Name</label>\n                <input type="text" placeholder="Name" id="name-edit" value="<%= modals.editModal.bm.title %>" name="title" required>\n                <label for="address-edit">URL</label>\n                <input type="text" placeholder="URL" id="address-edit" value="<%= modals.editModal.bm.url %>" name="url" pattern="(http:\\/\\/.*)|(https:\\/\\/.*)" title="Must contain http:// or https://"  required>\n                <label for="description-edit">Description</label>\n                <textarea placeholder="Description" id="description-edit" name="description"><%= modals.editModal.bm.description %></textarea>\n                <label for="keyword-edit">Keyword</label>\n                <input type="text" placeholder="Keyword" id="keyword-edit" value="<%= modals.editModal.bm.keywords %>" name="keywords">\n\n                <label for="folders">Folders</label>\n                <select name="folders">\n                    <% modals.editModal.folders.forEach(function(val, key){%>\n                        <option value="<%= val.folder_id %>"><%= val.name %></option>\n                    <% }); %>\n\n                </select>\n\n\n                <% if(modals.editModal.errorMessage) { %>\n                <p style="color: red;"><%= modals.addModal.errorMessage %></p>\n                <% } %>\n\n\n\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button type="submit" class="button button-primary">Save</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n', __filename = "client-webpack/views/partials/editModal.ejs";
	    try {
	        var __output = [], __append = __output.push.bind(__output);
	        with (locals || {}) {
	            __append('<!-- Edit Modal -->\n<div id="openEditModal" class="modal-dialog">\n    <section>\n        <form action="/v1/bm/edit/');
	            __line = 4;
	            __append(escape(modals.editModal.bm.bookmark_id));
	            __append('" method="POST">\n            <header class="modal-header dark-primary-color">\n                <h2>Edit Bookmark</h2>\n            </header>\n            <div class="modal-body">\n                <label for="name-edit">Name</label>\n                <input type="text" placeholder="Name" id="name-edit" value="');
	            __line = 10;
	            __append(escape(modals.editModal.bm.title));
	            __append('" name="title" required>\n                <label for="address-edit">URL</label>\n                <input type="text" placeholder="URL" id="address-edit" value="');
	            __line = 12;
	            __append(escape(modals.editModal.bm.url));
	            __append('" name="url" pattern="(http:\\/\\/.*)|(https:\\/\\/.*)" title="Must contain http:// or https://"  required>\n                <label for="description-edit">Description</label>\n                <textarea placeholder="Description" id="description-edit" name="description">');
	            __line = 14;
	            __append(escape(modals.editModal.bm.description));
	            __append('</textarea>\n                <label for="keyword-edit">Keyword</label>\n                <input type="text" placeholder="Keyword" id="keyword-edit" value="');
	            __line = 16;
	            __append(escape(modals.editModal.bm.keywords));
	            __append('" name="keywords">\n\n                <label for="folders">Folders</label>\n                <select name="folders">\n                    ');
	            __line = 20;
	            modals.editModal.folders.forEach(function(val, key) {
	                __append('\n                        <option value="');
	                __line = 21;
	                __append(escape(val.folder_id));
	                __append('">');
	                __append(escape(val.name));
	                __append("</option>\n                    ");
	                __line = 22;
	            });
	            __append("\n\n                </select>\n\n\n                ");
	            __line = 27;
	            if (modals.editModal.errorMessage) {
	                __append('\n                <p style="color: red;">');
	                __line = 28;
	                __append(escape(modals.addModal.errorMessage));
	                __append("</p>\n                ");
	                __line = 29;
	            }
	            __append('\n\n\n\n            </div>\n            <footer class="modal-footer">\n                <!-- <a href="#close" title="Close" class="button">Delete</a> -->\n                <!-- <a href="#close" title="Close" class="button button-danger">Delete</a> -->\n                <a href="/v1/bm/" title="Close" class="button">Cancel</a>\n                <button type="submit" class="button button-primary">Save</button>\n\n            </footer>\n        </form>\n    </section>\n</div>\n');
	            __line = 44;
	        }
	        return __output.join("");
	    } catch (e) {
	        rethrow(e, __lines, __filename, __line);
	    }
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function anonymous(locals, escape, include, rethrow) {
	    rethrow = rethrow || function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    };
	    escape = escape || function(markup) {
	        return markup == undefined ? "" : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	    }, _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	        return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __line = 1, __lines = '<nav>\n    <div class="bm-nav-top row">\n        <h4 class="bm-title">Bookmarx</h4>\n        <div class="right">\n            <a href="/v1/bm/addForm" class="button fa fa-plus fa-2x" aria-hidden="true" title="Add Form"></a>\n            <a href="/v1/bm/addFolderForm" class="button fa fa-folder fa-2x" aria-hidden="true" title="Add Folder"></a>\n            <a href="/v1/change" class="button fa fa-cog fa-2x" aria-hidden="true" title="Change Password"></a>\n            <a href="/v1/logout" class="button fa fa-sign-out fa-2x" aria-hidden="true" title="Logout"></a>\n        </div>\n    </div>\n    <div class="bm-nav-bottom row">\n        <form action="/v1/bm/" method="GET">\n            <input id="bm-search" type="text" name="keyword" placeholder="Search bookmarks">\n            <button type="submit" class="button sb-button-submit fa fa-search" ></button>\n        </form>\n        <form action="/v1/bm/" method="GET">\n            <select id="bm-sort" name="orderBy">\n                <% dd.forEach(function(val, key){%>\n                    <option value="<%= val.value %>" <%= val.selected %>><%= val.name %></option>\n                <% }); %>\n\n            </select>\n            <button type="submit" class="button bm-icon-button fa fa-filter" ></button>\n        </form>\n    </div>\n</nav>\n', __filename = "client-webpack/views/partials/header.ejs";
	    try {
	        var __output = [], __append = __output.push.bind(__output);
	        with (locals || {}) {
	            __append('<nav>\n    <div class="bm-nav-top row">\n        <h4 class="bm-title">Bookmarx</h4>\n        <div class="right">\n            <a href="/v1/bm/addForm" class="button fa fa-plus fa-2x" aria-hidden="true" title="Add Form"></a>\n            <a href="/v1/bm/addFolderForm" class="button fa fa-folder fa-2x" aria-hidden="true" title="Add Folder"></a>\n            <a href="/v1/change" class="button fa fa-cog fa-2x" aria-hidden="true" title="Change Password"></a>\n            <a href="/v1/logout" class="button fa fa-sign-out fa-2x" aria-hidden="true" title="Logout"></a>\n        </div>\n    </div>\n    <div class="bm-nav-bottom row">\n        <form action="/v1/bm/" method="GET">\n            <input id="bm-search" type="text" name="keyword" placeholder="Search bookmarks">\n            <button type="submit" class="button sb-button-submit fa fa-search" ></button>\n        </form>\n        <form action="/v1/bm/" method="GET">\n            <select id="bm-sort" name="orderBy">\n                ');
	            __line = 18;
	            dd.forEach(function(val, key) {
	                __append('\n                    <option value="');
	                __line = 19;
	                __append(escape(val.value));
	                __append('" ');
	                __append(escape(val.selected));
	                __append(">");
	                __append(escape(val.name));
	                __append("</option>\n                ");
	                __line = 20;
	            });
	            __append('\n\n            </select>\n            <button type="submit" class="button bm-icon-button fa fa-filter" ></button>\n        </form>\n    </div>\n</nav>\n');
	            __line = 27;
	        }
	        return __output.join("");
	    } catch (e) {
	        rethrow(e, __lines, __filename, __line);
	    }
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function anonymous(locals, escape, include, rethrow) {
	    rethrow = rethrow || function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    };
	    escape = escape || function(markup) {
	        return markup == undefined ? "" : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	    }, _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	        return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __line = 1, __lines = '<ul>\n    <% for( var fname in folders ){ %>\n        <li class="bm-folder">\n            <i class="fa fa-folder" aria-hidden="true"></i> <%= fname %>\n            <ul>\n                <% folders[fname].forEach(function(val, key){ %>\n                    <% if( val.bookmark_id ){ %>\n                        <li>\n                            <a href="<%= val.url %>"> <%= val.title %> </a>\n                            <span class="right">\n                                <a href="/v1/bm/editForm/<%= val.bookmark_id %>"><i class="fa fa-edit" aria-hidden="true"></i></a>\n                                <a href="/v1/bm/star/<%= val.bookmark_id %>"><i class="fa <%=val.starCSS %>" aria-hidden="true"></i></a>\n                                <a href="/v1/bm/deleteForm/<%= val.bookmark_id %>"><i class="fa fa-trash" aria-hidden="true"></i></a>\n                            </span>\n\n                        </li>\n                    <% } %>\n                <% }); %>\n            </ul>\n        </li>\n    <% }; %>\n\n    <% bm.forEach(function(val, key){ %>\n        <li>\n            <a href="<%= val.url %>"> <%= val.title %> </a>\n            <span class="right">\n                <a href="/v1/bm/editForm/<%= val.bookmark_id %>"><i class="fa fa-edit" aria-hidden="true"></i></a>\n                <a href="/v1/bm/star/<%= val.bookmark_id %>"><i class="fa <%=val.starCSS %>" aria-hidden="true"></i></a>\n                <a href="/v1/bm/deleteForm/<%= val.bookmark_id %>"><i class="fa fa-trash" aria-hidden="true"></i></a>\n            </span>\n\n        </li>\n    <% }); %>\n</ul>\n', __filename = "client-webpack/views/partials/list.ejs";
	    try {
	        var __output = [], __append = __output.push.bind(__output);
	        with (locals || {}) {
	            __append("<ul>\n    ");
	            __line = 2;
	            for (var fname in folders) {
	                __append('\n        <li class="bm-folder">\n            <i class="fa fa-folder" aria-hidden="true"></i> ');
	                __line = 4;
	                __append(escape(fname));
	                __append("\n            <ul>\n                ");
	                __line = 6;
	                folders[fname].forEach(function(val, key) {
	                    __append("\n                    ");
	                    __line = 7;
	                    if (val.bookmark_id) {
	                        __append('\n                        <li>\n                            <a href="');
	                        __line = 9;
	                        __append(escape(val.url));
	                        __append('"> ');
	                        __append(escape(val.title));
	                        __append(' </a>\n                            <span class="right">\n                                <a href="/v1/bm/editForm/');
	                        __line = 11;
	                        __append(escape(val.bookmark_id));
	                        __append('"><i class="fa fa-edit" aria-hidden="true"></i></a>\n                                <a href="/v1/bm/star/');
	                        __line = 12;
	                        __append(escape(val.bookmark_id));
	                        __append('"><i class="fa ');
	                        __append(escape(val.starCSS));
	                        __append('" aria-hidden="true"></i></a>\n                                <a href="/v1/bm/deleteForm/');
	                        __line = 13;
	                        __append(escape(val.bookmark_id));
	                        __append('"><i class="fa fa-trash" aria-hidden="true"></i></a>\n                            </span>\n\n                        </li>\n                    ');
	                        __line = 17;
	                    }
	                    __append("\n                ");
	                    __line = 18;
	                });
	                __append("\n            </ul>\n        </li>\n    ");
	                __line = 21;
	            }
	            __append("\n\n    ");
	            __line = 23;
	            bm.forEach(function(val, key) {
	                __append('\n        <li>\n            <a href="');
	                __line = 25;
	                __append(escape(val.url));
	                __append('"> ');
	                __append(escape(val.title));
	                __append(' </a>\n            <span class="right">\n                <a href="/v1/bm/editForm/');
	                __line = 27;
	                __append(escape(val.bookmark_id));
	                __append('"><i class="fa fa-edit" aria-hidden="true"></i></a>\n                <a href="/v1/bm/star/');
	                __line = 28;
	                __append(escape(val.bookmark_id));
	                __append('"><i class="fa ');
	                __append(escape(val.starCSS));
	                __append('" aria-hidden="true"></i></a>\n                <a href="/v1/bm/deleteForm/');
	                __line = 29;
	                __append(escape(val.bookmark_id));
	                __append('"><i class="fa fa-trash" aria-hidden="true"></i></a>\n            </span>\n\n        </li>\n    ');
	                __line = 33;
	            });
	            __append("\n</ul>\n");
	            __line = 35;
	        }
	        return __output.join("");
	    } catch (e) {
	        rethrow(e, __lines, __filename, __line);
	    }
	}

/***/ }
/******/ ]);