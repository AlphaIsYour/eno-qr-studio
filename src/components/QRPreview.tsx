'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { QRConfig } from '@/types/qr';
import { renderQR } from '@/lib/qr-renderer';
import { downloadSVG, downloadPNG, printQRCode } from '@/lib/export-utils';
import { Download, Image as ImageIcon, Printer, Copy, Check, Loader2 } from 'lucide-react';

interface QRPreviewProps {
  data: string;
  config: QRConfig;
  label?: string;
}

export default function QRPreview({ data, config, label }: QRPreviewProps) {
  const [svgString, setSvgString] = useState('');
  const [dataURL, setDataURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cancelledRef = useRef(false);

  const generate = useCallback(async () => {
    if (!data) {
      setSvgString('');
      setDataURL('');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const result = await renderQR(data, config);
      if (!cancelledRef.current) {
        setSvgString(result.svgString);
        setDataURL(result.dataURL);
      }
    } catch {
      if (!cancelledRef.current) {
        setSvgString('');
        setDataURL('');
      }
    } finally {
      if (!cancelledRef.current) setLoading(false);
    }
  }, [data, config]);

  useEffect(() => {
    cancelledRef.current = false;
    const timer = setTimeout(generate, 150);
    return () => {
      cancelledRef.current = true;
      clearTimeout(timer);
    };
  }, [generate]);

  const handleCopySVG = async () => {
    if (!svgString) return;
    try {
      await navigator.clipboard.writeText(svgString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = svgString;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayName = label || 'qr-code';

  return (
    <div className="flex flex-col items-center">
      {/* QR Code Display */}
      <div
        ref={containerRef}
        className="relative w-full aspect-square max-w-[400px] rounded-2xl border border-border bg-white flex items-center justify-center overflow-hidden"
      >
        {loading ? (
          <div className="flex flex-col items-center gap-3 text-muted">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm">Generating...</span>
          </div>
        ) : svgString ? (
          <div
            className="w-full h-full flex items-center justify-center p-4"
            dangerouslySetInnerHTML={{ __html: svgString }}
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-muted/50">
            <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-current flex items-center justify-center">
              <ImageIcon className="w-10 h-10" />
            </div>
            <span className="text-sm">Enter data to preview</span>
          </div>
        )}
      </div>

      {/* Actions */}
      {svgString && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          <button
            onClick={() => downloadPNG(dataURL, displayName)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-smooth"
          >
            <Download className="w-4 h-4" />
            PNG
          </button>
          <button
            onClick={() => downloadSVG(svgString, displayName)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-surface-hover transition-smooth"
          >
            <Download className="w-4 h-4" />
            SVG
          </button>
          <button
            onClick={() => printQRCode(svgString, displayName)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-surface-hover transition-smooth"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={handleCopySVG}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-surface-hover transition-smooth"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy SVG'}
          </button>
        </div>
      )}
    </div>
  );
}
