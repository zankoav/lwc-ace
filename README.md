# LWC ACE

## Webpack Config

Add `ace` namespace to LWCWebpackPlugin
```js
...
    plugins: [
        new LWCWebpackPlugin({
            namespace: {
                ace: path.resolve("./node_modules/lwc-ace/frontend/components")
            }
        })
    ],
...
```

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
