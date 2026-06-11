'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  QrCode,
  ArrowLeft,
  Type,
  Link as LinkIcon,
  Wifi,
  User,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  MapPin,
  Layers,
  FileSpreadsheet,
  Settings,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { QRConfig, QRDataType, QR_TYPE_INFO } from '@/types/qr';
import { encodeQRData, getDefaultFields } from '@/lib/qr-encoder';
import DataTypeForm from '@/components/DataTypeForm';
import CustomizePanel from '@/components/CustomizePanel';
import QRPreview from '@/components/QRPreview';
import BatchPanel from '@/components/BatchPanel';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Type,
  Link: LinkIcon,
  Wifi,
  User,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  MapPin,
};

const DEFAULT_CONFIG: QRConfig = {
  dataType: 'url',
  data: '',
  foregroundColor: '#000000',
  backgroundColor: '#ffffff',
  cornerStyle: 'square',
  patternStyle: 'square',
  size: 500,
  margin: 20,
  errorCorrectionLevel: 'M',
  logoFile: null,
  logoSize: 20,
};

type Tab = 'single' | 'batch';

export default function GeneratorPage() {
  const [tab, setTab] = useState<Tab>('single');
  const [dataType, setDataType] = useState<QRDataType>('url');
  const [fields, setFields] = useState<Record<string, string | boolean>>(getDefaultFields('url'));
  const [config, setConfig] = useState<QRConfig>(DEFAULT_CONFIG);
  const [showCustomize, setShowCustomize] = useState(true);

  const handleDataTypeChange = (newType: QRDataType) => {
    setDataType(newType);
    setFields(getDefaultFields(newType));
    setConfig((c) => ({ ...c, dataType: newType }));
  };

  const encodedData = useMemo(() => {
    return encodeQRData(dataType, fields);
  }, [dataType, fields]);

  const handleConfigChange = (partial: Partial<QRConfig>) => {
    setConfig((c) => ({ ...c, ...partial }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border no-print">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl hover:bg-surface-hover transition-smooth"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <QrCode className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">Eno QR Studio</span>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl border border-border bg-surface">
            <button
              onClick={() => setTab('single')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
                tab === 'single'
                  ? 'bg-accent text-white'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <Layers className="w-4 h-4" />
              Single
            </button>
            <button
              onClick={() => setTab('batch')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
                tab === 'batch'
                  ? 'bg-accent text-white'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              Batch
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {tab === 'single' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Data Input */}
            <div className="lg:col-span-4 space-y-6">
              {/* QR Type Selector */}
              <div className="p-5 rounded-2xl border border-border bg-surface">
                <h3 className="font-semibold text-sm mb-3">QR Code Type</h3>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(QR_TYPE_INFO) as QRDataType[]).map((type) => {
                    const info = QR_TYPE_INFO[type];
                    const IconComp = ICON_MAP[info.icon] || Type;
                    return (
                      <button
                        key={type}
                        onClick={() => handleDataTypeChange(type)}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl text-xs font-medium border transition-smooth ${
                          dataType === type
                            ? 'border-accent bg-accent-light text-accent'
                            : 'border-border hover:bg-surface-hover'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                        <span>{info.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Data Form */}
              <div className="p-5 rounded-2xl border border-border bg-surface">
                <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                  {(() => {
                    const info = QR_TYPE_INFO[dataType];
                    const IconComp = ICON_MAP[info.icon] || Type;
                    return <IconComp className="w-4 h-4 text-accent" />;
                  })()}
                  {QR_TYPE_INFO[dataType].label} Data
                </h3>
                <DataTypeForm
                  dataType={dataType}
                  fields={fields}
                  onChange={setFields}
                />
              </div>
            </div>

            {/* Center: Preview */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 p-6 rounded-2xl border border-border bg-surface">
                <h3 className="font-semibold text-sm mb-4 text-center">Live Preview</h3>
                <QRPreview
                  data={encodedData}
                  config={config}
                  label={`${dataType}-qr`}
                />
                {encodedData && (
                  <div className="mt-4 p-3 rounded-xl bg-surface-hover">
                    <p className="text-xs text-muted mb-1">Encoded Data:</p>
                    <p className="text-xs font-mono break-all line-clamp-3">{encodedData}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Customization */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <button
                  onClick={() => setShowCustomize(!showCustomize)}
                  className="w-full flex items-center justify-between p-4 rounded-t-2xl border border-border bg-surface lg:cursor-default lg:pointer-events-none"
                >
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-accent" />
                    <span className="font-semibold text-sm">Customization</span>
                  </div>
                  <span className="lg:hidden">
                    {showCustomize ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>
                <div
                  className={`p-5 rounded-b-2xl border border-t-0 border-border bg-surface ${
                    showCustomize ? 'block' : 'hidden lg:block'
                  }`}
                >
                  <CustomizePanel config={config} onChange={handleConfigChange} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl border border-border bg-surface">
              <BatchPanel config={config} />
            </div>

            {/* Batch Customize */}
            <div className="mt-6 p-6 rounded-2xl border border-border bg-surface">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-4 h-4 text-accent" />
                <h3 className="font-semibold text-sm">Batch QR Style</h3>
              </div>
              <CustomizePanel config={config} onChange={handleConfigChange} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
