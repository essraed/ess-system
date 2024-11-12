import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "hello": "Hello app!!",
          "click_me": "Click me",
          "logout": "Logout",
          "login": "Login",
          "register": "Register",
          "documents": "Documents",
          "authorities": "Authorities",
          "welcome": "Hello {{name}}",
        }
      },
      ar: {
        translation: {
          "hello": "مرحبا بالتطبيق!!",
          "click_me": "اضغط هنا",
          "logout": "تسجيل الخروج",
          "login": "تسجيل الدخول",
          "register": "تسجيل",
          "documents": "المستندات",
          "Documents": "المستندات",
          "letters": "المعاملات",
          "Letters": "المعاملات",
          "authorities": "الجهات",
          "welcome": "مرحبا {{name}}",
          "language": "لغة",
          "Page Size": "حجم الصفحة",
          "Reset": "مسح الفلاتر",
          "Search": "بحث",
          "Search...": "بحث...",
          "Add new document": "إضافة مستند",
          "Actions": "عمليات",
          "Update By": "عدل بواسطة",
          "Last Update": "اخر تعديل",
          "AI Result": "المحتوى",
          "Brief": "نبذة",
          "Apply Filter": "فلتر",
          "Filters": "الفلاتر",
          "From Date": "من تاريخ",
          "To Date": "الى تاريخ",
          "Users List": "قائمة المستخدمين",
          "Search an user": "البحث عن مستخدم",
          "Download PDF Report": "تقرير عدد الوثائق لكل مستخدم",
          "Name": "الاسم",
          "Cancel": "الغاء",
          "Create Authority": "اضافة جهة",
          "Create": "اضافة",
          "Add New Authority": "اضافة جهة جديدة",
          "Confirm Delete": "تأكيد الحذف",
          "Confirm": "تأكيد",
          "Are you sure you want to delete this": "هل متأكد أنك تريد حذف هذه",
          "Authority Name": "اسم الجهة",
          "authority": "الجهة",
          "Authorities": "الجهات",
          "document": "الرسالة",
          "?": "؟",
          "Email": "البريد الإلكتروني",
          "Address": "العنوان",
          "Phone": "الهاتف",
          "Emirates Id": "الهوية الإماراتية",
          "External Authority": "الجهة الخارجية",
          "Search an authority": "ابحث عن جهة",
          "Generate": "إنشاء",
          "Generate ChatGPT Result": "إنشاء نتيجة ChatGPT",
          "Back": "رجوع",
          "Save": "حفظ",
          "Result": "النتيجة",
          "All": "كل",
          "Home": "الرئيسية",
          "Main Menu": "القائمة الرئيسية",
          "Reports": "التقارير",
          "Delete": "حذف",
          "Edit": "تعديل",
          "View": "عرض",
        }
      }
    },
    lng: "en", // اللغة الافتراضية
    fallbackLng: "en", // اللغة الاحتياطية
    interpolation: {
      escapeValue: false, // لا حاجة للهروب في React
    },
  });

export default i18n;
