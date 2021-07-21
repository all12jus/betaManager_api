(function () {
    var output = {
        validateInputs: undefined
    };
    // TODO: test this function more.
    output.validateInputs = function (keys, input) {
        var o;
        o = {
            missingValues: [],
            extraneousValues: [],
            value: {}
        };
        console.log(input);
        console.log(keys);
        var inputKeys = Object.keys(input);
        inputKeys.forEach((function (value) {
            if (keys.indexOf(value) > -1) {
                // good
            }
            else {
                // shouldn't exist
                // @ts-ignore
                o.extraneousValues.push(value);
            }
        }));
        // TODO: calculate extraneousValues
        for (var index = 0; index < keys.length; index++) {
            var key = keys[index];
            console.log(key);
            // if (Object.keys(input).indexOf())
            // @ts-ignore
            if (input[key] == null || input[key] == "") {
                console.log(key + " not load");
                // throw key + " missing";
                // @ts-ignore
                o.missingValues.push(key);
                // break;
            }
            // @ts-ignore
            console.log("o[" + key + "] = " + input[key]);
            // @ts-ignore
            o.value[key] = input[key];
        }
        // for (let key of keys) {
        //
        // }
        return o;
    };
    module.exports = output;
})();
