/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { ClipboardCopyIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
interface CodeBasicProps {
  codeBlock: string;
}
const copyToClipboard = (code: string) => {
  navigator.clipboard.writeText(code).then(() => {
    toast.info('Código copiado', {
      position: 'top-right',
      duration: 10000,
      action: {
        label: 'Cerrar',
        onClick: () => console.log('Undo'),
      },
    });
  });
};
export const CodeBasic: React.FC<CodeBasicProps> = ({ codeBlock }) => (
  <div className="relative">
    <Highlight theme={themes.vsDark} code={codeBlock} language="javascript">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} p-4 overflow-x-auto`}
          style={{ ...style }}
        >
          <button
            onClick={() => copyToClipboard(codeBlock)}
            className="absolute top-0 right-0 m-2 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
          >
            <ClipboardCopyIcon className="h-5 w-5" />
          </button>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  </div>
);
