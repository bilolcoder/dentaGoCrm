import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { DataProvider, useData } from './context/DataProvider';

// Layout
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Pages
import DashboardContent from './components/DashboardContent';
import PaymentsContent from './components/PaymentsContent';
import LeadStatisticsContent from './components/LeadStatisticsContent';
import DailyExpensesContent from './components/DailyExpensesContent';
import DailyExpenseCategoriesContent from './components/DailyExpenseCategoriesContent';
import SmsTemplatesContent from './components/SmsTemplatesContent';
import SmsSettingsContent from './components/SmsSettingsContent';
import GeneralSettingsContent from './components/GeneralSettingsContent';
import ManualContent from './components/ManualContent';
import DocumentsContent from './components/storage/DocumentsContent';
import ProductsContent from './components/storage/ProductsContent';
import CategoriesContent from './components/storage/CategoriesContent';
import BrandsContent from './components/storage/BrandsContent';
import UnitsContent from './components/storage/UnitsContent';
import SuppliersContent from './components/storage/SuppliersContent';
import ProductUsageContent from './components/storage/ProductUsageContent';
import OrderList from './components/pages/BTS/OrderList';
import Yetkazibberish from './components/pages/BTS/yetkazibBeruvchi';
import Results from './components/Results';
import ProfileContent from './components/ProfileContent';
import AppPaymentsContent from './components/AppPaymentsContent';
import TariffsContent from './components/TariffsContent';
import Cards from './components/pages/BTS/cards';
import CalendarContent from './components/CalendarContent';
import MahsulotQoshish from './components/pages/BTS/MahsulotQAdd';
import DoctorDailyReportsContent from './components/DoctorDailyReportsContent';
import GiveMoneyToDoctorsContent from './components/GiveMoneyToDoctorsContent';
import LeadCategoriesContent from './components/LeadCategoriesContent';
import DiseasesContent from './components/DiseasesContent';
import AdvertisingContent from './components/AdvertisingContent';
import AnnouncementsContent from './components/AnnouncementsContent';
import CoursesContent from './components/CoursesContent';
// Klinika
import StaffContent from './components/clinic/StaffContent';
import ServicesContent from './components/clinic/ServicesContent';
import ServiceCategoryContent from './components/clinic/ServiceCategoryContent';
import ServicesListViewContent from './components/clinic/ServicesListViewContent';
import ServiceAssignmentContent from './components/clinic/ServiceAssignmentContent';
import TreatmentsContent from './components/clinic/TreatmentsContent';
import TreatmentSchedulingContent from './components/clinic/TreatmentSchedulingContent';
import PatientsContent from './components/clinic/PatientsContent';
import ClinicInfoContent from './components/clinic/ClinicInfoContent';
import PatientDetailView from './components/clinic/PatientDetailView';
import DebtTreatmentsContent from './components/clinic/DebtTreatmentsContent';
// Auth
import Login from './components/Login';
import Registration from './components/registration';

