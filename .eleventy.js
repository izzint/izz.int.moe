import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { DateTime } from "luxon";
import { compileString } from "sass";

export default async function(eleventyConifg) {
    eleventyConifg.addPassthroughCopy({"src/static": "/" });

    eleventyConifg.addTemplateFormats("scss");

    eleventyConifg.addExtension("scss", {
        outputFileExtension: "css",

        compile: async function (input) {
            let result = compileString(input);

            return async (data) => {
                return result.css;
            };
        },
    });

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
            subtitle: "wip",
            base: "https://izz.int.moe",
            author: {
                name: "izz"
            }
        }
    });

    eleventyConifg.addCollection('posts', collection => {
        return collection.getFilteredByGlob('src/posts/*.md')
    });

    return {
        dir: {
            input: "src",
            output: "site"
        }
    };
};