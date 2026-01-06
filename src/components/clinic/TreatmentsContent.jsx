// src/components/TreatmentsContent.jsx
import React, { useState } from 'react';
import { Plus, Search, Calendar, Edit, Trash2, Home, Activity, User, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataProvider';
import Modal from '../common/Modal';

const TreatmentsContent = () => {
    const { data, addTreatment, updateData, t } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingTreatment, setEditingTreatment] = useState(null);

    const primaryColor = "#00BCE4";

    const [formData, setFormData] = useState({
        patientId: '',
        doctor: '',
        debt: "0 so'm"
    });

    // XAVFSIZLIK: data yoki data.staff mavjudligini tekshiramiz
    const staffList = data?.staff || [];
    const patientsList = data?.patients || [];
    const treatmentsList = data?.treatments || [];

    const doctors = staffList.filter(s =>
        s.position === 'Shifokor' ||
        s.position === 'Doktor' ||
        s.lavozim === 'Shifokor'
    );

    const handleOpenModal = (treatment = null) => {
        if (treatment) {
            setEditingTreatment(treatment);
            setFormData({
                patientId: treatment.patientId,
                doctor: treatment.doctor,
                debt: treatment.debt
            });
        } else {
            setEditingTreatment(null);
            setFormData({ patientId: '', doctor: '', debt: "0 so'm" });
        }
        setIsModalOpen(true);
    };

    const handleDelete = (id, patientName) => {
        if (window.confirm(`${patientName}: ${t('confirm_delete')}`)) {
            updateData('treatments', { id }, 'DELETE');
        }
    };

    const handleSave = () => {
        if (!formData.patientId || !formData.doctor) {
            alert(t('fill_required'));
            return;
        }

        if (editingTreatment) {
            const updatedTreatment = {
                id: editingTreatment.id,
                patientId: parseInt(formData.patientId),
                doctor: formData.doctor,
                debt: formData.debt,
            };
            const patient = patientsList.find(p => p.id == formData.patientId);
            if (patient) {
                updatedTreatment.patientName = `${patient.name} ${patient.familya}`;
                updatedTreatment.phone = patient.phone;
            }
            updateData('treatments', updatedTreatment, 'UPDATE');
        } else {
            addTreatment(parseInt(formData.patientId), { doctor: formData.doctor, debt: formData.debt });
        }
        setIsModalOpen(false);
    };

    // XAVFSIZLIK: treatmentsList bo'sh bo'lsa filter ishlamasligi uchun
    const filteredTreatments = treatmentsList.filter(t =>
        (t.patientName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (t.doctor?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8 space-y-6 min-h-screen">
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
                        <Link to="/" className="hover:text-[#00BCE4] transition-colors flex items-center gap-1">
                            <Home className="w-3 h-3" />
                            {t('dashboard')}
                        </Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-600 capitalize">{t('treatments')}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                        <Activity className="w-6 h-6 text-[#00BCE4]" />
                        {t('treatments')}
                    </h1>
                </div>

                <div className='flex flex-wrap items-center gap-3 w-full md:w-auto'>
                    <div className="relative grow md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('search')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-2.5 pl-10 pr-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BCE4]/20 focus:border-[#00BCE4] transition-all text-sm bg-slate-50/50"
                        />
                    </div>

                    <button
                        onClick={() => handleOpenModal(null)}
                        style={{ backgroundColor: primaryColor }}
                        className='flex items-center gap-2 py-2.5 px-5 text-white rounded-xl font-bold shadow-lg shadow-[#00BCE4]/20 hover:opacity-90 transition-all whitespace-nowrap'
                    >
                        <Plus className='w-5 h-5' /> {t('add')}
                    </button>
                </div>
            </div>

            {/* Main Table Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className='bg-slate-50/50'>
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-12">#</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">{t('patients')}</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">{t('doctor')}</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider text-center">{t('debt')}</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider text-center">{t('payment_status')}</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider text-center">{t('status')}</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider text-center">{t('date')}</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider w-24">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 whitespace-nowrap">
                            {filteredTreatments.length > 0 ? (
                                filteredTreatments.map((treatment, index) => (
                                    <tr key={treatment.id} className='hover:bg-[#00BCE4]/5 transition-colors group'>
                                        <td className="px-6 py-4 text-sm text-slate-400 font-medium">{index + 1}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                                    <User className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <span className="text-sm font-bold text-slate-700">{treatment.patientName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-[#00BCE4]">{treatment.doctor}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-sm font-bold ${treatment.debt?.startsWith('-') ? 'text-rose-500' : 'text-slate-700'}`}>
                                                {treatment.debt}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center text-sm text-slate-500 font-medium">
                                            {treatment.paymentStatus}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight ${treatment.status === 'Yangi' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-[#00BCE4]/10 text-[#00BCE4] border border-[#00BCE4]/20'}`}>
                                                {treatment.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center text-sm text-slate-500 font-medium">{treatment.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    onClick={() => handleOpenModal(treatment)}
                                                    className='p-2 rounded-xl text-slate-400 hover:text-[#00BCE4] hover:bg-[#00BCE4]/10 transition-all'
                                                >
                                                    <Edit className='w-4 h-4' />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(treatment.id, treatment.patientName)}
                                                    className='p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all'
                                                >
                                                    <Trash2 className='w-4 h-4' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className='p-16 text-center text-slate-400 font-medium'>
                                        {t('no_data')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Styled Modal Integration */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingTreatment ? t('edit') : t('add')}
                footer={
                    <button
                        onClick={handleSave}
                        style={{ backgroundColor: primaryColor }}
                        className="w-full py-3 text-white font-bold rounded-xl shadow-lg shadow-[#00BCE4]/20 hover:opacity-90 transition-all"
                    >
                        {editingTreatment ? t('save') : `+ ${t('add')}`}
                    </button>
                }
            >
                <div className="space-y-5 p-1">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center gap-1">
                            <User className="w-3 h-3" /> {t('patients')}
                        </label>
                        <select
                            value={formData.patientId}
                            onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                            className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCE4]/20 focus:border-[#00BCE4] transition-all"
                            disabled={!!editingTreatment}
                        >
                            <option value="">{t('select_patient')}</option>
                            {patientsList.map(p => (
                                <option key={p.id} value={p.id}>{p.name} {p.familya} ({p.phone})</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center gap-1">
                             Doktor
                        </label>
                        <select
                            value={formData.doctor}
                            onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                            className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCE4]/20 focus:border-[#00BCE4] transition-all"
                        >
                            <option value="">{t('select_doctor')}</option>
                            {doctors.map(d => (
                                <option key={d.id} value={d.fio}>{d.fio}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center gap-1">
                            <DollarSign className="w-3 h-3" /> {t('debt')}
                        </label>
                        <input
                            name="debt"
                            value={formData.debt}
                            onChange={(e) => setFormData({ ...formData, debt: e.target.value })}
                            placeholder="0 so'm"
                            className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BCE4]/20 focus:border-[#00BCE4] transition-all font-semibold"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};
export default TreatmentsContent;
