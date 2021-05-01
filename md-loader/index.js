const md = require("markdown-it")();
const mdContainer = require("markdown-it-container");
const { compileTemplate } = require("@vue/component-compiler-utils");
const compiler = require("vue-template-compiler");
const demoComponentTagStart = "!-demo-start:";
const demoComponentTagEnd = ":-demo-end!";

md.use(mdContainer, "yt-doc", {
  validate: (params) => {
    return /^yt-doc\s*(.*)$/.test(params.trim());
  },
  render: (tokens, idx) => {
    const tagContent = tokens[idx].info.trim().match(/^yt-doc\s*(.*)$/);
    if (tokens[idx].nesting === 1) {
      const demoHtml =
        tokens[idx + 1].type === "fence" ? tokens[idx + 1].content : "";
      return `<yt-demo-block>${
        tagContent.length > 1 ? tagContent[1] : ""
      }${demoComponentTagStart}${demoHtml}${demoComponentTagEnd}`;
    } else {
      return `</yt-demo-block>\n`;
    }
  },
});

const getTemplateCode = (content) => {
  content = content.trim();
  if (!content) {
    return content;
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, "").trim();
};

const getScriptCode = (content) => {
  const scriptMatch = content.match(/<script>([\s\S]+)<\/script>/);
  return scriptMatch && scriptMatch[1] ? scriptMatch[1].trim() : "";
};

const getComponentsNode = (template, scripts) => {
  const compilerOption = {
    source: `<div>${template}</div>`,
    filename: "demoComponent",
    compiler,
  };
  const compilerResult = compileTemplate(compilerOption);
  if (compilerResult.tips && compilerResult.tips.length) {
    compilerResult.tips.forEach((tip) => {
      console.warn("vue-loader编译tips", tip);
    });
  }
  if (compilerResult.errors && compilerResult.errors.length) {
    compilerResult.errors.forEach((error) => {
      console.error("vue-loader编译error", error);
    });
  }
  const renderFunctionText = compilerResult.code;
  let scriptsText = scripts.trim();
  if (scriptsText) {
    scriptsText = scriptsText.replace(
      /export\s+default/,
      "const demoComponentExport = "
    );
  } else {
    scriptsText = "const demoComponentExport = {}";
  }
  const componentNodeText = `(function(){
    ${renderFunctionText}
    ${scriptsText}
    return {
      render,
      staticRenderFns,
      ...demoComponentExport
    }
  })()`;
  return componentNodeText;
};

module.exports = (sources) => {
  const content = md.render(sources);
  const demoComponentTagStartLen = demoComponentTagStart.length;
  const demoComponentTagEndLen = demoComponentTagEnd.length;
  let startIndex = content.indexOf(demoComponentTagStart);
  let endIndex = content.indexOf(
    demoComponentTagEnd,
    startIndex + demoComponentTagStartLen
  );
  let componentId = 0;
  let output = [];
  let contentIndex = 0;
  const componentOption = [];
  while (startIndex !== -1 && endIndex !== -1) {
    output.push(content.slice(contentIndex, startIndex));
    const componentContent = content.slice(
      startIndex + demoComponentTagStartLen,
      endIndex
    );
    const templateText = getTemplateCode(componentContent);
    const scriptText = getScriptCode(componentContent);
    const nodeCode = getComponentsNode(templateText, scriptText);
    const insertContent = `yt-component-${componentId}`;
    output.push(`<template slot="source"><${insertContent} /></template>`);
    componentOption.push(`'${insertContent}':${nodeCode}`);

    contentIndex = endIndex + demoComponentTagEndLen;
    startIndex = content.indexOf(
      demoComponentTagStart,
      endIndex + demoComponentTagEndLen
    );
    endIndex = content.indexOf(
      demoComponentTagEnd,
      startIndex + demoComponentTagStartLen
    );
    componentId++;
  }
  output.push(content.slice(contentIndex));
  return `<template>
    <div>
        ${output.join("")}
    </div>
    </template>
    <script>
      export default {
        components:{
          ${componentOption.join(",")}
        }
      }
    </script>
    `;
};
