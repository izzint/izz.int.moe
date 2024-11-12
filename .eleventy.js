import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default async function(eleventyConifg) {
    eleventyConifg.addPassthroughCopy("static/css");

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

    return {
        dir: {
            input: "src",
            output: "site"
        }
    };
};