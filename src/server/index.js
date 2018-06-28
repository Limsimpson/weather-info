var express = require('express')
var request = require('request')
var CORS = require('cors')()

var app = express();
app.use(CORS);

app.get('/', function(req, res){
    var qs = {
        ServiceKey: 'RXYj1YEzzEX5xeWcHvrxNes+WiOiTlEdxSySJDQtu+tr6Ld25XgCqOvr5p+OOYsgY8NGgmBEM75e4r7fZVKSuw==',
        _returnType: 'json',
        ...req.query
    }
    request({
        url: 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureLIst',
        qs: qs
    }).pipe(res);
})

app.listen(8000);
