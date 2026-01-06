// src/components/AppPaymentsContent.jsx
import React from 'react';
import { useData } from '../context/DataProvider';
import { Search, ChevronDown, ChevronUp, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppPaymentsContent = () => {
    const { t } = useData();
    const navigate = useNavigate();

    return (
        <div className="p-6 min-h-screen">
            {/* Top Section: Breadcrumb & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                {/* Breadcrumb */}
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <span
                            onClick={() => navigate('/')}
                            className="hover:text-[#00BCE4] cursor-pointer transition-colors"
                        >
                            {t('dashboard')}
                        </span>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-900">{t('app_payments')}</span>
                    </div>
                </div>

                {/* Search & Actions */}
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={t('search')}
                            className="pl-10 pr-4 py-2.5 border-2 border-gray-50 rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCE4]/20 focus:border-[#00BCE4] focus:bg-white w-64 transition-all text-gray-700 font-medium"
                        />
                        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    </div>

                    <button className="p-2.5 border-2 border-gray-50 rounded-xl bg-gray-50 hover:bg-white hover:border-[#00BCE4] hover:text-[#00BCE4] transition-all text-gray-500">
                        <ChevronDown className="w-5 h-5" />
                    </button>

                    <button className="p-2.5 bg-[#00BCE4] hover:bg-[#00a8cc] text-white rounded-xl shadow-lg shadow-[#00BCE4]/20 transition-all">
                        <ChevronUp className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Main Content: Table */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50 text-left">
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] w-16">
                                    #
                                </th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">
                                    {t('sum')}
                                </th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] text-center">
                                    {t('type_short')}
                                </th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] text-right">
                                    {t('payment_date')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Empty State */}
                            <tr>
                                <td colSpan="4">
                                    <div className="flex flex-col items-center justify-center py-24 text-center">
                                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
                                            <Database className="w-10 h-10 text-[#00BCE4] opacity-20" />
                                        </div>
                                        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                                            {t('no_data')}
                                        </h3>
                                        <p className="text-gray-300 text-[10px] mt-2 uppercase tracking-tighter">Hozircha hech qanday to'lovlar mavjud emas</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AppPaymentsContent;
