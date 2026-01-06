// src/components/DoctorDailyReportsContent.jsx

import React, { useState } from 'react';
import { Search, Calendar, User, DollarSign, TrendingUp, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataProvider';

const DoctorDailyReportsContent = () => {
    // Xavfsizlik uchun data obyekti ichidagi massivlarni default qiymat bilan olamiz
    const { data, t } = useData();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [searchTerm, setSearchTerm] = useState('');

    // Xavfsiz kirish (Optional Chaining va Nullish Coalescing)
    const staffList = data?.staff || [];
    const treatmentsList = data?.treatments || [];

    // Shifokorlarni saralashda xatolikni oldini olish
    const doctors = staffList.filter(s => s && s.lavozim === 'Shifokor');

    const getReportData = (date) => {
        const formattedSearchDate = new Date(date).toLocaleDateString('uz-UZ');

        const treatmentsToday = treatmentsList.filter(treat =>
            treat && treat.date && treat.date.startsWith(formattedSearchDate)
        );

        return doctors.map(doc => {
            const docTreatments = treatmentsToday.filter(treat => treat.doctor === doc.FIO);
            const income = docTreatments.reduce((sum, treat) => {
                // Pul birligini tozalash va songa aylantirish (NaN xatoligini oldini olish)
                const rawDebt = treat.debt ? String(treat.debt) : "0";
                const debtValue = parseInt(rawDebt.replace(/[^0-9-]/g, '')) || 0;
                return sum + Math.abs(debtValue);
            }, 0);

            return {
                id: doc.id,
                FIO: doc.FIO || "Noma'lum",
                totalIncome: income,
                totalExpense: 0,
                treatmentCount: docTreatments.length
            };
        });
    };

    // Hisobotlarni shakllantirish
    const dailyReport = getReportData(selectedDate);

    const filteredReport = dailyReport.filter(r =>
        r.FIO.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const grandTotalIncome = dailyReport.reduce((sum, r) => sum + r.totalIncome, 0);
    const grandTotalExpense = dailyReport.reduce((sum, r) => sum + r.totalExpense, 0);

    return (
        <div className="p-4 md:p-8 space-y-6 min-h-screen">
            {/* Header & Breadcrumbs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <Link to="/" className="hover:text-[#00BCE4] transition-colors uppercase tracking-wider">{t('dashboard')}</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-[#00BCE4] uppercase tracking-wider">{t('doc_daily_reports')}</span>
                    </div>
                </div>

                <div className='flex flex-wrap gap-3 w-full md:w-auto'>
                    <div className="relative grow md:grow-0">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full py-2.5 px-4 pr-10 border border-[#00BCE4]/20 rounded-xl bg-white text-slate-700 font-bold focus:border-[#00BCE4] focus:ring-4 focus:ring-[#00BCE4]/10 outline-none transition-all"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00BCE4] pointer-events-none" />
                    </div>

                    <div className="relative grow md:grow-0 min-w-[240px]">
                        <input
                            type="text"
                            placeholder="Doktorni qidirish..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-2.5 px-4 pl-10 border border-[#00BCE4]/20 rounded-xl bg-white text-slate-700 focus:border-[#00BCE4] focus:ring-4 focus:ring-[#00BCE4]/10 outline-none transition-all"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00BCE4]/50" />
                    </div>
                </div>
            </div>

            {/* Statistik kartochkalar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-[#00BCE4] rounded-2xl shadow-lg shadow-[#00BCE4]/20 text-white relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-sm font-bold opacity-80 uppercase tracking-widest mb-1">Jami Daromad</p>
                        <h3 className="text-3xl font-black">{grandTotalIncome.toLocaleString('uz-UZ')} <span className="text-lg font-medium">so'm</span></h3>
                    </div>
                    <TrendingUp className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-white/10 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-slate-800 relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Jami Xarajat</p>
                        <h3 className="text-3xl font-black">{grandTotalExpense.toLocaleString('uz-UZ')} <span className="text-lg font-medium text-slate-400">so'm</span></h3>
                    </div>
                    <CreditCard className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-slate-200 group-hover:scale-110 transition-transform" />
                </div>
            </div>

            {/* Jadval qismi */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#00BCE4]/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[#00BCE4]/10">
                        <thead className='bg-[#00BCE4]/5 whitespace-nowrap'>
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest w-16">#</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">Doktor F.I.O</th>
                                <th className="px-6 py-4 text-center text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">Soni</th>
                                <th className="px-6 py-4 text-right text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">Daromad</th>
                                <th className="px-6 py-4 text-right text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">Xarajat</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 whitespace-nowrap">
                            {filteredReport.length > 0 ? (
                                filteredReport.map((r, index) => (
                                    <tr key={r.id || index} className='hover:bg-[#00BCE4]/5 transition-colors group'>
                                        <td className="px-6 py-4 text-sm text-slate-400 font-medium">{index + 1}</td>
                                        <td className="px-6 py-4 text-sm text-slate-800 font-bold">{r.FIO}</td>
                                        <td className="px-6 py-4 text-sm text-center">
                                            <span className="bg-[#00BCE4]/10 text-[#00BCE4] px-3 py-1 rounded-lg font-bold">
                                                {r.treatmentCount}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-black text-[#00BCE4]">
                                            {r.totalIncome.toLocaleString('uz-UZ')} so'm
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-bold text-slate-300">
                                            {r.totalExpense.toLocaleString('uz-UZ')} so'm
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className='p-16 text-center'>
                                        <div className="flex flex-col items-center gap-2">
                                            <Search className="w-8 h-8 text-slate-200" />
                                            <p className="text-slate-400 font-medium">Ma'lumot topilmadi</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DoctorDailyReportsContent;
