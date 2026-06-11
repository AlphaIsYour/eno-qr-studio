'use client';

import { QRConfig, PRESET_COLORS, PatternStyle, CornerStyle, ErrorCorrectionLevel } from '@/types/qr';
import { Upload, X } from 'lucide-react';

interface CustomizePanelProps {
  config: QRConfig;
  onChange: (config: Partial<QRConfig>) => void;
}

const inputClass =
  'w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-smooth';
const labelClass = 'block text-sm font-medium mb-1.5';

export default function CustomizePanel({ config, onChange }: CustomizePanelProps) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange({ logoFile: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Colors */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Colors</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Foreground</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.foregroundColor}
                onChange={(e) => onChange({ foregroundColor: e.target.value })}
                className="w-10 h-10 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={config.foregroundColor}
                onChange={(e) => onChange({ foregroundColor: e.target.value })}
                className={`${inputClass} flex-1 font-mono text-xs`}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.backgroundColor}
                onChange={(e) => onChange({ backgroundColor: e.target.value })}
                className="w-10 h-10 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={config.backgroundColor}
                onChange={(e) => onChange({ backgroundColor: e.target.value })}
                className={`${inputClass} flex-1 font-mono text-xs`}
              />
            </div>
          </div>
        </div>
        {/* Color presets */}
        <div className="mt-3">
          <label className="text-xs text-muted mb-2 block">Quick Colors</label>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => onChange({ foregroundColor: c })}
                className="w-6 h-6 rounded-md border border-border/50 hover:scale-110 transition-smooth"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onChange({ foregroundColor: '#000000', backgroundColor: '#ffffff' })}
            className="text-xs px-3 py-1 rounded-lg border border-border hover:bg-surface-hover transition-smooth"
          >
            B&W
          </button>
          <button
            onClick={() => onChange({ foregroundColor: '#ffffff', backgroundColor: '#000000' })}
            className="text-xs px-3 py-1 rounded-lg border border-border hover:bg-surface-hover transition-smooth"
          >
            Inverted
          </button>
          <button
            onClick={() => onChange({ foregroundColor: '#6366f1', backgroundColor: '#eef2ff' })}
            className="text-xs px-3 py-1 rounded-lg border border-border hover:bg-surface-hover transition-smooth"
          >
            Indigo
          </button>
          <button
            onClick={() => onChange({ foregroundColor: '#10b981', backgroundColor: '#ecfdf5' })}
            className="text-xs px-3 py-1 rounded-lg border border-border hover:bg-surface-hover transition-smooth"
          >
            Emerald
          </button>
        </div>
      </div>

      {/* Pattern Style */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Pattern Style</h4>
        <div className="grid grid-cols-3 gap-2">
          {(['square', 'rounded', 'dots', 'classy', 'classy-rounded', 'extra-rounded'] as PatternStyle[]).map((s) => (
            <button
              key={s}
              onClick={() => onChange({ patternStyle: s })}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-smooth ${
                config.patternStyle === s
                  ? 'border-accent bg-accent-light text-accent'
                  : 'border-border hover:bg-surface-hover'
              }`}
            >
              {s.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Corner Style */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Corner Style</h4>
        <div className="grid grid-cols-3 gap-2">
          {(['square', 'dot', 'rounded'] as CornerStyle[]).map((s) => (
            <button
              key={s}
              onClick={() => onChange({ cornerStyle: s })}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-smooth capitalize ${
                config.cornerStyle === s
                  ? 'border-accent bg-accent-light text-accent'
                  : 'border-border hover:bg-surface-hover'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Error Correction */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Error Correction</h4>
        <div className="grid grid-cols-4 gap-2">
          {(['L', 'M', 'Q', 'H'] as ErrorCorrectionLevel[]).map((level) => (
            <button
              key={level}
              onClick={() => onChange({ errorCorrectionLevel: level })}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-smooth ${
                config.errorCorrectionLevel === level
                  ? 'border-accent bg-accent-light text-accent'
                  : 'border-border hover:bg-surface-hover'
              }`}
            >
              {level === 'L' ? 'Low' : level === 'M' ? 'Med' : level === 'Q' ? 'Quart' : 'High'}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted mt-2">
          Higher correction = more damage tolerance. Use &quot;High&quot; when adding a logo.
        </p>
      </div>

      {/* Size & Margin */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Dimensions</h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-medium">Size</label>
              <span className="text-xs text-muted font-mono">{config.size}px</span>
            </div>
            <input
              type="range"
              min={200}
              max={1000}
              step={50}
              value={config.size}
              onChange={(e) => onChange({ size: Number(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-medium">Margin</label>
              <span className="text-xs text-muted font-mono">{config.margin}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              step={4}
              value={config.margin}
              onChange={(e) => onChange({ margin: Number(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Logo */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Logo Overlay</h4>
        {config.logoFile ? (
          <div className="relative">
            <div className="p-3 rounded-xl border border-border bg-surface flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={config.logoFile}
                alt="Logo"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">Logo uploaded</p>
                <p className="text-xs text-muted">Centered in QR code</p>
              </div>
              <button
                onClick={() => onChange({ logoFile: null })}
                className="p-1.5 rounded-lg hover:bg-surface-hover transition-smooth"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium">Logo Size</label>
                <span className="text-xs text-muted font-mono">{config.logoSize}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={35}
                step={1}
                value={config.logoSize}
                onChange={(e) => onChange({ logoSize: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed border-border hover:border-accent/50 cursor-pointer transition-smooth">
            <Upload className="w-6 h-6 text-muted" />
            <span className="text-sm text-muted">Click to upload logo</span>
            <span className="text-xs text-muted/70">PNG, JPG, SVG recommended</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
}
