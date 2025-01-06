import type { Element, RootContent, Text } from 'hast';

export function isCodeSnippet(node: RootContent) {
  return (
    node.type === 'element' &&
    node.tagName === 'pre' &&
    (node.children[0] as Element)?.tagName === 'code'
  );
}

export function getCodeSnippetParamsForNode(node: RootContent) {
  const output = {
    lang: '',
    text: ''
  };

  if (isCodeSnippet(node)) {
    const firstChild = (node as Element).children[0] as Element;
    const codeElementClassName: string[] = (firstChild.properties.className as string[]) || [];

    output.lang = codeElementClassName ? codeElementClassName[0].replace(/^language-/, '') : '';
    output.text = (firstChild.children[0] as Text).value;
  }

  return output;
}
