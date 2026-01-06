// src/components/LeadCategoriesContent.jsx

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataProvider';
import AddEditLeadCategoryModal from './AddEditLeadCategoryModal';

const LeadCategoriesContent = () => {
    const { data, t } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Lead kategoriyalari ma'lumotlari
    const categories = data.leadCategories || [
        { id: 1, name: "Yangi kelgan", status: true },
        { id: 2, name: "Tizimdan o'tgan", status: false },
    ];

    const handleOpenAddEditModal = (category = null) => {
        setCurrentCategory(category);
        setIsModalOpen(true);
    };

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8 min-h-screen">
            {/* Sarlavha va Breadcrumbs */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        <Link to="/" className="hover:text-[#00BCE4] transition-colors">{t('dashboard')}</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-900">{t('lead_categories')}</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                        {t('lead_categories')}
                    </h2>
                </div>

                <button
                    onClick={() => handleOpenAddEditModal(null)}
                    className="flex items-center bg-[#00BCE4] text-white px-6 py-3 rounded-2xl hover:bg-[#009bbd] transition-all shadow-lg shadow-[#00BCE4]/20 font-bold text-sm uppercase tracking-wide"
                >
                    <Plus className="w-5 h-5 mr-2 stroke-[3]" />
                    {t('add')}
                </button>
            </div>

            <div className="bg-white shadow-sm rounded-[2rem] border border-slate-100 overflow-hidden">
                {/* Qidiruv qismi */}
                <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96 font-medium">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('search') || "Kategoriyani qidirish..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-slate-100 bg-slate-50/50 rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-900 focus:ring-2 focus:ring-[#00BCE4]/20 focus:border-[#00BCE4] outline-none transition-all placeholder:text-slate-400"
                        />
                    </div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                        Jami: {filteredCategories.length} ta kategoriya
                    </div>
                </div>

                {/* Jadval */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">#</th>
                                <th className="px-6 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">{t('name')}</th>
                                <th className="px-6 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">{t('status')}</th>
                                <th className="px-6 py-4 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredCategories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-slate-400">
                                        #{cat.id}
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className="text-sm font-bold text-slate-700 group-hover:text-[#00BCE4] transition-colors">
                                            {cat.name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className={`px-4 py-1.5 inline-flex text-[10px] font-black uppercase tracking-widest rounded-xl ${
                                            cat.status
                                            ? 'bg-emerald-50 text-emerald-600'
                                            : 'bg-rose-50 text-rose-600'
                                        }`}>
                                            {cat.status ? t('active') : t('inactive')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenAddEditModal(cat)}
                                                className="p-2 text-slate-400 hover:text-[#00BCE4] hover:bg-[#00BCE4]/5 rounded-xl transition-all"
                                                title={t('edit')}
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                                title={t('delete')}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredCategories.length === 0 && (
                    <div className="p-20 text-center text-slate-400 font-bold text-sm uppercase tracking-widest">
                        Ma'lumot topilmadi
                    </div>
                )}
            </div>

            {/* Kategoriya qo'shish/tahrirlash modali */}
            {isModalOpen && (
                <AddEditLeadCategoryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    category={currentCategory}
                />
            )}
        </div>
    );
};

export default LeadCategoriesContent;
