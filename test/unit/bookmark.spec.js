var bookmark = require('../../server/api_v2/bookmark/bookmark.controller.js')
var expect = require('expect.js')
var httpMocks = require('node-mocks-http');

describe('bookmark', function(){
    before(function(done){
        db = require('../../server/db');
        var config = require('../../server/config/environment');
        db.init(config.mysql).then(function(){
            done();
        });
    })

    it('should list bookmarks', function(done){
        this.timeout(10000);
        // var orderBy = req.query.orderBy || "";
        // var keyword = req.query.keyword;
        // var uid = req.user.id;

        var request  = httpMocks.createRequest({
            method: 'GET',
            url: '/v2/bookmark',
            user : {
                id : 1
            }
        });
        var response = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });

        var bmp = bookmark.list(request, response);

        response.on('end', function() {
            var data = JSON.parse( response._getData() );
            console.log('response', data)
            expect(response.statusCode).to.equal(200);
            expect(response._isJSON()).to.be(true);
            // expect(response._isUTF8()).to.be(true);
            done();
        });

    })
})
