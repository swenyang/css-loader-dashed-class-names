# css-loader-dashed-class-names
Transform CSS camel-case class names to dashed-case in [`css-loader`](https://github.com/webpack-contrib/css-loader).

This library relies on `getLocalIdent` of css-loader, which requires `webpack >= 2.2.1`.

## How to use

### Install

```
npm i --save-dev css-loader-dashed-class-names
```

### Webpack Configuration

**webpack.config.js**

```js
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const postcssModuleValues = require('postcss-modules-values')
const { dashedCssClassName } = require('css-loader-dashed-class-names')

// put css-loader in module.rules
{
    test: /\.css$/,
    use: [
        {
            loader: 'style-loader',
        },
        {
            loader: 'css-loader',
            options: {
                modules: true,
                importLoaders: '1',
                localIdentName: '[name]-[local]',
                getLocalIdent: dashedCssClassName,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: () => [
                    precss,
                    autoprefixer,
                    postcssModuleValues,
                ],
            },
        },
    ],
},
```

### JS/CSS

**AwesomeComponent.css**

```css
.myRoot {
    color: #f00;
}
```

**AwesomeComponent.js**

```js
import React, { Component } from 'react'
import styles from './AwesomeComponent.css'

export default class AwesomeComponent extends Component {
    render() {
        return (
            <div className={styles.myRoot}>
                You are awesome!
            </div>
        )
    }
}
```

### Output

```css
.awesome-component-my-root {
    color: #f00;
}
```


