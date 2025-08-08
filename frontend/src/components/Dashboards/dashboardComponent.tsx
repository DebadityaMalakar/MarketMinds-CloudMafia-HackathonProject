// src/pages/Dashboard/dashboardComponent.tsx
import React, { useEffect, useState } from 'react';
import {
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Activity, BarChart2, AlertCircle, RefreshCw, Calendar, DollarSign, MousePointer } from 'react-feather';

interface AnalyticsData {
  event_name: string;
  count: number;
  total_value?: number;
}

interface TimeSeriesData {
  date: string;
  count: number;
}

interface PageViewData {
  page: string;
  count: number;
}

interface PurchaseData {
  amount: number;
  count: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Hardcoded data from analytics_rows.json
const hardcodedData = [
  {"idx":0,"id":1,"event_name":"\"Test Event\"","event_value":"123","timestamp":"2025-08-08 22:01:38.133038+00","details":"{\"note\": \"sample\"}","user_id":null,"created_at":"2025-08-08 22:06:26.182388+00"},
  {"idx":1,"id":2,"event_name":"page_view","event_value":"1","timestamp":"2025-08-08 22:05:26.535577+00","details":"{\"page\": \"/home\"}","user_id":null,"created_at":"2025-08-08 22:06:26.182388+00"},
  {"idx":2,"id":3,"event_name":"page_view","event_value":"1","timestamp":"2025-08-08 22:07:12.382898+00","details":"{\"page\": \"/home\"}","user_id":"7c5b5222-0108-4520-85fd-76087214dd47","created_at":"2025-08-08 22:07:12.382898+00"},
  {"idx":3,"id":4,"event_name":"page_view","event_value":"1","timestamp":"2025-08-08 22:57:13.235083+00","details":"{\"page\": \"/home\"}","user_id":null,"created_at":"2025-08-08 22:57:13.235083+00"},
  {"idx":4,"id":5,"event_name":"page_view","event_value":"1","timestamp":"2025-08-08 22:57:13.235083+00","details":"{\"page\": \"/products\"}","user_id":null,"created_at":"2025-08-08 22:57:13.235083+00"},
  {"idx":5,"id":6,"event_name":"page_view","event_value":"1","timestamp":"2025-08-08 22:57:13.235083+00","details":"{\"page\": \"/about\"}","user_id":null,"created_at":"2025-08-08 22:57:13.235083+00"},
  {"idx":6,"id":7,"event_name":"click","event_value":"5","timestamp":"2025-08-08 22:57:13.235083+00","details":"{\"button\": \"signup\"}","user_id":null,"created_at":"2025-08-08 22:57:13.235083+00"},
  {"idx":7,"id":8,"event_name":"click","event_value":"3","timestamp":"2025-08-08 22:57:13.235083+00","details":"{\"button\": \"add_to_cart\"}","user_id":null,"created_at":"2025-08-08 22:57:13.235083+00"},
  {"idx":8,"id":9,"event_name":"purchase","event_value":"1","timestamp":"2025-08-08 22:57:13.235083+00","details":"{\"amount\": 49.99, \"currency\": \"USD\"}","user_id":null,"created_at":"2025-08-08 22:57:13.235083+00"},
  {"idx":9,"id":10,"event_name":"purchase","event_value":"2","timestamp":"2025-08-08 22:57:13.235083+00","details":"{\"amount\": 99.99, \"currency\": \"USD\"}","user_id":null,"created_at":"2025-08-08 22:57:13.235083+00"},
  {"idx":10,"id":11,"event_name":"page_view","event_value":"1","timestamp":"2025-08-08 22:57:13.235083+00","details":"{\"page\": \"/contact\"}","user_id":null,"created_at":"2025-08-08 22:57:13.235083+00"},
  {"idx":11,"id":12,"event_name":"click","event_value":"4","timestamp":"2025-08-08 22:57:13.235083+00","details":"{\"button\": \"subscribe\"}","user_id":null,"created_at":"2025-08-08 22:57:13.235083+00"},
  {"idx":12,"id":13,"event_name":"error","event_value":"1","timestamp":"2025-08-08 22:57:13.235083+00","details":"{\"message\": \"Page not found\"}","user_id":null,"created_at":"2025-08-08 22:57:13.235083+00"},
  {"idx":13,"id":14,"event_name":"page_view","event_value":"1","timestamp":"2025-08-08 23:00:22.405438+00","details":"{\"page\": \"/home\"}","user_id":null,"created_at":"2025-07-30 23:00:22.405438+00"},
  {"idx":14,"id":15,"event_name":"page_view","event_value":"1","timestamp":"2025-08-08 23:00:22.405438+00","details":"{\"page\": \"/products\"}","user_id":null,"created_at":"2025-07-30 23:00:22.405438+00"},
  {"idx":15,"id":16,"event_name":"click","event_value":"3","timestamp":"2025-08-08 23:00:22.405438+00","details":"{\"button\": \"signup\"}","user_id":null,"created_at":"2025-07-31 23:00:22.405438+00"},
  {"idx":16,"id":17,"event_name":"purchase","event_value":"1","timestamp":"2025-08-08 23:00:22.405438+00","details":"{\"amount\": 49.99, \"currency\": \"USD\"}","user_id":null,"created_at":"2025-07-31 23:00:22.405438+00"},
  {"idx":17,"id":18,"event_name":"page_view","event_value":"1","timestamp":"2025-08-08 23:00:22.405438+00","details":"{\"page\": \"/about\"}","user_id":null,"created_at":"2025-08-01 23:00:22.405438+00"},
  {"idx":18,"id":19,"event_name":"click","event_value":"2","timestamp":"2025-08-08 23:00:22.405438+00","details":"{\"button\": \"add_to_cart\"}","user_id":null,"created_at":"2025-08-01 23:00:22.405438+00"},
  {"idx":19,"id":20,"event_name":"purchase","event_value":"1","timestamp":"2025-08-08 23:00:22.405438+00","details":"{\"amount\": 99.99, \"currency\": \"USD\"}","user_id":null,"created_at":"2025-08-02 23:00:22.405438+00"},
  {"idx":20,"id":21,"event_name":"page_view","event_value":"1","timestamp":"2025-08-08 23:00:22.405438+00","details":"{\"page\": \"/contact\"}","user_id":null,"created_at":"2025-08-02 23:00:22.405438+00"},
  {"idx":21,"id":22,"event_name":"error","event_value":"1","timestamp":"2025-08-08 23:00:22.405438+00","details":"{\"message\": \"Page not found\"}","user_id":null,"created_at":"2025-08-03 23:00:22.405438+00"},
  {"idx":22,"id":23,"event_name":"click","event_value":"4","timestamp":"2025-08-08 23:00:22.405438+00","details":"{\"button\": \"subscribe\"}","user_id":null,"created_at":"2025-08-04 23:00:22.405438+00"},
  {"idx":23,"id":24,"event_name":"purchase","event_value":"1","timestamp":"2025-08-08 23:00:22.405438+00","details":"{\"amount\": 19.99, \"currency\": \"USD\"}","user_id":null,"created_at":"2025-08-05 23:00:22.405438+00"},
  {"idx":24,"id":25,"event_name":"page_view","event_value":"1","timestamp":"2025-08-08 23:00:22.405438+00","details":"{\"page\": \"/home\"}","user_id":null,"created_at":"2025-08-06 23:00:22.405438+00"},
  {"idx":25,"id":26,"event_name":"click","event_value":"3","timestamp":"2025-08-08 23:00:22.405438+00","details":"{\"button\": \"signup\"}","user_id":null,"created_at":"2025-08-06 23:00:22.405438+00"},
  {"idx":26,"id":27,"event_name":"purchase","event_value":"2","timestamp":"2025-08-08 23:00:22.405438+00","details":"{\"amount\": 199.99, \"currency\": \"USD\"}","user_id":null,"created_at":"2025-08-07 23:00:22.405438+00"},
  {"idx":27,"id":28,"event_name":"page_view","event_value":"1","timestamp":"2025-08-08 23:00:22.405438+00","details":"{\"page\": \"/products\"}","user_id":null,"created_at":"2025-08-07 23:00:22.405438+00"}
];

const DashboardComponent: React.FC = () => {
  const [eventCounts, setEventCounts] = useState<AnalyticsData[]>([]);
  const [pageViews, setPageViews] = useState<PageViewData[]>([]);
  const [purchases, setPurchases] = useState<PurchaseData[]>([]);
  const [timeSeries, setTimeSeries] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'events' | 'pages' | 'purchases' | 'trends'>('events');

  const processData = () => {
    setLoading(true);
    setError(null);

    try {
      const events = hardcodedData;

      // Process event counts
      const eventCountMap = new Map<string, number>();
      const pageViewMap = new Map<string, number>();
      const purchaseMap = new Map<number, number>();
      const dateCountMap = new Map<string, number>();

      events.forEach((event: any) => {
        // Count events by type
        const currentCount = eventCountMap.get(event.event_name) || 0;
        eventCountMap.set(event.event_name, currentCount + 1);

        // Special handling for page views
        if (event.event_name === 'page_view') {
          try {
            const details = typeof event.details === 'string' 
              ? JSON.parse(event.details.replace(/\\"/g, '"')) 
              : event.details;
            const page = details?.page || 'unknown';
            const currentPageCount = pageViewMap.get(page) || 0;
            pageViewMap.set(page, currentPageCount + 1);
          } catch (e) {
            console.error('Error parsing page view details:', e);
            const currentPageCount = pageViewMap.get('unknown') || 0;
            pageViewMap.set('unknown', currentPageCount + 1);
          }
        }

        // Special handling for purchases
        if (event.event_name === 'purchase') {
          try {
            const details = typeof event.details === 'string' 
              ? JSON.parse(event.details.replace(/\\"/g, '"')) 
              : event.details;
            const amount = details?.amount || 0;
            const currentPurchaseCount = purchaseMap.get(amount) || 0;
            purchaseMap.set(amount, currentPurchaseCount + 1);
          } catch (e) {
            console.error('Error parsing purchase details:', e);
          }
        }

        // Count by date for time series
        if (event.created_at) {
          const date = new Date(event.created_at).toISOString().split('T')[0];
          const currentDateCount = dateCountMap.get(date) || 0;
          dateCountMap.set(date, currentDateCount + 1);
        }
      });

      // Convert maps to arrays
      setEventCounts(
        Array.from(eventCountMap.entries())
          .map(([event_name, count]) => ({ event_name, count }))
          .filter(item => item.count > 0)
          .sort((a, b) => b.count - a.count)
      );

      setPageViews(
        Array.from(pageViewMap.entries())
          .map(([page, count]) => ({ page, count }))
          .filter(item => item.count > 0)
          .sort((a, b) => b.count - a.count)
      );

      setPurchases(
        Array.from(purchaseMap.entries())
          .map(([amount, count]) => ({ amount, count }))
          .filter(item => item.count > 0)
          .sort((a, b) => b.amount - a.amount)
      );

      setTimeSeries(
        Array.from(dateCountMap.entries())
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      );
    } catch (err) {
      console.error('Error processing analytics:', err);
      setError(err instanceof Error ? err.message : 'Failed to process analytics');
      setEventCounts([]);
      setPageViews([]);
      setPurchases([]);
      setTimeSeries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    processData();
  }, []);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Activity className="text-accent-blue" size={24} />
          <h2 className="text-xl font-bold text-text-primary">Analytics Dashboard</h2>
        </div>
        <button 
          onClick={processData}
          className="flex items-center gap-2 text-sm text-accent-blue hover:text-accent-blue-dark transition-colors"
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      <div className="mb-4 text-text-secondary">
        <p>Track user interactions and event metrics across your application.</p>
        <p className="text-sm mt-1">Showing data from all recorded events</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-accent-yellow/10 border border-accent-yellow rounded-lg text-accent-yellow">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'events' ? 'bg-accent-blue text-white' : 'bg-surface-highlight'}`}
        >
          <div className="flex items-center gap-2">
            <Activity size={16} />
            Event Counts
          </div>
        </button>
        <button
          onClick={() => setActiveTab('pages')}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'pages' ? 'bg-accent-blue text-white' : 'bg-surface-highlight'}`}
        >
          <div className="flex items-center gap-2">
            <MousePointer size={16} />
            Page Views
          </div>
        </button>
        <button
          onClick={() => setActiveTab('purchases')}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'purchases' ? 'bg-accent-blue text-white' : 'bg-surface-highlight'}`}
        >
          <div className="flex items-center gap-2">
            <DollarSign size={16} />
            Purchases
          </div>
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'trends' ? 'bg-accent-blue text-white' : 'bg-surface-highlight'}`}
        >
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            Activity Trends
          </div>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-text-secondary">
          <RefreshCw size={24} className="animate-spin mr-2" />
          Loading analytics data...
        </div>
      ) : (
        <div className="bg-surface-highlight rounded-lg p-4 border border-border-muted">
          {activeTab === 'events' && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-text-primary flex items-center gap-2">
                <BarChart2 size={18} />
                Event Counts
              </h3>
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={eventCounts}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="event_name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      fill="var(--color-accent-blue)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {activeTab === 'pages' && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-text-primary flex items-center gap-2">
                <MousePointer size={18} />
                Page Views
              </h3>
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pageViews}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="page"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pageViews.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {activeTab === 'purchases' && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-text-primary flex items-center gap-2">
                <DollarSign size={18} />
                Purchase Amounts
              </h3>
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={purchases}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="amount" 
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip 
                      formatter={(value, name, props) => [value, name]}
                      labelFormatter={(label) => `Amount: ${formatCurrency(label)}`}
                    />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      fill="var(--color-accent-green)" 
                      radius={[4, 4, 0, 0]}
                      name="Number of Purchases"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {activeTab === 'trends' && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-text-primary flex items-center gap-2">
                <Calendar size={18} />
                Activity Over Time
              </h3>
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone"
                      dataKey="count" 
                      stroke="var(--color-accent-blue)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          <p className="text-xs text-text-secondary mt-2">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardComponent;