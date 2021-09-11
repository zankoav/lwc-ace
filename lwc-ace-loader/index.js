const loaderUtils = require('loader-utils');
const fs = require('fs');
const path = require('path');

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  let content = '';
  if (options && options.mixins) {
    const pathMixin = path.resolve(options.mixins);
    this.addDependency(pathMixin);
    content = fs.readFileSync(pathMixin).toString();
    source = source.replace('/* mixins */', content);
  } else if(options && options.theme){
    source = source.replace(
      `@import './../../../common/mixins_ace';`, 
      `@import './../../../common/mixins_${options.theme}';`
    );
  }
  return source;
};