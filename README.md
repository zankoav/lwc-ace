# LWC-ACE

## Setup npm modules

Add `lwc-ace` npm to `lwc.config.json`
```js
...
{
    "modules": [
        {
            "npm": "lwc-ace"
        }
    ]
}
...
```
## Use lwc-ace-loader

Add `lwc-ace-loader` to `webpack.config.json`
```js
...

const pathConstants = 'frontend/common/mixins.scss';

{
    test: /\.s[ac]ss$/i,
    use: [
        "style-loader",
        "css-loader",
        {
            loader: "sass-loader"
        },
        {
            loader: 'lwc-ace-loader',
            options: {
                theme: 'vine'
                mixins: pathWithConstants
            }
        }
    ]
}
...
```

## Release Notes:

### 3.0.0
added lwc-ace-loader README.md
### 2.0.1
Bug fix with mixin imports
### 2.0.0
Update library for lwc webpack plugin

## Library of components:

* Button 0.0.1
```html
<template>
    <ace-button></ace-button>
</template>
```

* Input 0.0.1
```html
<template>
    <ace-input></ace-input>
</template>
```

GitHub source [lwc-ace](https://github.com/zankoav/lwc-ace.git)
