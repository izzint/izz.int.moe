import { minify } from "html-minifier-terser";
import { DateTime } from "luxon";
import { compileStringAsync } from "sass";

export default async function(eleventyConifg) {
    eleventyConifg.addPassthroughCopy({"src/static": "/" });

    eleventyConifg.addTransform("minify", async function (input) {
        if (this.page.outputFileExtension == "html") {
            const minified = minify(input, {
                collapseWhitespace: true
            });
            return minified;
        }
        return input;
    });

    eleventyConifg.addTemplateFormats("scss");

    eleventyConifg.addExtension("scss", {
        outputFileExtension: "css",

        compile: async function (input) {
            const result = await compileStringAsync(input);

            return async (data) => {
                return result.css;
            };
        },
    });

    eleventyConifg.addFilter("shortDate", (date) => {
        return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED).toLowerCase();
    });

    eleventyConifg.addCollection("posts", (collection) => {
        return collection.getFilteredByGlob("src/posts/*.md").toReversed(); // hack
    });

    return {
        dir: {
            input: "src",
            output: "site"
        }
    };
};