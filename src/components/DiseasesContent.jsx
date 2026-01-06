// src/components/DiseasesContent.jsx (Kasalliklar)

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataProvider';
import AddEditDiseaseModal from './AddEditDiseaseModal';

const DiseasesContent = () => {
    const { data, t } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDisease, setCurrentDisease] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const diseases = data.diseases || [
        { id: 1, name: "Karies", color: "#00BCE4", status: true },
        { id: 2, name: "Pulpit", color: "#00BCE4", status: true },
        { id: 3, name: "Periodontit", color: "#00BCE4", status: false },
    ];

    const handleOpenAddEditModal = (disease = null) => {
        setCurrentDisease(disease);
        setIsModalOpen(true);
    };

    const filteredDiseases = diseases.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8 min-h-screen">
            {/* Header qismi */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <Link to="/" className="hover:text-[#00BCE4] transition-colors uppercase tracking-wider">{t('dashboard')}</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-[#00BCE4] uppercase tracking-wider">{t('diseases')}</span>
                    </div>
                </div>
                <button
                    onClick={() => handleOpenAddEditModal(null)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00BCE4] hover:bg-[#00a7cc] text-white font-bold rounded-xl shadow-lg shadow-[#00BCE4]/20 transition-all active:scale-95 w-full sm:w-auto"
                >
                    <Plus className="w-5 h-5" />
                    {t('add')}
                </button>
            </div>

            {/* Asosiy jadval konteyneri */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#00BCE4]/10 overflow-hidden relative">
                {/* Qidiruv qismi */}
                <div className="p-4 border-b border-[#00BCE4]/10 flex justify-between items-center bg-white">
                    <div className="relative grow max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00BCE4]/50" />
                        <input
                            type="text"
                            placeholder={t('search')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-[#00BCE4]/20 rounded-xl py-2.5 pl-10 pr-4 text-sm bg-white text-slate-900 focus:ring-4 focus:ring-[#00BCE4]/10 focus:border-[#00BCE4] outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[#00BCE4]/10">
                        <thead className="bg-[#00BCE4]/5">
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest w-16">#</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">{t('name')}</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">{t('color')}</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">{t('status')}</th>
                                <th className="px-6 py-4 text-right text-[10px] font-black text-[#00BCE4] uppercase tracking-widest w-24">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredDiseases.map((dis) => (
                                <tr key={dis.id} className="hover:bg-[#00BCE4]/5 transition-colors group border-b border-slate-50 last:border-0">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-400">{dis.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">{dis.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="w-5 h-5 rounded-lg shadow-sm border border-[#00BCE4]/20" style={{ backgroundColor: dis.color }}></span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{dis.color}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-4 py-1.5 text-[10px] uppercase tracking-widest font-black rounded-lg ${dis.status ? 'bg-[#00BCE4]/10 text-[#00BCE4]' : 'bg-slate-100 text-slate-400'}`}>
                                            {dis.status ? t('active') : t('inactive')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenAddEditModal(dis)}
                                                className="p-2 text-[#00BCE4] hover:text-white hover:bg-[#00BCE4] bg-[#00BCE4]/10 rounded-xl transition-all active:scale-90"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="p-2 text-slate-400 hover:text-white hover:bg-slate-500 bg-slate-100 rounded-xl transition-all active:scale-90"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <AddEditDiseaseModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    disease={currentDisease}
                />
            )}
        </div>
    );
};

export default DiseasesContent;
