import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowLeft, Compass } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <Card className="max-w-md w-full text-center space-y-6 p-8 border-sage-200 dark:border-night-600 shadow-botanical-lg">
        <div className="w-16 h-16 rounded-2xl bg-forest-50 dark:bg-night-900 border border-forest-100 dark:border-night-600 flex items-center justify-center text-forest dark:text-forest-400 mx-auto">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-600 dark:text-forest-400">404 Error</span>
          <h1 className="text-2xl font-bold text-forest-900 dark:text-gray-100">Specimen Not Found</h1>
          <p className="text-xs text-charcoal-500 dark:text-gray-400 leading-relaxed">
            The botanical pathway or page you are searching for might have been repotted, renamed, or is currently unavailable.
          </p>
        </div>

        <div className="pt-2">
          <Link to="/">
            <Button variant="primary" size="md" icon={ArrowLeft} className="w-full">
              Return to Botanical Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
