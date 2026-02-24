import { DateTime } from "luxon";
import { compileStringAsync } from "sass";

export default async function(eleventyConifg) {
    eleventyConifg.addPassthroughCopy({"src/static": "/" });

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

    eleventyConifg.addFilter("bigAssDate", (date) => {
        return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_HUGE).toLowerCase();
    });

    eleventyConifg.addFilter("enshorten", (what) => {
        var shortend = what.trim()

        return shortend.split(" ").slice(0, 32).join(" "); // :c
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