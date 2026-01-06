// src/components/storage/ServicesContent.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Edit2, Trash2, LayoutGrid, List, Check, Search, Scissors, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataProvider';
import Modal from '../common/Modal';
import { Link } from 'react-router-dom';

const ServicesContent = () => {
    const { data, updateData, t } = useData();
    const services = data.services || [];
    const categories = data.serviceCategories || [];

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');

    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const [categoryForm, setCategoryForm] = useState({ name: '', color: '#00BCE4' });
    const [serviceForm, setServiceForm] = useState({
        name: '',
        price: '',
        costPrice: '',
        categoryId: '',
        status: 'Faol'
    });

    useEffect(() => {
        if (!selectedCategoryId && categories.length > 0) {
            setSelectedCategoryId(categories[0].id);
        }
    }, [categories, selectedCategoryId]);

    const filteredServices = useMemo(() => {
        let filtered = services;
        if (viewMode === 'list' && selectedCategoryId) {
            filtered = filtered.filter(s => s.categoryId === selectedCategoryId);
        }
        if (searchTerm) {
            filtered = filtered.filter(s =>
                s.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return filtered;
    }, [services, selectedCategoryId, searchTerm, viewMode]);

    const handleSaveCategory = () => {
        if (!categoryForm.name) return;
        const payload = {
            ...categoryForm,
            id: editingItem ? editingItem.id : Date.now(),
            status: 'Faol'
        };
        updateData('serviceCategories', payload, editingItem ? 'UPDATE' : 'ADD');
        closeModals();
    };

    const handleSaveService = () => {
        if (!serviceForm.name || !serviceForm.price || !serviceForm.categoryId) return;
        const payload = {
            ...serviceForm,
            id: editingItem ? editingItem.id : Date.now(),
            price: String(serviceForm.price).replace(/\D/g, '') + " so'm",
            costPrice: serviceForm.costPrice ? String(serviceForm.costPrice).replace(/\D/g, '') + " so'm" : ""
        };
        updateData('services', payload, editingItem ? 'UPDATE' : 'ADD');
        closeModals();
    };

    const openEditService = (service) => {
        setEditingItem(service);
        setServiceForm({
            ...service,
            price: service.price.replace(/\D/g, ''),
            costPrice: service.costPrice ? service.costPrice.replace(/\D/g, '') : ''
        });
        setIsServiceModalOpen(true);
    };

    const closeModals = () => {
        setIsCategoryModalOpen(false);
        setIsServiceModalOpen(false);
        setEditingItem(null);
        setCategoryForm({ name: '', color: '#00BCE4' });
        setServiceForm({ name: '', price: '', costPrice: '', categoryId: selectedCategoryId || '', status: 'Faol' });
    };

    const handleDelete = (type, item) => {
        if (window.confirm(t('confirm_delete') || "O'chirishni tasdiqlaysizmi?")) {
            updateData(type, item, 'DELETE');
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)] overflow-hidden">
            {/* --- HEADER --- */}
            <div className="bg-white border-b border-gray-100 p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm z-20">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div>
                         <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                            <Link to="/" className="hover:text-[#00BCE4] transition-colors">{t('dashboard')}</Link>
                            <span className="text-slate-300">/</span>
                            <span className="text-slate-900">{t('services')}</span>
                        </div>
                        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Scissors className="w-5 h-5 text-[#00BCE4]" />
                            {t('services')}
                        </h1>
                    </div>
                    <div className="relative flex-1 md:w-64 ml-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('search')}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCE4]/20 focus:border-[#00BCE4] transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="flex bg-gray-100 p-1 rounded-xl mr-2">
                        <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#00BCE4]' : 'text-slate-400 hover:text-slate-600'}`}><LayoutGrid size={18}/></button>
                        <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-[#00BCE4]' : 'text-slate-400 hover:text-slate-600'}`}><List size={18}/></button>
                    </div>
                    <button onClick={() => setIsCategoryModalOpen(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-gray-50 transition-all">
                        <Plus size={18} className="text-[#00BCE4]"/> <span>{t('category')}</span>
                    </button>
                    <button onClick={() => setIsServiceModalOpen(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00BCE4] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#00BCE4]/20 hover:opacity-90 transition-all">
                        <Plus size={18}/> <span>{t('add_service')}</span>
                    </button>
                </div>
            </div>

            {/* --- ASOSIY QISM --- */}
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                {/* Kategoriya yon paneli (Faqat List rejimida) */}
                {viewMode === 'list' && (
                    <div className="w-full lg:w-72 bg-white border-r border-gray-100 overflow-y-auto p-4 flex lg:flex-col gap-2 no-scrollbar">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">{t('categories')}</p>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategoryId(cat.id)}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all shrink-0 ${selectedCategoryId === cat.id ? 'bg-[#00BCE4] text-white shadow-lg shadow-[#00BCE4]/20' : 'hover:bg-gray-50 text-slate-600'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></div>
                                    <span className="truncate">{cat.name}</span>
                                </div>
                                {selectedCategoryId === cat.id && <CheckCircle2 size={14}/>}
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/50">
                    {viewMode === 'list' ? (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                             <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">{t('name')}</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">{t('price')}</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">{t('actions')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredServices.map(service => (
                                        <tr key={service.id} className="hover:bg-gray-50/50 group transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-700">{service.name}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-[#00BCE4]">{service.price}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <button onClick={() => openEditService(service)} className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all"><Edit2 size={16}/></button>
                                                    <button onClick={() => handleDelete('services', service)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={16}/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                             </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {categories.map(category => (
                                <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                                    <div className="p-4 flex justify-between items-center border-b border-gray-50" style={{ borderLeft: `4px solid ${category.color}` }}>
                                        <h3 className="font-bold text-slate-800 uppercase text-xs tracking-wider">{category.name}</h3>
                                        <div className="flex gap-1">
                                            <button onClick={() => { setEditingItem(category); setCategoryForm(category); setIsCategoryModalOpen(true); }} className="p-1.5 hover:bg-gray-100 rounded-lg text-slate-400 transition-colors"><Edit2 size={14}/></button>
                                            <button onClick={() => handleDelete('serviceCategories', category)} className="p-1.5 hover:bg-rose-50 text-rose-400 rounded-lg transition-colors"><Trash2 size={14}/></button>
                                        </div>
                                    </div>
                                    <div className="flex-1 p-2 space-y-1">
                                        {services.filter(s => s.categoryId === category.id).map(service => (
                                            <div key={service.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                                                <div>
                                                    <p className="text-sm font-bold text-slate-700">{service.name}</p>
                                                    <p className="text-xs font-black text-[#00BCE4]">{service.price}</p>
                                                </div>
                                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => openEditService(service)} className="p-2 text-slate-400 hover:text-amber-500 transition-colors"><Edit2 size={14}/></button>
                                                    <button onClick={() => handleDelete('services', service)} className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* --- MODALS --- */}
            <Modal isOpen={isCategoryModalOpen} onClose={closeModals} title={editingItem ? t('edit_category') : t('add_category')}>
                <div className="space-y-4 p-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">{t('name')}</label>
                    <input
                        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#00BCE4]/20 focus:border-[#00BCE4] transition-all"
                        placeholder="..."
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                    />
                    <label className="text-xs font-bold text-slate-500 uppercase block mt-2">{t('color')}</label>
                    <div className="flex flex-wrap gap-3 p-1">
                        {['#00BCE4', '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'].map(c => (
                            <div
                                key={c}
                                onClick={() => setCategoryForm({...categoryForm, color: c})}
                                className={`w-10 h-10 rounded-full cursor-pointer border-4 transition-all ${categoryForm.color === c ? 'border-white ring-2 ring-[#00BCE4] scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                style={{backgroundColor: c}}
                            />
                        ))}
                    </div>
                    <button onClick={handleSaveCategory} className="w-full py-4 bg-[#00BCE4] text-white rounded-xl font-bold shadow-lg shadow-[#00BCE4]/20 mt-4 hover:opacity-90 transition-all uppercase tracking-widest text-sm">
                        {editingItem ? t('save') : t('add')}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ServicesContent;
