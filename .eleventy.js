import { DateTime } from "luxon";
import { compileString } from "sass";

export default async function(eleventyConifg) {
    eleventyConifg.addPassthroughCopy({"src/static": "/" });

    eleventyConifg.addTemplateFormats("scss");

    eleventyConifg.addExtension("scss", {
        outputFileExtension: "css",

        compile: async function (input) {
            let result = compileString(input, {style: "expanded"});

            return async (data) => {
                return result.css;
            };
        },
    });

    eleventyConifg.addFilter("shortDate", (date) => {
        return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED).toLowerCase();
    });

    eleventyConifg.addCollection('posts', collection => {
        return collection.getFilteredByGlob('src/posts/*.md').toReversed() // hack
    });

    return {
        dir: {
            input: "src",
            output: "site"
        }
    };
};