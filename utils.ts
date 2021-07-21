(()=>{
    const output = {
        validateInputs: undefined
    };

    // TODO: test this function more.
    output.validateInputs = (keys: [String], input: Object) => {
        let o: { missingValues: [String]|[]; value: Object };
        o = {
            missingValues: [],
            value: {}
        };
        console.log(input);
        console.log(keys);

        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            console.log(key);

            // if (Object.keys(input).indexOf())

            // @ts-ignore
            if (input[key] == null || input[key] == ""){
                console.log(`${key} not load`)
                // throw key + " missing";
                // @ts-ignore
                o.missingValues.push(key);
                // break;
            }
            // @ts-ignore
            console.log(`o[${key}] = ${input[key]}`)
            // @ts-ignore
            o.value[key] = input[key];
        }
        
        // for (let key of keys) {
        //
        // }
        return o;
    };


    module.exports = output;
})()