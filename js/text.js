const lang = "en";

let allContent, content, tempaltes;

const getContent = async () => {
  const res = await fetch(`./static/content.json`);
  allContent = await res.json();
  content = allContent[lang];
  const resTempaltes = await fetch(`./static/templates.json`);
  tempaltes = await resTempaltes.json();
};

const applyContent = () => {
  const contentFields = document.querySelectorAll("[data-text]");
  for (const field of contentFields) {
    const text = field.getAttribute("data-text");
    const value = content[text];
    field.textContent = value;
  }

  const templateFields = document.querySelectorAll("[data-template]");
  for (const templateField of templateFields) {
    const text = templateField.getAttribute("data-template");
    const values = content[text];
    const template = tempaltes[text];

    for (const value of values.data) {
      let markup = template.markup;
      const replacement = {
        ...values.default,
        ...value
      }
      for (const [key, val] of Object.entries(replacement)) {
        markup = markup.replace(`{${key}}`, val);
      }
      templateField.innerHTML += markup;
    }
    setTimeout(`${values.callback}`, 1);
  }
};

const LanguageChangeHandle = async () => {
  await getContent();
  applyContent();
};
LanguageChangeHandle();
