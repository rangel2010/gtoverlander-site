import { redirect } from 'next/navigation';

// "Overlanders" virou "GT Social". Redirect para a nova URL.
// O middleware next-intl re-detecta o locale na URL destino.
export default function OverlandersPage() {
  redirect('/recursos/gt-social');
}
