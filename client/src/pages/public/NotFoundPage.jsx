import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Home, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <Card className="max-w-md w-full p-8 text-center space-y-5 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800 shadow-botanical-lg">
        <div className="w-16 h-16 rounded-2xl bg-forest-50 dark:bg-night-900 text-forest dark:text-sage-400 flex items-center justify-center mx-auto">
          <Sprout className="w-8 h-8" />
        </div>
        
        <div className="space-y-1.5">
          <h1 className="text-4xl font-extrabold text-forest-900 dark:text-gray-100">404</h1>
          <h2 className="text-lg font-bold text-charcoal-800 dark:text-gray-200">Botanical Specimen Not Found</h2>
          <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
            The page or route you are looking for has been pruned or does not exist.
          </p>
        </div>

        <div className="pt-2">
          <Link to="/">
            <Button variant="primary" size="md" icon={Home} className="w-full">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
