(()=>{
    const output = {
        validateInputs: undefined
    };

    // TODO: test this function more.
    output.validateInputs = (keys: [String], input: Object) => {
        var o = {};
        for (let key of keys) {
            // @ts-ignore
            if (input[key] == null){
                throw key + " missing";
            }
            // @ts-ignore
            o[key] = input[key];
        }
        return o;
    };


    module.exports = output;
})()