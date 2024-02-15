const lang = "en";

let allContent, content;

const getContent = async () => {
  const res = await fetch(`./content.json`);
  allContent = await res.json();
  content = allContent[lang];
};

const applyContent = () => {
  const contentFields = document.querySelectorAll("[data-text]");
  for (const field of contentFields) {
    const text = field.getAttribute("data-text");
    const value = content[text];
    field.textContent = value;
  }
};

const LanguageChangeHandle = async () => {
  await getContent();
  applyContent();
};
LanguageChangeHandle();
