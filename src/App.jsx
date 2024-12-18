import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import * as LucideIcons from 'lucide-react';
import { Code, Eye } from 'lucide-react';
import { createElement as e } from 'react';

const createComponent = (code) => {
  try {
    return Function(
      'React',
      'e',
      ...Object.keys(LucideIcons),
      `${code}
       const components = Object.keys(this).filter(key => 
         typeof this[key] === 'function' && 
         key !== 'createComponent'
       );
       return this[components[components.length - 1]];`
    )(React, React.createElement, ...Object.values(LucideIcons));
  } catch (err) {
    console.error('Component creation error:', err);
    throw err;
  }
};

const App = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const previewRef = useRef(null);
  const [PreviewComponent, setPreviewComponent] = useState(null);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    try {
      const component = createComponent(newCode);
      setPreviewComponent(() => component);
      setError(null);
    } catch (err) {
      setError(err.message);
      setPreviewComponent(null);
    }
  };

  const handleExport = async () => {
    if (!previewRef.current) return;
    
    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1.0,
        backgroundColor: 'white',
      });
      
      const link = document.createElement('a');
      link.download = 'react-component.jpg';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export error:', err);
      setError('Failed to export image: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">React to JPG</h1>
          <p className="mt-3 text-lg text-gray-600">Convert React components to JPG images instantly</p>
        </div>

        {/* Instructions */}
        <div className="mb-12">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">Quick Start Guide</h2>
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">1</div>
                <div>
                  <p className="text-blue-900">Paste your React component code below. Available globals:</p>
                  <ul className="mt-2 list-disc list-inside text-blue-800 text-sm space-y-1 ml-4">
                    <li><code className="bg-blue-100 px-1 rounded">e()</code> for createElement (instead of JSX)</li>
                    <li>All Lucide icons: FileText, Calculator, DollarSign, etc.</li>
                    <li>Tailwind CSS for styling</li>
                    <li>No imports needed - everything is available globally</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">2</div>
                <p className="text-blue-900">Check the live preview to ensure your component renders correctly</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">3</div>
                <p className="text-blue-900">Click "Export as JPG" to download your component as an image</p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Input */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex items-center gap-2">
              <Code className="w-4 h-4 text-gray-500" />
              <div>
                <h2 className="font-medium text-gray-900">Component Code</h2>
                <p className="text-sm text-gray-500">
                  Use e() instead of JSX syntax
                </p>
              </div>
            </div>
            <div className="p-4">
              <textarea
                className="w-full h-64 font-mono text-sm p-4 border rounded-lg 
                         bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         text-gray-900 resize-none"
                value={code}
                onChange={(e) => handleCodeChange(e.target.value)}
                spellCheck="false"
                placeholder="Paste your component code here..."
              />
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <pre className="text-red-600 font-mono text-sm whitespace-pre-wrap">{error}</pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-500" />
                <div>
                  <h2 className="font-medium text-gray-900">Preview</h2>
                  <p className="text-sm text-gray-500">Live preview of your component</p>
                </div>
              </div>
              <button
                onClick={handleExport}
                disabled={!PreviewComponent || error}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm
                         hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Export as JPG
              </button>
            </div>
            <div 
              className="p-8 bg-white"
              ref={previewRef}
            >
              {PreviewComponent && <PreviewComponent />}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-12 pt-8 border-t border-gray-200">
          <p>© 2024 FinancialReports. All rights reserved.</p>
          <p className="mt-2">Convert React components to beautiful JPG images.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
