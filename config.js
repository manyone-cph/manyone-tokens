const StyleDictionary = require("style-dictionary");

StyleDictionary.registerTransform({
  name: 'size/special',
  type: 'value',
  matcher: function (prop) {
    return prop.attributes.category === 'border' || prop.attributes.category === 'border-radius' || prop.attributes.category === 'spacing';
  },
  transformer: function (prop) {
    if (prop.value === "auto" || prop.value.includes('%')) {
      return prop.value
    } else {
      return prop.value + "px";
    }

  }
});

StyleDictionary.registerTransform({
  name: 'size/app-spacing',
  type: 'value',
  matcher: function (prop) {

    return prop.attributes.category === 'spacing'
  },
  transformer: function (prop) {
    if (prop.value.includes('*')) {
      let val = prop.value.split("*");
      let one = parseInt(val[0])
      let two = parseInt(val[1])
      let out = one * two;
      console.log(out);
      return out
    } else {
      console.log(prop.value);
      return prop.value;
    }

  }
});

StyleDictionary.registerTransform({
  name: 'size/app-font',
  type: 'value',
  matcher: function (prop) {
    return prop.attributes.category === 'font-size';
  },
  transformer: function (prop) {
    if (prop.value.includes('px')) {
      return prop.value.replace('px', '');
    } else {
      return prop.value;
    }

  }
});



StyleDictionary.registerTransform({
  name: 'size/lh',
  type: 'value',
  matcher: function (prop) {

    return prop.attributes.category === 'line-height';
  },
  transformer: function (prop) {
    if (prop.value.includes('%')) {
      let output = prop.value.replace("%", "");
      output = Number(output);

      return output * 0.01
    } else {
      return prop.value;
    }

  }
});

StyleDictionary.registerTransform({
  name: 'size/shadow',
  type: 'value',
  matcher: function (prop) {
    return prop.attributes.category === 'input';
  },
  transformer: function (prop) {
    if (prop.value === "auto" || prop.value.includes('#')) {
      return prop.value
    } else {
      return prop.value + "px";
    }

  }
});

StyleDictionary.registerTransform({
  name: 'size/rem',
  type: 'value',
  matcher: function (prop) {
    return prop.attributes.category === 'letter-spacing';
  },
  transformer: function (prop) {
    return prop.value / 10 + "rem";
  }
});

StyleDictionary.registerTransform({
  name: 'size/fontFamilies',
  type: 'value',
  matcher: function (prop) {
    return prop.attributes.category === 'font-family';
  },
  transformer: function (prop) {
    let output;
    if (prop.value == "DINOT") {
      output = 'var(--ff-primary)';
    } else {
      output = 'var(--ff-secondary)';
    }
    return output;
  }
});
StyleDictionary.registerTransform({
  name: 'size/fontWeight',
  type: 'value',
  matcher: function (prop) {
    return prop.attributes.category === 'font-weight';
  },
  transformer: function (prop) {
    let output;
    if (prop.value == "Light") {
      output = "100";
    } else if (prop.value == "Regular") {
      output = "200";
    } else if (prop.value == "Medium") {
      output = "400";
    } else {
      output = "bold";
    }
    return output;
  }
});

module.exports = {
  source: ["tokens/**/*.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      transforms: ["attribute/cti", "name/cti/kebab", "color/hex", "size/px", "size/special", "size/rem", "size/shadow", "size/lh", "size/fontFamilies", "size/fontWeight"],
      buildPath: './figma/',
      files: [{
        destination: "scss/_figma-variables.scss",
        format: "scss/variables",
      }, {
        destination: "scss/_figma-variables-css.scss",
        format: 'css/variables',
      }],
    }
  }
};