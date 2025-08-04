'use client';

import { useState, useRef, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[] | string;
}

export default function CodeBlock({ 
  children, 
  language = 'text', 
  filename,
  showLineNumbers = true,
  highlightLines 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Parse highlight lines
  const parseHighlightLines = (highlightLines?: number[] | string): number[] => {
    if (!highlightLines) return [];
    
    if (Array.isArray(highlightLines)) {
      return highlightLines;
    }
    
    // Parse string format like "1,3-5,7"
    const lines: number[] = [];
    const parts = highlightLines.split(',');
    
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()));
        for (let i = start; i <= end; i++) {
          lines.push(i);
        }
      } else {
        const lineNum = parseInt(trimmed);
        if (!isNaN(lineNum)) {
          lines.push(lineNum);
        }
      }
    }
    
    return lines;
  };

  const highlightedLines = parseHighlightLines(highlightLines);

  // Custom light theme style
  const customStyle = {
    ...oneLight,
    'pre[class*="language-"]': {
      ...oneLight['pre[class*="language-"]'],
      background: '#fafafa',
      margin: 0,
      padding: '1rem',
      fontSize: '14px',
      lineHeight: '1.6',
      overflow: 'visible',
    },
    'code[class*="language-"]': {
      ...oneLight['code[class*="language-"]'],
      background: 'transparent',
      fontSize: '14px',
      fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    },
  };

  return (
    <div className="relative group my-4 sm:my-6 rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          {/* Traffic lights - hidden on mobile */}
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          {/* Filename */}
          {filename && (
            <span className="text-xs sm:text-sm text-gray-700 font-mono truncate">{filename}</span>
          )}
          
          {/* Language badge */}
          {language && language !== 'text' && (
            <span className="text-xs bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-medium shrink-0">
              {language}
            </span>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-gray-700 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-gray-100 px-1.5 sm:px-2 py-1 rounded-md shrink-0"
          title="Copy code"
        >
          {copied ? (
            <>
              <FiCheck size={14} className="text-green-600 sm:w-4 sm:h-4" />
              <span className="text-xs text-green-600 hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <FiCopy size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div ref={codeRef} className="relative overflow-x-auto w-full max-w-full">
        <SyntaxHighlighter
          language={language}
          style={customStyle}
          showLineNumbers={showLineNumbers && !isMobile}
          lineNumberStyle={{
            color: '#9ca3af',
            backgroundColor: 'transparent',
            paddingRight: isMobile ? '0.5rem' : '0.75rem',
            marginRight: isMobile ? '0.25rem' : '0.5rem',
            borderRight: '1px solid #e5e7eb',
            minWidth: isMobile ? '1.5rem' : '2rem',
            textAlign: 'right',
            userSelect: 'none',
            fontSize: isMobile ? '12px' : '14px',
          }}
          wrapLines={false}
          lineProps={(lineNumber) => {
            const isHighlighted = highlightedLines.includes(lineNumber);
            return {
              style: {
                backgroundColor: isHighlighted ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                borderLeft: isHighlighted ? '3px solid #3b82f6' : '3px solid transparent',
                paddingLeft: isMobile ? '0.5rem' : '0.75rem',
                paddingRight: isMobile ? '0.5rem' : '1rem',
                display: 'block',
                whiteSpace: 'pre',
              }
            };
          }}
          customStyle={{
            background: '#fafafa',
            margin: 0,
            padding: isMobile ? '1rem 0' : '1.5rem 0',
            fontSize: isMobile ? '12px' : '14px',
            lineHeight: '1.5',
            overflow: 'visible',
            whiteSpace: 'pre',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              whiteSpace: 'pre',
              fontSize: isMobile ? '12px' : '14px',
            }
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}