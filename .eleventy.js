import { DateTime } from "luxon";
import { compileString } from "sass";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default async function (eleventyConifg) {
    eleventyConifg.addPassthroughCopy({ "src/static": "/" });

    eleventyConifg.addTemplateFormats("scss");
    eleventyConifg.addExtension("scss", {
        outputFileExtension: "css",

        compile: async function (input) {
            const result = compileString(input);

            return async (data) => {
                return result.css;
            };
        },
    });

    eleventyConifg.addFilter("bigAssDate", (date) => {
        return DateTime.fromJSDate(date).setZone('America/Toronto').toLocaleString(DateTime.DATETIME_HUGE).toLowerCase();
    });

    eleventyConifg.addFilter("rssDate", (date) => {
        return DateTime.fromJSDate(date).setZone('America/Toronto').toRFC2822();
    });

    eleventyConifg.addShortcode("rssBuildDate", function () {
        return DateTime.now().setZone('America/Toronto').toRFC2822();
    });

    eleventyConifg.addFilter("enshorten", (what) => {
        var shortend = what.trim()
        return shortend.split(" ").slice(0, 32).join(" "); // :c
    });

    eleventyConifg.addCollection("posts", (collection) => {
        return collection.getFilteredByGlob("src/posts/*.md").toReversed(); // hack
    });

    eleventyConifg.addPlugin(syntaxHighlight);

    return {
        dir: {
            input: "src",
            output: "site"
        }
    };
};