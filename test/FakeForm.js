var extend = require("extend");


var element = {
    name: "",
    value: ""
}

var input = extend({
    nodeName: "INPUT"
}, element);


var textarea = extend({
    nodeName: "TEXTAREA"
}, element);

var select = extend({
    nodeName: "SELECT"
}, element);


var button = extend({
    nodeName: "BUTTON"
}, element);


var form = {
    elements: [
        extend({
            name: "Name[First]"
        }, input),
        extend({
            name: "Name[Last]"
        }, input)
    ]
}


module.exports=form;