import React, { useState } from 'react';
import { Search, Plus, Edit2, Eye, ChevronLeft, ChevronRight, Users, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataProvider';
import Modal from '../common/Modal';

const ServicesListViewContent = () => {
    const navigate = useNavigate();
    const { data, updateData, t } = useData();
    const services = data.services || [];
    const categories = data.serviceCategories || [];

    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [selectedService, setSelectedService] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    // Form data
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        costPrice: '',
        categoryId: '',
        status: 'Faol'
    });

    // Ranglar konfiguratsiyasi
    const primaryColor = "#00BCE4";

    const getStatusClasses = (status) => {
        return status === "Faol"
            ? "bg-green-50 text-green-600 border border-green-100"
            : "bg-red-50 text-red-600 border border-red-100";
    };

    const getCategoryName = (id) => {
        const cat = categories.find(c => c.id == id);
        return cat ? cat.name : '-';
    };

    const filteredServices = services.filter(service => {
        const matchSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = filterCategory ? service.categoryId == filterCategory : true;
        return matchSearch && matchCategory;
    });

    // Pagination
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handleSave = () => {
        if (!formData.name || !formData.price || !formData.categoryId) {
            alert(t('fill_required'));
            return;
        }
        if (formData.id) {
            updateData('services', formData, 'UPDATE');
        } else {
            updateData('services', formData, 'ADD');
        }
        setIsServiceModalOpen(false);
        setFormData({ name: '', price: '', costPrice: '', categoryId: '', status: 'Faol' });
    };

    const handleEdit = (service) => {
        setFormData(service);
        setIsServiceModalOpen(true);
    };

    const handleView = (service) => {
        setSelectedService(service);
        setIsViewModalOpen(true);
    };

    return (
        <div className="p-4 md:p-8 space-y-6 min-h-screen text-slate-700">

            {/* Header & Breadcrumbs */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
                        <Link to="/" className="hover:text-[#00BCE4] transition-colors capitalize">{t('dashboard')}</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-600 capitalize">{t('services')}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{t('services')}</h1>
                </div>

                <div className="flex flex-col md:flex-row gap-3 w-full sm:w-auto">
                    {/* Search Input */}
                    <div className="relative grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('search')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-2 pl-9 pr-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BCE4]/20 focus:border-[#00BCE4] transition-all bg-white text-sm"
                        />
                    </div>

                    {/* Filter Category */}
                    <div className="relative">
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="appearance-none block w-full bg-white border border-slate-200 text-slate-600 py-2 px-4 pr-10 rounded-xl focus:outline-none focus:border-[#00BCE4] text-sm h-full"
                        >
                            <option value="">Barcha kategoriyalar</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {/* <ChevronDown className="pointer-events-none absolute inset-y-0 top-3 right-3 flex items-center text-slate-400 w-4 h-4" /> */}
                    </div>

                    {/* Add Button */}
                    <button
                        onClick={() => setIsServiceModalOpen(true)}
                        style={{ backgroundColor: primaryColor }}
                        className="flex items-center justify-center gap-2 px-6 py-2 text-white font-semibold rounded-xl hover:opacity-90 shadow-lg shadow-[#00BCE4]/20 transition-all w-full md:w-auto text-sm"
                    >
                        <Plus className="w-5 h-5" />
                        {t('add')}
                    </button>
                </div>
            </div>

            {/* Services Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-100">
                    <thead className='bg-slate-50/50'>
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-16">#</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Xizmat Nomi</th>
                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Kategoriya</th>
                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Narxi</th>
                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Xom-ashyo</th>
                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Holati</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Harakat</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-50 bg-white">
                        {currentItems.length > 0 ? (
                            currentItems.map((service, index) => (
                                <tr key={service.id} className="hover:bg-[#00BCE4]/5 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-700">{service.name}</td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-500 uppercase tracking-tight">
                                            {getCategoryName(service.categoryId)}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-slate-800">{service.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-500">{service.costPrice || '0'}</td>

                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`px-3 py-1 text-[11px] font-bold rounded-full ${getStatusClasses(service.status)}`}>
                                            {service.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex justify-end gap-1">
                                            <button onClick={() => navigate(`/klinika/xizmatlar/${service.id}/assign`)} className="p-2 text-slate-400 hover:text-[#00BCE4] hover:bg-[#00BCE4]/10 rounded-lg transition-all" title="Xodimlarga biriktirish">
                                                <Users className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleEdit(service)} className="p-2 text-slate-400 hover:text-[#00BCE4] hover:bg-[#00BCE4]/10 rounded-lg transition-all" title={t('edit')}>
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleView(service)} className="p-2 text-slate-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-all" title="Ko'rish">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="7" className="p-16 text-center text-slate-400 font-medium">Xizmatlar topilmadi</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className='flex justify-between items-center pt-6'>
                    <p className="text-sm text-slate-400">Jami {filteredServices.length} ta ma'lumot</p>
                    <nav className="flex items-center gap-1">
                        <button
                            className="p-2 text-slate-400 rounded-xl hover:bg-slate-100 transition-all disabled:opacity-20"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                style={number === currentPage ? { backgroundColor: primaryColor, color: 'white' } : {}}
                                className={`w-10 h-10 text-sm font-bold rounded-xl transition-all ${number !== currentPage
                                    ? 'text-slate-600 hover:bg-slate-100'
                                    : 'shadow-lg shadow-[#00BCE4]/30'}`}
                            >
                                {number}
                            </button>
                        ))}

                        <button
                            className="p-2 text-slate-400 rounded-xl hover:bg-slate-100 transition-all disabled:opacity-20"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </nav>
                </div>
            )}

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isServiceModalOpen}
                onClose={() => setIsServiceModalOpen(false)}
                title={formData.id ? t('edit') : t('add')}
                footer={
                    <button
                        onClick={handleSave}
                        style={{ backgroundColor: primaryColor }}
                        className="flex items-center justify-center gap-2 px-6 py-3 text-white font-bold rounded-xl hover:opacity-90 transition-all w-full shadow-lg shadow-[#00BCE4]/20"
                    >
                        {t('save')}
                    </button>
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">{t('name')}*</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full py-2.5 px-4 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00BCE4] transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">{t('price')}*</label>
                            <input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full py-2.5 px-4 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00BCE4] transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Xom-ashyo</label>
                            <input type="text" value={formData.costPrice} onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })} className="w-full py-2.5 px-4 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00BCE4] transition-all" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">{t('category')}*</label>
                        <select value={formData.categoryId} onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })} className="w-full py-2.5 px-4 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00BCE4] transition-all appearance-none bg-white">
                            <option value="">Tanlang</option>
                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default ServicesListViewContent;
