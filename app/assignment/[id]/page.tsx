import { UseStoredUserInfo } from '@/app/_utils/get-user-info';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const loggedUserInfo = UseStoredUserInfo((state) => state.loggedUserInfo);
  return <>Assigment {params.id}</>;
}
