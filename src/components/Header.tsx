import React from 'react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { LogOutIcon } from 'lucide-react';
import Avvvatars from 'avvvatars-react';

interface HeaderProps {
  user: { name: string } | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const { logout } = useAuth();

  return (
    <section className='flex flex-row items-center gap-3 justify-between w-full'>
      <section className="w-fit h-12 pl-2 pr-6 py-3 bg-white rounded-3xl shadow justify-start items-center gap-3 inline-flex">
        <Avvvatars style='shape' value={user?.name ?? "John Doe"} size={32} />
        <div className="text-black text-sm font-medium mt-[-1px]">{user?.name ?? "John Doe"}</div>
      </section>
      <Button 
        onClick={logout} 
        variant="outline" 
        className="flex items-center space-x-2"
      >
        <LogOutIcon className="h-4 w-4" />
      </Button>
    </section>
  );
};

export default Header;