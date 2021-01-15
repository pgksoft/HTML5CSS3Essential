module.exports = {
    "plugins": [
        "@babel/plugin-transform-classes",
        "@babel/plugin-proposal-class-properties"
    ],
    presets: [
        ['@babel/env', {
            targets: {
                node: 'current'
            }
        }]
    ]
};