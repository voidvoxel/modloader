import Mod from "../../../src/Mod.mjs";


const mod = new Mod();

mod.addDecorator(
    cb => {
        console.log("Before");

        const result = cb();

        console.log("After");

        return result;
    }
);


export default mod;
