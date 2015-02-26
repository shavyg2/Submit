//run with nodeunit

var form = require("./FakeForm");
var Submit = require("../src");


var name= "person[name][first]";
exports.Conversion=function(test){
    var result = Submit.NameToDotNotation(name);

    test.equals("person.name.first",result,result);
    test.done();
}

exports.ConversionObject=function(test){
    var result = Submit.NameandValue(name,"Steve");

    test.deepEqual({person:{name:{first:"Steve"}}},result,result);
    test.done();
}


exports.Merger=function(test){

    var first={person:{name:{first:"Steve"}}};
    var last= {person:{name:{last:"Jobs"}}};
    var result=Submit.Merge(first,last);

    test.deepEqual({person:{name:{first:"Steve",last:"Jobs"}}},result,result);
    test.done();
}


exports.MergerArray=function(test){

    var first={person:{name:{first:"Steve"},home:["City"]}};
    var last= {person:{name:{last:"Jobs"},home:["Cottage"]}};
    var result=Submit.Merge(first,last);

    test.deepEqual({person:{name:{first:"Steve",last:"Jobs"},home:["City","Cottage"]}},result,JSON.stringify(result,null,2));
    test.done();
}