'use client';

import Link from 'next/link';
import { useHealthCheck } from '@/hooks/useProjects';

export default function StatusPage() {
  const { isHealthy, isLoading, error, lastChecked } = useHealthCheck();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-large p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                System Status
              </h1>
              
              <div className="mb-8">
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                    <span className="ml-3 text-lg text-gray-600">Checking status...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isHealthy ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <span className={`text-2xl ${
                        isHealthy ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isHealthy ? '✅' : '❌'}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className={`text-2xl font-bold ${
                        isHealthy ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isHealthy ? 'All Systems Operational' : 'Service Unavailable'}
                      </div>
                      <div className="text-gray-600">
                        Backend: {isHealthy ? 'OK' : 'Error'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-red-400">⚠️</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Connection Error
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        {error.message || 'Unable to connect to the backend service.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Service Information
                </h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frontend Status:</span>
                    <span className="text-green-600 font-medium">Operational</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Backend Status:</span>
                    <span className={`font-medium ${
                      isHealthy ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isHealthy ? 'Operational' : 'Offline'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">API Base URL:</span>
                    <span className="text-gray-900 font-mono text-xs">
                      {process.env.NEXT_PUBLIC_MANIFEST_API_BASE || 'Not configured'}
                    </span>
                  </div>
                  
                  {lastChecked && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Checked:</span>
                      <span className="text-gray-900">
                        {new Date(lastChecked).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/"
                  className="btn btn-primary"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
