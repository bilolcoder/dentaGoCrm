// src/components/ServiceCategoryContent.jsx
import React, { useState } from 'react';
import { Search, Plus, Edit2, Eye, Trash2, CheckCircle, Hash, Palette, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataProvider';
import Modal from '../common/Modal';

// Status ranglari uchun helper (faqat Light mode)
const getStatusClasses = (status) => {
    const activeVariants = ["Faol", "Active", "Активный"];
    if (activeVariants.includes(status)) {
        return "bg-emerald-50 text-emerald-600 border border-emerald-100";
    }
    return "bg-rose-50 text-rose-600 border border-rose-100";
};

const ServiceCategoryContent = () => {
    const { data, updateData, t } = useData();
    const categories = data.serviceCategories || [];

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [addForm, setAddForm] = useState({ name: '', color: '#00BCE4', status: 'Faol' });
    const [editForm, setEditForm] = useState({ id: null, name: '', color: '', status: '' });

    const handleActionClick = (category, actionType) => {
        setSelectedCategory(category);
        if (actionType === 'edit') {
            setEditForm({ ...category });
            setIsEditModalOpen(true);
        } else if (actionType === 'detail') {
            setIsDetailModalOpen(true);
        }
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`${name}: ${t('confirm_delete')}`)) {
            updateData('serviceCategories', { id }, 'DELETE');
        }
    };

    const handleAddSubmit = () => {
        if (!addForm.name) return alert(t('fill_required'));
        updateData('serviceCategories', addForm, 'ADD');
        setIsAddModalOpen(false);
        setAddForm({ name: '', color: '#00BCE4', status: 'Faol' });
    };

    const handleEditSubmit = () => {
        if (!editForm.name) return alert(t('fill_required'));
        updateData('serviceCategories', editForm, 'UPDATE');
        setIsEditModalOpen(false);
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const availableColors = ["#00BCE4", "#4299E1", "#F687B3", "#F64E60", "#9AE6B4", "#805AD5", "#ECC94B", "#2D3748"];

    return (
        <div className="p-4 md:p-8 space-y-8 min-h-screen">

            {/* Header & Breadcrumbs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                    <nav className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        <Link to="/" className="hover:text-[#00BCE4] transition-colors">{t('dashboard')}</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-900">{t('service_category')}</span>
                    </nav>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                        Xizmat <span className="text-[#00BCE4]">kategoriyalari</span>
                    </h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative group grow sm:min-w-[300px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00BCE4] transition-colors" />
                        <input
                            type="text"
                            placeholder={t('search')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-3.5 pl-11 pr-4 bg-white border border-slate-200 rounded-[1.25rem] text-sm font-bold text-slate-700 focus:outline-none focus:border-[#00BCE4] focus:ring-4 focus:ring-[#00BCE4]/5 transition-all shadow-sm"
                        />
                    </div>

                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#00BCE4] text-white font-black text-[11px] uppercase tracking-widest rounded-[1.25rem] hover:bg-[#00a6c9] shadow-lg shadow-[#00BCE4]/20 active:scale-95 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        {t('add')}
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest w-20">#</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('name')}</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('color')}</th>
                                <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('status')}</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('actions')}</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50">
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category, index) => (
                                    <tr key={category.id} className="group hover:bg-slate-50/80 transition-colors">
                                        <td className="px-8 py-5 whitespace-nowrap text-xs font-bold text-slate-400">
                                            {String(index + 1).padStart(2, '0')}
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
                                                <span className="text-sm font-bold text-slate-700">{category.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-4 rounded-md shadow-inner" style={{ backgroundColor: category.color || '#ccc', opacity: 0.8 }} />
                                                <code className="text-[10px] font-bold text-slate-400 uppercase">{category.color}</code>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-center">
                                            <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-tighter rounded-full ${getStatusClasses(category.status)}`}>
                                                {category.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-right">
                                            <div className="flex justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleActionClick(category, 'edit')} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all" title={t('edit')}>
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleActionClick(category, 'detail')} className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all" title={t('view')}>
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(category.id, category.name)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all" title={t('delete')}>
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="p-4 bg-slate-50 rounded-full">
                                                <Search className="w-8 h-8 text-slate-300" />
                                            </div>
                                            <p className="text-xs font-black uppercase tracking-widest text-slate-400">{t('category')} topilmadi</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Qo'shish & Tahrirlash Modallari (Umumlashgan uslubda) */}
            <Modal
                isOpen={isAddModalOpen || isEditModalOpen}
                onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                title={isAddModalOpen ? t('add') : t('edit')}
                footer={
                    <button
                        onClick={isAddModalOpen ? handleAddSubmit : handleEditSubmit}
                        className="w-full py-4 bg-[#00BCE4] text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-[#00a6c9] shadow-xl shadow-[#00BCE4]/20 active:scale-[0.98] transition-all"
                    >
                        {isAddModalOpen ? t('add') : t('save')}
                    </button>
                }
            >
                <div className="space-y-6 p-2">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            <Hash className="w-3 h-3" /> {t('category')} {t('name')}
                        </label>
                        <input
                            type="text"
                            value={isAddModalOpen ? addForm.name : editForm.name}
                            onChange={(e) => isAddModalOpen ? setAddForm({ ...addForm, name: e.target.value }) : setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full py-3.5 px-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm focus:outline-none focus:border-[#00BCE4] focus:bg-white transition-all"
                            placeholder="Kategoriya nomini kiriting"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            <Palette className="w-3 h-3" /> Brend rangi
                        </label>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                            {availableColors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => isAddModalOpen ? setAddForm({ ...addForm, color }) : setEditForm({ ...editForm, color })}
                                    className={`w-full aspect-square rounded-full border-4 transition-all scale-100 active:scale-90 ${ (isAddModalOpen ? addForm.color : editForm.color) === color ? 'border-white ring-4 ring-[#00BCE4]/30' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            <Activity className="w-3 h-3" /> {t('status')}
                        </label>
                        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl">
                            {['Faol', 'Nofaol'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => isAddModalOpen ? setAddForm({ ...addForm, status }) : setEditForm({ ...editForm, status })}
                                    className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${ (isAddModalOpen ? addForm.status : editForm.status) === status ? 'bg-white text-[#00BCE4] shadow-sm' : 'text-slate-400 hover:text-slate-600' }`}
                                >
                                    {status === 'Faol' ? t('active') : t('inactive')}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Batafsil Modali */}
            <Modal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                title={t('view')}
            >
                {selectedCategory && (
                    <div className="space-y-1 divide-y divide-slate-50">
                        {[
                            { label: 'ID', value: `#${selectedCategory.id}`, type: 'text' },
                            { label: t('name'), value: selectedCategory.name, type: 'text' },
                            { label: t('color'), value: selectedCategory.color, type: 'color' },
                            { label: t('status'), value: selectedCategory.status, type: 'badge' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center py-4 px-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                                {item.type === 'color' ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: item.value }} />
                                        <span className="text-sm font-bold text-slate-700 uppercase">{item.value}</span>
                                    </div>
                                ) : item.type === 'badge' ? (
                                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusClasses(item.value)}`}>
                                        {item.value}
                                    </span>
                                ) : (
                                    <span className="text-sm font-bold text-slate-700">{item.value}</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ServiceCategoryContent;
