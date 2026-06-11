'use client';

import { useState } from 'react';
import { QRConfig, BatchItem } from '@/types/qr';
import { parseCSVToBatch } from '@/lib/csv-parser';
import { renderQR } from '@/lib/qr-renderer';
import { downloadAllAsZip, printBatchLayout } from '@/lib/export-utils';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Loader2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface BatchPanelProps {
  config: QRConfig;
}

const SAMPLE_CSV = `label,url,type
GitHub,https://github.com,url
Google,https://google.com,url
LinkedIn,https://linkedin.com,url
`;

export default function BatchPanel({ config }: BatchPanelProps) {
  const [csvText, setCsvText] = useState('');
  const [items, setItems] = useState<BatchItem[]>([]);
  const [error, setError] = useState('');
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<
    Array<{ label: string; svgString: string; dataURL: string }>
  >([]);

  const handleParse = () => {
    setError('');
    try {
      const parsed = parseCSVToBatch(csvText);
      if (parsed.length === 0) {
        setError('No valid rows found. Check your CSV format.');
        return;
      }
      setItems(parsed);
    } catch {
      setError('Failed to parse CSV. Check the format.');
    }
  };

  const handleGenerate = async () => {
    if (items.length === 0) return;
    setGenerating(true);
    const out: Array<{ label: string; svgString: string; dataURL: string }> = [];

    for (const item of items) {
      try {
        const result = await renderQR(item.data, { ...config, logoFile: config.logoFile });
        out.push({ label: item.label, svgString: result.svgString, dataURL: result.dataURL });
      } catch {
        // skip failed items
      }
    }

    setResults(out);
    setGenerating(false);
  };

  const handleDownloadAll = (format: 'png' | 'svg') => {
    if (results.length === 0) return;
    downloadAllAsZip(results, format);
  };

  const handlePrintAll = () => {
    if (results.length === 0) return;
    printBatchLayout(results);
  };

  return (
    <div className="space-y-6">
      {/* CSV Input */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FileSpreadsheet className="w-5 h-5 text-accent" />
          <h3 className="font-semibold">Batch CSV Input</h3>
        </div>
        <p className="text-sm text-muted mb-3">
          Paste CSV with columns: <code className="px-1 py-0.5 rounded bg-surface-hover text-xs">label, data, type</code>.
          Type defaults to URL if not specified.
        </p>
        <textarea
          className="w-full px-3 py-3 rounded-xl border border-border bg-surface text-foreground text-sm font-mono min-h-[140px] resize-y focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-smooth"
          placeholder={`label,url,type\nGitHub,https://github.com,url\nGoogle,https://google.com,url`}
          value={csvText}
          onChange={(e) => setCsvText(e.target.value)}
        />
        {error && (
          <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleParse}
            className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-smooth"
          >
            Parse CSV
          </button>
          <button
            onClick={() => {
              setCsvText(SAMPLE_CSV);
              setError('');
            }}
            className="px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-surface-hover transition-smooth"
          >
            Load Sample
          </button>
          <button
            onClick={() => {
              setCsvText('');
              setItems([]);
              setResults([]);
              setError('');
            }}
            className="px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-surface-hover transition-smooth"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Parsed Items */}
      {items.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-sm">
              Parsed Items ({items.length})
            </h4>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-smooth disabled:opacity-50 flex items-center gap-2"
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate All'
              )}
            </button>
          </div>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {items.map((item, i) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-3 py-2 rounded-xl border border-border bg-surface text-sm"
              >
                <span className="w-6 h-6 rounded-lg bg-accent-light text-accent text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="font-medium truncate">{item.label}</span>
                <span className="text-muted text-xs truncate flex-1">{item.data}</span>
                <span className="px-2 py-0.5 rounded-md bg-surface-hover text-xs text-muted">
                  {item.dataType}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h4 className="font-semibold text-sm">
                Generated ({results.length})
              </h4>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDownloadAll('png')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium hover:opacity-90 transition-smooth"
              >
                <Download className="w-3.5 h-3.5" />
                All PNG (ZIP)
              </button>
              <button
                onClick={() => handleDownloadAll('svg')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-xs font-medium hover:bg-surface-hover transition-smooth"
              >
                <Download className="w-3.5 h-3.5" />
                All SVG (ZIP)
              </button>
              <button
                onClick={handlePrintAll}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-xs font-medium hover:bg-surface-hover transition-smooth"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Grid
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {results.map((r, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border border-border bg-surface text-center"
              >
                <div
                  className="aspect-square flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: r.svgString }}
                />
                <p className="text-xs text-muted mt-2 truncate">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
