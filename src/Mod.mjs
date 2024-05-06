import JavaScriptInjector from "javascript-injector";
import * as uuid from "uuid";
import babel from "@babel/core";
import parseFunction from "@voidvoxel/parse-function";


/**
 * A collection of modifications to be applied to JavaScript source code.
 * The same `Mod` can be used to modify `Function`s, source code files, and
 * even entire JavaScript packages.
 */
export default class Mod extends JavaScriptInjector {
    /**
     * @type {string}
     */
    #uuid


    constructor () {
        super();

        this.#uuid = uuid.v4();
    }


    /**
     * Get this `Mod`'s UUID.
     *
     * @public
     * @since v1.0.1
     * @version 1.0.0
     *
     * @returns {string}
     * The `Mod`'s UUID.
     */
    uuid () {
        return this.#uuid;
    }


    /**
     * Modify source code by applying this injector's headers, footers, and
     * decorators to the source code.
     *
     * @public
     * @since v1.0.1
     * @version 1.0.0-alpha
     *
     * @param {string} sourceCode
     * The source code to modify.
     * @returns {string}
     * The modified source code.
     */
    inject (sourceCode) {
        sourceCode = super.inject(sourceCode);

        const transformOptions = {
            compact: true,
            plugins: [
                "@babel/plugin-transform-modules-commonjs"
            ]
        };

        sourceCode = babel.transformSync(
            sourceCode,
            transformOptions
        ).code;

        return sourceCode;
    }


    /**
     * Modify source code by applying this injector's headers, footers, and
     * decorators to the source code.
     *
     * @public
     * @since v1.0.1
     * @version 1.0.0-alpha
     *
     * @param {Function} f
     * The source code to modify.
     * @returns {string}
     * The modified source code.
     */
    injectFunction (f) {
        const ast = parseFunction(f);

        let body = ast.getBody();

        body = this
            .inject(body)
            .replace(
                `"use strict";`,
                `return `
            );

        ast.setBody(body);

        return ast.toFunction();
    }
}
