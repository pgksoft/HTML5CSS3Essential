/// <binding ProjectOpened='Watch - Development' />
"use strict";
const path = require('path');

module.exports =
    [
        // ./js =======================================================================
        {
            entry: {
                device: "./js/device.js",
                shortDescription: "./js/shortDescription.js",
                index: "./js/index.js",
                indexLesson: "./js/indexLesson.js"
            },
            module: {
                rules: [{ exclude: /node_modules/ }]
            },
            output: {
                filename: "[name].dist.js",
                path: path.resolve(__dirname, 'js')
            }
        },
        // ./js-advanced ==============================================================
        {
            entry: {
                IamWorking: "./js-advanced/IamWorking.ts",
                _pgkUtils: "./js-advanced/_pgkUtils.ts"
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/
                    }
                ]
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js']
            },
            output: {
                filename: "[name].dist.js",
                path: path.resolve(__dirname, 'js-advanced')
            }
        },
        {
            entry: {
                clipPath: "./js-advanced/clipPath.js"
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env"]
                            }
                        }
                    }
                ]
            },
            output: {
                filename: "[name].dist.js",
                path: path.resolve(__dirname, 'js-advanced')
            }
        },
        // lessons-essential
        // ./lessons-essential/lesson03/js =======================================================================
        {
            entry: {
                geolocation: "./lessons-essential/lesson03/js/geolocation.js",
                dragdrop: "./lessons-essential/lesson03/js/dragdrop.js"
            },
            module: {
                rules: [{ exclude: /node_modules/ }]
            },
            output: {
                filename: "[name].dist.js",
                path: path.resolve(__dirname, 'lessons-essential/lesson03/js')
            }
        },
        // ./lessons-essential/lesson04/js =======================================================================
        {
            entry: {
                AddTask: "./lessons-essential/lesson04/js/AddTask.js",
                Task02: "./lessons-essential/lesson04/js/Task02.js",
                RoundRange: "./lessons-essential/lesson04/js/RoundRange.js"
            },
            module: {
                rules: [{ exclude: /node_modules/ }]
            },
            output: {
                filename: "[name].dist.js",
                path: path.resolve(__dirname, 'lessons-essential/lesson04/js')
            }
        },
        // ./lessons-essential/lesson05/js =======================================================================
        {
            entry: {
                addTask: "./lessons-essential/lesson05/js/addTask.js",
                workerArray: "./lessons-essential/lesson05/js/workerArray.js",
                task02: "./lessons-essential/lesson05/js/task02.js",
                online: "./lessons-essential/lesson05/js/online.js",
                offline: "./lessons-essential/lesson05/js/offline.js",
                calculator: "./lessons-essential/lesson05/js/calculator.js"
            },
            module: {
                rules: [{ exclude: /node_modules/ }]
            },
            output: {
                filename: "[name].dist.js",
                path: path.resolve(__dirname, 'lessons-essential/lesson05/js')
            }
        },
        // ./lessons-essential/lesson06/js =======================================================================
        {
            entry: {
                colorsAnimation: "./lessons-essential/lesson06/js/colorsAnimation.js"
            },
            module: {
                rules: [{ exclude: /node_modules/ }]
            },
            output: {
                filename: "[name].dist.js",
                path: path.resolve(__dirname, 'lessons-essential/lesson06/js')
            }
        },
        // ./lessons-essential/lesson09/js =======================================================================
        {
            entry: {
                addTask: "./lessons-essential/lesson09/js/addTask.js",
                playingCards: "./lessons-essential/lesson09/js/playingCards.js"
            },
            module: {
                rules: [{ exclude: /node_modules/ }]
            },
            output: {
                filename: "[name].dist.js",
                path: path.resolve(__dirname, 'lessons-essential/lesson09/js')
            }
        },
        // lessons-ts-fundamentals
        // lessons-ts-fundamentals/ts ==============================================================
        {
            entry: {
                indexTSLesson: "./lessons-ts-fundamentals/ts/indexTSLesson.ts"
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/
                    }
                ]
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js']
            },
            output: {
                filename: "[name].dist.js",
                path: path.resolve(__dirname, 'lessons-ts-fundamentals/ts')
            }
        },
        // ./lessons-ts-fundamentals/lesson01/ts ===================================================
        {
            entry: {
                independentTask: "./lessons-ts-fundamentals/lesson01/ts/independentTask.ts"
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/
                    }
                ]
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js']
            },
            output: {
                filename: "[name].dist.js",
                path: path.resolve(__dirname, 'lessons-ts-fundamentals/lesson01/ts')
            }
        },
        // ./lessons-ts-fundamentals/lesson02/ts ===================================================
        {
            entry: {
                addTask: "./lessons-ts-fundamentals/lesson02/ts/addTask.ts",
                cars: "./lessons-ts-fundamentals/lesson02/ts/cars.ts"
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/
                    }
                ]
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js']
            },
            output: {
                filename: "[name].dist.js",
                path: path.resolve(__dirname, 'lessons-ts-fundamentals/lesson02/ts')
            }
        },
        // ./lessons-ts-fundamentals/lesson03/ts ===================================================
        {
            entry: {
                addTask: "./lessons-ts-fundamentals/lesson03/ts/addTask.ts",
                dictionary: "./lessons-ts-fundamentals/lesson03/ts/dictionary.ts"
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/
                    }
                ]
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js']
            },
            output: {
                filename: "[name].dist.js",
                path: path.resolve(__dirname, 'lessons-ts-fundamentals/lesson03/ts')
            }
        },
        // ./lessons-advanced/lesson01/ts ===================================================
        {
            entry: {
                travelAgency: "./lessons-advanced/lesson01/ts/travelAgency.ts"
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/
                    }
                ]
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js']
            },
            output: {
                filename: "[name].dist.js",
                path: path.resolve(__dirname, 'lessons-advanced/lesson01/ts')
            }
        },
        // ./lessons-advanced/lesson02/ts/view ===================================================
        {
            entry: {
                bmAsyncCanvas: "./lessons-advanced/lesson02/ts/view/bmAsyncCanvas.js"
            },
            module: {
                rules: [{ exclude: /node_modules/ }]
            },
            output: {
                filename: "[name].dist.js",
                path: path.resolve(__dirname, 'lessons-advanced/lesson02/ts/view')
            }
        },
        // ./lessons-advanced/lesson02/ts ===================================================
        {
            entry: {
                bmSimulation: "./lessons-advanced/lesson02/ts/bmSimulation.ts"
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/
                    }
                ]
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js']
            },
            output: {
                filename: "[name].dist.js",
                path: path.resolve(__dirname, 'lessons-advanced/lesson02/ts')
            }
        }
    ];
