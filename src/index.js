(function () {
    var Submit = {}

    function Parse(element) {
        switch (element.nodeName.toLowerCase()) {
            case "form":
                return ParseForm(element);
            case "input":
                return ParseInput(element);
            default :
                return;
        }
    }

    Submit.Parse = Parse;

    function GetType(object) {
        if (object instanceof Array) {
            return "array";
        } else {
            return (typeof object);
        }
    }

    function Merge(Master, Merger) {
        var object = {};

        var keys = [];
        for (var i in Master) {
            keys[i] = i;
        }

        for (var j in Merger) {
            keys[j] = j;
        }

        for (var key in keys) {
            var master = Master[key];
            var merger = Merger[key];

            switch (GetType(master)) {
                case "array":
                    var result = JSON.parse(JSON.stringify(master));
                    switch (GetType(merger)) {
                        case "array":
                            result = result.concat(merger);
                            object[key] = result;
                            break;
                        case "string":
                            result.push(merger);
                            object[key] = result;
                            break;
                        case "number":
                            result.push(merger);
                            object[key] = result;
                            break;
                        default :
                    }
                    break;
                case "number":
                    object[key] = master;
                    break;
                case "string":
                    object[key] = master;
                    break;
                case "object":
                    switch (GetType(merger)) {
                        case "array":
                            object[key] = master;
                            break;
                        case "object":
                            object[key] = Merge(master, merger);
                            break;
                        default:
                            object[key] = master;
                    }
                    break;
                case "undefined":
                    object[key] = merger;
                default :
            }

        }

        return object;
    }

    Submit.Merge = Merge;

    function ParseForm(form) {
        var object = {};
        for (var i = 0; i < form.length; i++) {
            var element = form.elements[i];
            object = Merge(object, Parse(element));
        }
        return object;
    }

    Submit.ParseForm = ParseForm;

    function ParseInput(input) {
        switch (input.type.toLowerCase()) {
            case 'text':
            case 'hidden':
            case 'password':
            case 'button':
            case 'reset':
            case 'submit':
                return ParseValueInput(input);
            case 'checkbox':
            case 'radio':
                return ParseCheckedInput(input);
            default :
                return;
        }
    }

    Submit.ParseInput = ParseInput;

    function ParseValueInput(Input) {
        return NameandValue(Input.name, Input.value);
    }

    Submit.ParseValueInput = ParseValueInput;

    function ParseCheckedInput(Input) {
        return NameandValue(Input.name, Input.checked);
    }

    Submit.ParseCheckeInput = ParseCheckedInput;

    function NameToDotNotation(name) {
        name = name.replace(/\]/g, "").replace(/\[/g, ".");
        return name;
    }

    Submit.NameToDotNotation = NameToDotNotation;

    function NameandValue(name, value) {
        var obj = {};
        var isArray = false;
        name = NameToDotNotation(name);

        if (name[name.length - 1] === ".") {
            isArray = true;
            name = name.substr(0, name.length - 1);
        }
        var split = name.split(".");
        var currentObj = obj;
        var currentKey;
        while (currentKey = split.shift()) {
            currentObj[currentKey] = {};
            if (split.length === 0) {
                if (isArray)
                    currentObj[currentKey] = [value];
                else
                    currentObj[currentKey] = value;
            } else
                currentObj = currentObj[currentKey];
        }
        return obj;
    }

    Submit.NameandValue = NameandValue;


    if ((typeof module) !== "undefined" && module.exports) {
        module.exports = Submit;
    } else {
        window.Submit = Submit;
    }
})
();
