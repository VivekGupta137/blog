'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  children: string;
  id?: string;
}

export default function Mermaid({ children, id }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    });

    if (ref.current) {
      const uniqueId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      mermaid.render(uniqueId, children).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      });
    }
  }, [children, id]);

  return <div ref={ref} className="mermaid-diagram" />;
}