import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { DateTime } from "luxon";
import { compileString } from "sass";
import { minify } from "html-minifier-terser";

export default async function(eleventyConifg) {
    eleventyConifg.addPassthroughCopy({"src/static": "/" });

    eleventyConifg.addTemplateFormats("scss");

    eleventyConifg.addExtension("scss", {
        outputFileExtension: "css",

        compile: async function (input) {
            let result = compileString(input, {style: "compressed"});

            return async (data) => {
                return result.css;
            };
        },
    });

    eleventyConifg.addTransform("minify", async function (input) {
        if (this.page.outputFileExtension == "html") {
            let minified = minify(input, {
                collapseWhitespace: true
            });
            return minified
        }
        return input;
    })

    eleventyConifg.addFilter("shortDate", (date) => {
        return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED).toLowerCase();
    });

    eleventyConifg.addPlugin(feedPlugin, {
        type: "rss",
        outputPath: "/feed.xml",
        collection: {
            name: "posts",
            limit: 15
        },
        metadata: {
            language: "en",
            title: "izzint",
            base: "https://izz.int.moe",
            author: {
                name: "izz",
                email: "izz@int.moe"
            }
        }
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