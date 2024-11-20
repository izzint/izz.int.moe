import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { DateTime } from "luxon";

export default async function(eleventyConifg) {
    eleventyConifg.addPassthroughCopy({"src/static": "/" });

    eleventyConifg.addFilter("shortDate", (date) => {
        return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_FULL);
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
            base: "https://izz.nekoweb.org",
            author: {
                name: "izzint"
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