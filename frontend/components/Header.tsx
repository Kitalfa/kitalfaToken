import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import logo from '../public/alfaLogo.png';
const Header = () => {
  return (
    <div className='flex justify-between items-center p-5'>
      <Image src={logo} alt='Alfa Logo' className='h-14 w-auto' />
      <ConnectButton />
    </div>
  );
};

export default Header;