// 🔵 Telegram tugmasi
const TelegramButton = () => (
  <a
    href="https://t.me/dentalsoft_uz"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-[9999] w-14 h-14 flex items-center justify-center bg-[#00BCE4] border-2 border-[#00BCE4] rounded-full shadow-2xl hover:scale-110 transition-all"
  >
    <i className='font-bold text-white text-2xl'>GO</i>
  </a>
);

// 🔐 Protected Layout
const ProtectedLayout = () => {
  const { isAuthenticated } = useData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/orders') return 'Buyurtmalar';
    if (path === '/taqvim') return 'Taqvim';
    if (path === '/queue') return 'Navbat';
    if (path === '/result') return 'Natijalarim';
    if (path === '/courses') return 'Kurslar';
    if (path.startsWith('/klinika')) return 'Klinika';
    if (path.startsWith('/storage')) return 'Omborxona';
    if (path.startsWith('/hisobot')) return 'Hisobotlar';
    if (path.startsWith('/settings')) return 'Sozlamalar';
    if (path.startsWith('/sms')) return 'SMS';
    return 'DentaGo';
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
          currentPage={getCurrentPage()}
        />

        {/* BU YERDA FAQAT MAIN SCROLL BO'LADI */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full custom-scrollbar bg-slate-50">
          <Outlet />
        </main>
      </div>
      <TelegramButton />
    </div>
  );
};

const HomeRedirect = () => {
  const { isAuthenticated } = useData();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<><Login /><TelegramButton /></>} />
        <Route path="/register" element={<><Registration /><TelegramButton /></>} />

        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<DashboardContent />} />
          {/* <Route path="/taqvim" element={<CalendarContent />} /> */} {/* Taqvim olib tashlandi */}
          <Route path="/queue" element={<div className="p-8 text-[#00BCE4]">Navbat sahifasi</div>} />
          <Route path="/courses" element={<CoursesContent />} />
          <Route path="/hisobot/to'lovlar" element={<PaymentsContent />} />
          <Route path="/hisobot/lead-statistika" element={<LeadStatisticsContent />} />
          <Route path="/hisobot/kunilik-xarajatlar" element={<DailyExpensesContent />} />
          <Route path="/hisobot/kunilik-xarajatlar-kategoriyalari" element={<DailyExpenseCategoriesContent />} />
          <Route path="/hisobot/doktor-hisobotlari" element={<DoctorDailyReportsContent />} />
          <Route path="/hisobot/doktorlarga-pul-berish" element={<GiveMoneyToDoctorsContent />} />
          <Route path="/settings/general" element={<GeneralSettingsContent />} />
          <Route path="/settings/lead-categories" element={<LeadCategoriesContent />} />
          <Route path="/settings/diseases" element={<DiseasesContent />} />
          <Route path="/settings/advertising" element={<AdvertisingContent />} />
          <Route path="/settings/announcements" element={<AnnouncementsContent />} />
          <Route path="/sms/shablonlar" element={<SmsTemplatesContent />} />
          <Route path="/sms/sozlamalar" element={<SmsSettingsContent />} />
          <Route path="/manual" element={<ManualContent />} />
          <Route path="/profile" element={<ProfileContent />} />
          <Route path="/storage" element={<ProductsContent />} />
          <Route path="/storage/products" element={<ProductsContent />} />
          <Route path="/storage/documents" element={<DocumentsContent />} />
          <Route path="/storage/categories" element={<CategoriesContent />} />
          <Route path="/storage/brands" element={<BrandsContent />} />
          <Route path="/storage/units" element={<UnitsContent />} />
          <Route path="/storage/suppliers" element={<SuppliersContent />} />
          <Route path="/storage/usage" element={<ProductUsageContent />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/payments/app" element={<AppPaymentsContent />} />
          <Route path="/payments/tariffs" element={<TariffsContent />} />
          <Route path="/yetkazibberish" element={<Yetkazibberish />} />
          <Route path="/result" element={<Results />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/MahsulotQoshish" element={<MahsulotQoshish />} />
          <Route path="/klinika/xodimlar" element={<StaffContent />} />
          <Route path="/klinika/xizmatlar-card" element={<ServicesContent />} />
          <Route path="/klinika/xizmatlar-kategoriyalari" element={<ServiceCategoryContent />} />
          <Route path="/klinika/xizmatlar" element={<ServicesListViewContent />} />
          <Route path="/klinika/xizmatlar/:id/assign" element={<ServiceAssignmentContent />} />
          <Route path="/klinika/davolashlar" element={<TreatmentsContent />} />
          <Route path="/klinika/davolashni-rejalashtirish" element={<TreatmentSchedulingContent />} />
          <Route path="/klinika/bemorlar" element={<PatientsContent />} />
          <Route path="/klinika/malumotlar" element={<ClinicInfoContent />} />
          <Route path="/klinika/bemorlar/detail/:id" element={<PatientDetailView />} />
          <Route path="/klinika/qarzdor-davolashlar" element={<DebtTreatmentsContent />} />
        </Route>

        <Route path="*" element={<div className="text-center text-3xl mt-20 text-gray-500">404 — Sahifa topilmadi</div>} />
      </Routes>
    </DataProvider>
  );
};

export default App;
