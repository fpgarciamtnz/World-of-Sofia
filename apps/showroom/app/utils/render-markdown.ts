import MarkdownIt from "markdown-it";

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true
});

interface RenderMarkdownOptions {
  demoteHeadings?: boolean;
}

function demoteHeadings(content: string): string {
  return content
    .replaceAll("<h1", "<h2")
    .replaceAll("</h1>", "</h2>")
    .replaceAll("<h2", "<h3")
    .replaceAll("</h2>", "</h3>")
    .replaceAll("<h3", "<h4")
    .replaceAll("</h3>", "</h4>");
}

export function renderMarkdown(content: string, options: RenderMarkdownOptions = {}): string {
  const rendered = markdown.render(content);
  return options.demoteHeadings ? demoteHeadings(rendered) : rendered;
}
