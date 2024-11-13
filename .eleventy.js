import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default async function(eleventyConifg) {
    // i could improve this a good bit
    eleventyConifg.addPassthroughCopy({"src/static": "/" });

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