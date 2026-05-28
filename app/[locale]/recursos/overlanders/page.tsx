import { redirect } from 'next/navigation';

// "Overlanders" virou "GT Social" — overlander é a pessoa, a feature ganhou nome próprio.
// Qualquer acesso a /recursos/overlanders redireciona pra /recursos/gt-social.
export default function OverlandersPage() {
  redirect('/recursos/gt-social');
}
