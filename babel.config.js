export default {
    presets: ["@babel/preset-react"],
    plugins: [
        [
            "formatjs",
            {
                removeDefaultMessage: true,
                idInterpolationPattern: "[sha512:contenthash:base64:6]",
                ast: true,
            },
        ],
    ],
};
