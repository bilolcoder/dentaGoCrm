// src/components/ServiceAssignmentContent.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataProvider';
import { ArrowLeft, Plus, Trash2, Database, X, ChevronDown, UserPlus, Info, Wallet } from 'lucide-react';

const ServiceAssignmentContent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, t } = useData();
    const services = data.services || [];
    const serviceCategories = data.serviceCategories || [];
    const staff = data.staff || [];
    const serviceAssignments = data.serviceAssignments || [];

    const [service, setService] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        staffId: '',
        value: '',
        type: 'sum' // 'sum' or 'percent'
    });

    useEffect(() => {
        if (services.length > 0 && id) {
            const foundService = services.find(s => s.id === parseInt(id));
            if (foundService) {
                setService(foundService);
                const cat = serviceCategories.find(c => c.id === foundService.categoryId);
                setCategoryName(cat ? cat.name : 'Noma\'lum');
            }
        }
    }, [services, serviceCategories, id]);

    useEffect(() => {
        if (serviceAssignments) {
            const currentAssignments = serviceAssignments.filter(a => a.serviceId === parseInt(id));
            setAssignments(currentAssignments);
        }
    }, [serviceAssignments, id]);

    const handleSave = () => {
        if (!formData.staffId || !formData.value) return;

        const newAssignment = {
            id: Date.now(),
            serviceId: parseInt(id),
            staffId: parseInt(formData.staffId),
            value: formData.value,
            type: formData.type
        };

        setAssignments([...assignments, newAssignment]);
        setIsModalOpen(false);
        setFormData({ staffId: '', value: '', type: 'sum' });
    };

    const handleDelete = (assignmentId) => {
        setAssignments(assignments.filter(a => a.id !== assignmentId));
    };

    const getStaffName = (staffId) => {
        const person = staff.find(s => s.id === parseInt(staffId));
        return person ? person.name : 'Noma\'lum xodim';
    };

    if (!service) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00BCE4]"></div>
        </div>
    );

    return (
        <div className="p-4 md:p-8 space-y-8 min-h-screen">

            {/* Header & Breadcrumbs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                    <nav className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <Link to="/" className="hover:text-[#00BCE4] transition-colors">{t('dashboard')}</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-900">{t('service_assignment')}</span>
                    </nav>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Xizmatga xodim <span className="text-[#00BCE4]">biriktirish</span></h2>
                </div>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-xs hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Orqaga qaytish
                </button>
            </div>

            {/* Service Details Card */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-50 flex items-center gap-3 bg-slate-50/50">
                    <div className="p-2 bg-[#00BCE4]/10 rounded-lg">
                        <Info className="w-4 h-4 text-[#00BCE4]" />
                    </div>
                    <h3 className="font-black text-[11px] uppercase tracking-widest text-slate-700">Asosiy xizmat ma'lumotlari</h3>
                </div>
                <div className="overflow-x-auto text-left">
                    <table className="min-w-full">
                        <thead className="bg-slate-50/30">
                            <tr>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Xizmat nomi</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Kategoriya</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Narxi</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Holati</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            <tr>
                                <td className="px-8 py-6 text-sm font-bold text-slate-800">{service.name}</td>
                                <td className="px-8 py-6 text-center">
                                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter text-[#00BCE4] bg-[#00BCE4]/5 border border-[#00BCE4]/10">
                                        {categoryName}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-center font-black text-slate-700 text-sm">
                                    {Number(service.price).toLocaleString()} <span className="text-[10px] text-slate-400">so'm</span>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <span className="px-4 py-1.5 text-[10px] font-black uppercase tracking-tighter rounded-full bg-emerald-50 text-emerald-600">
                                        {service.status}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Assignments Section */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 min-h-[450px] flex flex-col">
                <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <Wallet className="w-4 h-4 text-indigo-500" />
                        </div>
                        <h3 className="font-black text-[11px] uppercase tracking-widest text-slate-700">Xodimlarning ulushi</h3>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#00BCE4] text-white rounded-2xl hover:bg-[#00a6c9] transition-all font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#00BCE4]/20 active:scale-95"
                    >
                        <UserPlus className="w-4 h-4" />
                        Xodim qo'shish
                    </button>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-slate-50/30">
                            <tr>
                                <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest w-16">#</th>
                                <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Xodim F.I.O</th>
                                <th className="px-8 py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Turi</th>
                                <th className="px-8 py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Miqdor</th>
                                <th className="px-8 py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest w-32 text-right">Amallar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {assignments.map((assignment, index) => (
                                <tr key={assignment.id} className="group hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-5 text-xs font-bold text-slate-400">{index + 1}</td>
                                    <td className="px-8 py-5 text-sm font-bold text-slate-700">{getStaffName(assignment.staffId)}</td>
                                    <td className="px-8 py-5 text-center">
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${assignment.type === 'percent' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                                            {assignment.type === 'percent' ? 'Foiz' : 'So\'m'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-center font-black text-slate-700">
                                        {assignment.value} {assignment.type === 'percent' ? '%' : ''}
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button
                                            onClick={() => handleDelete(assignment.id)}
                                            className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            title="O'chirish"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {assignments.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-24 text-slate-300">
                            <div className="bg-slate-50 p-6 rounded-[2rem] mb-4 border border-slate-100">
                                <Database className="w-12 h-12" />
                            </div>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Hozircha ma'lumot mavjud emas</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 transition-all animate-in fade-in duration-300">
                    <div className="bg-white rounded-[3rem] w-full max-w-md shadow-2xl border border-white overflow-hidden transform animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-8 border-b border-slate-50">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Yangi xodim <span className="text-[#00BCE4]">biriktirish</span></h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Xodimni tanlang</label>
                                <div className="relative">
                                    <select
                                        value={formData.staffId}
                                        onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                                        className="appearance-none w-full bg-slate-50 border border-slate-100 text-slate-700 py-4 px-5 rounded-2xl font-bold text-sm focus:outline-none focus:border-[#00BCE4] focus:bg-white focus:ring-4 focus:ring-[#00BCE4]/5 transition-all cursor-pointer"
                                    >
                                        <option value="">Tanlang...</option>
                                        {staff.map(person => (
                                            <option key={person.id} value={person.id}>{person.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Ulush miqdori</label>
                                <input
                                    type="number"
                                    value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                    placeholder="Masalan: 5000 yoki 15"
                                    className="w-full bg-slate-50 border border-slate-100 text-slate-700 py-4 px-5 rounded-2xl font-bold text-sm focus:outline-none focus:border-[#00BCE4] focus:bg-white focus:ring-4 focus:ring-[#00BCE4]/5 transition-all"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">To'lov turi</label>
                                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1.5 rounded-[1.5rem]">
                                    <button
                                        onClick={() => setFormData({ ...formData, type: 'sum' })}
                                        className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.type === 'sum' ? 'bg-white text-[#00BCE4] shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        So'm
                                    </button>
                                    <button
                                        onClick={() => setFormData({ ...formData, type: 'percent' })}
                                        className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.type === 'percent' ? 'bg-white text-[#00BCE4] shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        Foiz
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 bg-slate-50/50 border-t border-slate-50">
                            <button
                                onClick={handleSave}
                                className="w-full py-4 bg-[#00BCE4] text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-[#00a6c9] shadow-xl shadow-[#00BCE4]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                            >
                                <Plus className="w-4 h-4" />
                                Tasdiqlash va saqlash
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceAssignmentContent;
