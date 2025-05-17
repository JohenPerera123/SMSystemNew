import React, { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import { FaUsers, FaBaseballBall, FaTicketAlt } from 'react-icons/fa';
import { MdSportsSoccer, MdFeedback } from 'react-icons/md';
import axios from 'axios';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';

const COLORS = ['#1f77b4', '#ffbb28', '#ff6347', '#800080', '#ffa500'];

const AdminSummary = () => {
  const [data, setData] = useState({
    users: 0,
    stadiums: 0,
    events: 0,
    tickets: 0,
    crmComments: 0,
  });

  const [ticketTrend, setTicketTrend] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCounts = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/dashboard/counts');
    const { userCount, stadiumCount, eventCount, ticketCount, crmCount } = res.data;

    setData({
      users: userCount,
      stadiums: stadiumCount,
      events: eventCount,
      tickets: ticketCount,
      crmComments: crmCount,
    });

    // Fetch real ticket trend data
    const trendRes = await axios.get('http://localhost:5000/api/tickets/trend');

    // Format data for chart (fill missing days with 0)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const formatted = date.toISOString().split('T')[0]; // YYYY-MM-DD
      return formatted;
    });

    const trendMap = {};
    trendRes.data.forEach(item => {
      trendMap[item._id] = item.count;
    });

    const chartData = last7Days.map(date => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  }); // like "May 15"

  return {
    date: formattedDate,
    tickets: trendMap[date] || 0
  };
});


    setTicketTrend(chartData);
    setLoading(false);
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    setLoading(false);
  }
};


  useEffect(() => {
    fetchCounts();
  }, []);

  const chartData = [
    { name: 'Users', value: data.users },
    { name: 'Stadiums', value: data.stadiums },
    { name: 'Events', value: data.events },
    { name: 'Tickets', value: data.tickets },
    { name: 'CRM Comments', value: data.crmComments },
  ];

  const radarData = [
    { metric: 'Users', value: Math.min(data.users, 100), fullMark: 100 },
    { metric: 'Stadiums', value: Math.min(data.stadiums, 100), fullMark: 100 },
    { metric: 'Events', value: Math.min(data.events, 100), fullMark: 100 },
    { metric: 'Tickets', value: Math.min(data.tickets, 100), fullMark: 100 },
    { metric: 'CRM Comments', value: Math.min(data.crmComments, 100), fullMark: 100 },
  ];

  if (loading) return <div className="p-6 text-center">Loading dashboard data...</div>;

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-700 mb-4">Admin Dashboard Overview</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <SummaryCard icon={<FaUsers />} text="Total Users" number={data.users} color="bg-blue-500" />
        <SummaryCard icon={<MdSportsSoccer />} text="Total Stadiums" number={data.stadiums} color="bg-yellow-600" />
        <SummaryCard icon={<FaBaseballBall />} text="Upcoming Events" number={data.events} color="bg-red-500" />
        <SummaryCard icon={<FaTicketAlt />} text="Total Tickets Booked" number={data.tickets} color="bg-purple-600" />
        <SummaryCard icon={<MdFeedback />} text="CRM Comments" number={data.crmComments} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Bar Chart */}
        <div style={{ width: '100%', height: 300 }}>
          <h4 className="text-xl font-semibold mb-2">Counts Bar Chart</h4>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={{ width: '100%', height: 300 }}>
          <h4 className="text-xl font-semibold mb-2">Counts Pie Chart</h4>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart for Ticket Trend */}
        <div style={{ width: '100%', height: 300 }}>
          <h4 className="text-xl font-semibold mb-2">Tickets Booked (Last 7 Days)</h4>
          <ResponsiveContainer>
            <LineChart data={ticketTrend} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tickets" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div style={{ width: '100%', height: 300 }}>
          <h4 className="text-xl font-semibold mb-2">Metrics Radar Overview</h4>
          <ResponsiveContainer>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Performance" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
