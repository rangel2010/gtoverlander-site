import { redirect } from 'next/navigation';

// Off Road descontinuado do site. Redirect para /recursos.
// O middleware next-intl re-detecta o locale na URL destino.
export default function OffRoadPage() {
  redirect('/recursos');
}
