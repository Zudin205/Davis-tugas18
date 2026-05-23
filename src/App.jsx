import React from 'react';
import ReactECharts from 'echarts-for-react';
import './App.css';

function App() {
  // 1. Hook - Donut Chart
  const hookOption = {
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: ['60%', '80%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          formatter: '25%',
          fontSize: 60,
          fontWeight: 'bold',
          color: '#ef4444' // Red
        },
        data: [
          { value: 25, name: 'Zona Kritis (Berisiko Tinggi)', itemStyle: { color: '#ef4444' } },
          { value: 75, name: 'Aman', itemStyle: { color: '#e5e7eb' } }
        ]
      }
    ]
  };

  // 2. Content - Histogram (Bar)
  const contentOption = {
    grid: { left: '5%', right: '5%', bottom: '5%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['0-15', '16-30', '31-45', '46-60', '61-75', '76-90', '>90'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#6b7280', fontSize: 14, fontWeight: 'bold' },
      name: 'Frekuensi Order (Hari)',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: { color: '#9ca3af', fontSize: 14 }
    },
    yAxis: {
      type: 'value',
      show: false,
      splitLine: { show: false }
    },
    series: [
      {
        type: 'bar',
        data: [
          { value: 120, itemStyle: { color: '#e5e7eb' } }, // 0-15
          { value: 450, itemStyle: { color: '#10b981' } }, // 16-30 (Target)
          { value: 380, itemStyle: { color: '#10b981' } }, // 31-45 (Target)
          { value: 150, itemStyle: { color: '#e5e7eb' } }, // 46-60
          { value: 80, itemStyle: { color: '#e5e7eb' } }, // 61-75
          { value: 40, itemStyle: { color: '#e5e7eb' } }, // 76-90
          { value: 15, itemStyle: { color: '#e5e7eb' } }  // >90
        ],
        label: {
          show: true,
          position: 'top',
          color: '#6b7280',
          fontWeight: 'bold',
          formatter: (params) => {
             if(params.dataIndex === 1 || params.dataIndex === 2) return '{c}';
             return '';
          }
        },
        barWidth: '60%',
        itemStyle: { borderRadius: [4, 4, 0, 0] },
        markLine: {
          data: [
            { xAxis: 2.5, name: 'Batas Normal' } // Between 31-45 and 46-60
          ],
          lineStyle: { color: '#9ca3af', type: 'dashed', width: 2 },
          label: {
            show: true,
            position: 'end',
            formatter: 'Target Maksimum 45 Hari',
            fontSize: 14,
            color: '#6b7280'
          },
          symbol: ['none', 'none']
        }
      }
    ]
  };

  // 3. Tension - Line Chart
  const tensionOption = {
    grid: { left: '5%', right: '15%', bottom: '5%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
      axisLine: { show: true, lineStyle: { color: '#d1d5db', width: 2 } },
      axisTick: { show: false },
      axisLabel: { color: '#6b7280', fontSize: 14, fontWeight: 'bold' }
    },
    yAxis: {
      type: 'value',
      show: false,
      splitLine: { show: false },
      max: 100
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: [
        { lte: 6, color: '#9ca3af' }, // Jan-Jul is grey
        { gt: 6, color: '#ef4444' }   // Aug-Dec is red
      ]
    },
    series: [
      {
        type: 'line',
        data: [28, 30, 29, 32, 31, 35, 40, 55, 68, 75, 82, 85],
        lineStyle: { width: 5 },
        symbolSize: 8,
        label: {
          show: true,
          formatter: (params) => {
            if (params.dataIndex === 11) return '{value} Hari\n(Kritis)';
            return '';
          },
          position: 'top',
          fontSize: 14,
          fontWeight: 'bold',
          color: '#ef4444',
          distance: 10
        },
        markLine: {
          data: [
            { yAxis: 45, name: 'Batas Normal' }
          ],
          lineStyle: { color: '#10b981', type: 'dashed', width: 2 },
          label: {
            show: true,
            position: 'middle',
            formatter: 'Batas Toleransi (45 Hari)',
            fontSize: 14,
            color: '#10b981'
          },
          symbol: ['none', 'none']
        }
      }
    ]
  };

  // 4. Climax - Scatter Plot
  // Generate dummy scatter data
  const scatterData = [];
  // Safe cluster
  for (let i=0; i<100; i++) {
    scatterData.push({
       value: [Math.random() * 45, Math.random() * 20000 + 5000],
       itemStyle: { color: '#e5e7eb' }
    });
  }
  // Low value, high recency (churned but low impact)
  for (let i=0; i<50; i++) {
    scatterData.push({
       value: [Math.random() * 60 + 45, Math.random() * 10000 + 1000],
       itemStyle: { color: '#e5e7eb' }
    });
  }
  // High value, high recency (CRITICAL CHURN ZONE)
  for (let i=0; i<30; i++) {
    scatterData.push({
       value: [Math.random() * 45 + 50, Math.random() * 30000 + 25000],
       itemStyle: { color: '#ef4444' }
    });
  }

  const climaxOption = {
    grid: { left: '8%', right: '10%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: {
      type: 'value',
      name: 'Keterlambatan Order / Recency (Hari)',
      nameLocation: 'middle',
      nameGap: 35,
      nameTextStyle: { color: '#6b7280', fontSize: 14, fontWeight: 'bold' },
      axisLine: { show: true, lineStyle: { color: '#d1d5db' } },
      splitLine: { show: false },
      axisLabel: { color: '#6b7280' }
    },
    yAxis: {
      type: 'value',
      name: 'Nilai Transaksi / Monetary (Rp Ribu)',
      nameLocation: 'middle',
      nameGap: 60,
      nameTextStyle: { color: '#6b7280', fontSize: 14, fontWeight: 'bold' },
      axisLine: { show: true, lineStyle: { color: '#d1d5db' } },
      splitLine: { show: false },
      axisLabel: { color: '#6b7280', formatter: '{value}' }
    },
    series: [
      {
        type: 'scatter',
        symbolSize: 12,
        data: scatterData,
        markArea: {
          itemStyle: { color: 'rgba(239, 68, 68, 0.05)' },
          data: [
            [
              { name: 'Zona Kritis (High Risk)', xAxis: 45, yAxis: 20000, label: { position: 'insideTopLeft', color: '#ef4444', fontSize: 16, fontWeight: 'bold', padding: 10 } },
              { xAxis: 120, yAxis: 60000 }
            ]
          ]
        }
      }
    ]
  };

  // 5. Insight - Bar Chart (Comparison)
  const insightOption = {
    grid: { left: '5%', right: '5%', bottom: '5%', top: '20%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['Pendapatan Aman', 'Pendapatan Berisiko (Churn)'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 16, fontWeight: 'bold', color: '#374151' }
    },
    yAxis: {
      type: 'value',
      show: false,
      splitLine: { show: false },
      max: 10
    },
    series: [
      {
        type: 'bar',
        data: [
          { value: 7.5, itemStyle: { color: '#e5e7eb' } },
          { value: 2.5, itemStyle: { color: '#ef4444' } }
        ],
        label: {
          show: true,
          position: 'top',
          formatter: 'Rp {c} Miliar',
          fontSize: 20,
          fontWeight: 'bold',
          color: '#374151'
        },
        barWidth: '40%',
        itemStyle: { borderRadius: [6, 6, 0, 0] },
        markLine: {
          data: [
            { yAxis: 10, name: 'Target Q4' }
          ],
          lineStyle: { color: '#9ca3af', type: 'dashed', width: 2 },
          label: {
            show: true,
            position: 'middle',
            formatter: 'Target Q4: Rp 10 Miliar',
            fontSize: 16,
            color: '#6b7280'
          },
          symbol: ['none', 'none']
        }
      }
    ]
  };

  return (
    <div className="slide-container bg-white font-sans text-gray-900 scroll-smooth">
      
      {/* SLIDE 1: Hook */}
      <section className="slide bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl w-full mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-800 text-sm font-semibold tracking-wide mb-6 uppercase">
            Peringatan Churn (Hook)
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
            <span className="text-red-500">25%</span> Pelanggan Top Tier Berada di Zona Kritis Churn
          </h1>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Seperempat dari pelanggan berharga kita tidak melakukan transaksi melebihi batas waktu normal.
          </p>
          <div className="chart-wrapper mx-auto">
            <ReactECharts option={hookOption} style={{ height: '100%', width: '100%' }} />
          </div>
          <div className="animate-bounce mt-12 text-gray-400">
             Scroll ke bawah
             <svg className="w-6 h-6 mx-auto mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          </div>
        </div>
      </section>

      {/* SLIDE 2: Content */}
      <section className="slide">
        <div className="max-w-5xl w-full mx-auto">
          <div className="mb-10 text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pola Ideal: Pelanggan Sehat Bertransaksi Setiap <span className="text-emerald-500">30-45 Hari</span>
            </h2>
            <p className="text-lg text-gray-500">
              Histogram distribusi frekuensi order menunjukkan mayoritas pelanggan rutin bertransaksi dalam rentang 30-45 hari.
            </p>
          </div>
          <div className="chart-wrapper mx-auto">
            <ReactECharts option={contentOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </section>

      {/* SLIDE 3: Tension */}
      <section className="slide bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl w-full mx-auto">
          <div className="mb-10 text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Namun, Rata-Rata Keterlambatan Order Melonjak Melewati <span className="text-red-500">Batas Toleransi</span> Sejak Q3
            </h2>
            <p className="text-lg text-gray-500">
              Sejak Agustus, pelanggan menunda order lebih lama, menembus batas wajar 45 hari.
            </p>
          </div>
          <div className="chart-wrapper mx-auto">
            <ReactECharts option={tensionOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </section>

      {/* SLIDE 4: Climax */}
      <section className="slide">
        <div className="max-w-5xl w-full mx-auto">
          <div className="mb-10 text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pelanggan <span className="text-red-500">Bernilai Tinggi</span> Kini Terpusat di Zona Berisiko
            </h2>
            <p className="text-lg text-gray-500">
              Penyebaran pelanggan menunjukkan bahwa banyak dari pelanggan dengan transaksi tinggi (&gt; Rp 20 Juta) kini belum order selama &gt; 45 hari.
            </p>
          </div>
          <div className="chart-wrapper mx-auto">
            <ReactECharts option={climaxOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </section>

      {/* SLIDE 5: Insight */}
      <section className="slide bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl w-full mx-auto">
          <div className="mb-10 text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Risiko Kehilangan Pendapatan <span className="text-red-500">Rp 2.5 Miliar</span> Dari Segmen Ini
            </h2>
            <p className="text-lg text-gray-500">
              Jika kelompok ini churn, kita akan kehilangan 25% target pendapatan Q4 secara langsung.
            </p>
          </div>
          <div className="chart-wrapper mx-auto">
            <ReactECharts option={insightOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </section>

      {/* SLIDE 6: Action */}
      <section className="slide bg-gray-900 text-white">
        <div className="max-w-4xl w-full mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 text-red-400">Rekomendasi Tindakan Segera</h2>
          <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
            Kita harus bertindak sebelum pelanggan bernilai tinggi ini berpindah ke kompetitor.
          </p>
          
          <div className="bg-gray-800 rounded-2xl p-8 mb-12 text-left shadow-xl border border-gray-700">
            <h3 className="text-3xl font-bold text-white mb-6">Program Retensi Khusus (Jalankan dalam 48 Jam)</h3>
            <ul className="space-y-6 text-xl text-gray-300">
              <li className="flex items-start">
                <span className="flex items-center justify-center bg-red-500 text-white rounded-full h-8 w-8 min-w-8 font-bold mr-4">1</span>
                Kirimkan email dan notifikasi promosi "Win-Back" dengan penawaran spesial (Diskon 20% atau Free Shipping) untuk pelanggan di High Risk Zone.
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center bg-red-500 text-white rounded-full h-8 w-8 min-w-8 font-bold mr-4">2</span>
                Tugaskan Account Manager untuk menelepon langsung 30 pelanggan B2B dengan nilai transaksi tertinggi yang terlambat order.
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center bg-red-500 text-white rounded-full h-8 w-8 min-w-8 font-bold mr-4">3</span>
                Lakukan survei singkat untuk mengidentifikasi alasan keterlambatan (apakah karena harga kompetitor atau ketidakpuasan layanan).
              </li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;

