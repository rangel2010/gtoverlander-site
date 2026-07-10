import { redirect } from '@/i18n/navigation';

// Off Road foi descontinuado momentaneamente do site (não estava no app).
// Qualquer acesso a /recursos/off-road redireciona pra /recursos.
// Usa redirect locale-aware do next-intl — preserva /en/ e /es/ corretamente.
export default function OffRoadPage() {
  redirect('/recursos');
}
