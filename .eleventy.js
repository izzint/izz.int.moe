export default async function(eleventyConifg) {
    return {
        dir: {
            input: "src",
            output: "site"
        }
    };
    eleventyConifg.addPassthroughCopy("static/css");
};