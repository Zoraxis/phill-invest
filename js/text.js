const lang = "en";

let allContent, content, tempaltes;

const getContent = async (filename) => {
  const hostname = window.location.origin;
  const res = await fetch(`${hostname}/static/content-${filename}.json`);
  allContent = await res.json();
  content = allContent[lang];
  const resTempaltes = await fetch(`${hostname}/static/templates-${filename}.json`);
  tempaltes = await resTempaltes.json();
};

const applyContent = () => {
  const contentFields = document.querySelectorAll("[data-text]");
  for (const field of contentFields) {
    const text = field.getAttribute("data-text");
    const value = content[text];
    field.textContent += value;
  }

  const templateFields = document.querySelectorAll("[data-template]");
  for (const templateField of templateFields) {
    const text = templateField.getAttribute("data-template");
    const values = content[text];
    const template = tempaltes[text];

    for (const value of values.data) {
      let markup = template.markup;
      const constantString = values?.constants;

      const defaultValues = !!constantString ? fetchConstValues(values.default, constantString) : values.default;
      const overrrideValues = !!constantString ? fetchConstValues(value, constantString) : value;

      const replacement = {
        ...defaultValues,
        ...overrrideValues,
      };
      for (const [key, val] of Object.entries(replacement)) {
        markup = markup.replaceAll(`{${key}}`, val);
      }
      templateField.innerHTML += markup;
    }
    setTimeout(`${values.callback}`, 1);
  }
};

const fetchConstValues = (object, constantString) => {
  const result = {};
  const constList = getResponsiveValues(constantString);
  for (const [key, val] of Object.entries(object)) {
    if(typeof val == "string" && val.includes("const-")) {
      const constPropString = val.replace("const-", "");
      result[key] = constList[constPropString]
    } else result[key] = val;
  }
  return result;
};

const SetText = async (filename) => {
  await getContent(filename);
  applyContent();
};
