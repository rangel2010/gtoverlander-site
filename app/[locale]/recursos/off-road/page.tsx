import { redirect } from 'next/navigation';

// Off Road foi descontinuado momentaneamente do site (não estava no app).
// Qualquer acesso a /recursos/off-road redireciona pra /recursos.
export default function OffRoadPage() {
  redirect('/recursos');
}
