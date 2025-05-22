import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';

import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const Playground = () => {
  const [latexSyntax, setLatexSyntax] = useState(`這是 **Markdown** 語法\n行內公式：$E = mc^2$\n區塊公式：$$\\int_0^\\infty x^2 dx$$`);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white pt-10">
      <div className="flex w-1/2 p-4">
        <MDEditor
          value={latexSyntax}
          onChange={setLatexSyntax}
          preview="edit"
          className="w-full"
          height={400}
          minHeight={400}
        />
      </div>

      <div className="flex flex-col w-1/2 p-4">
        <div className="text-2xl font-bold mb-4 text-white">原生 Markdown 渲染</div>
        <MDEditor.Markdown source={latexSyntax} />
      </div>

      <div className="flex flex-col w-1/2 p-4">
        <div className="text-2xl font-bold mb-4 text-white">React Markdown 渲染</div>
        <ReactMarkdown
          children={latexSyntax}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          // className="w-full"
          components={{
            p: ({ children }) => <p className="whitespace-pre-line mb-4 text-left">{children}</p>
          }}
          breaks={true}
        />
      </div>
    </div>
  );
};

export default Playground;
