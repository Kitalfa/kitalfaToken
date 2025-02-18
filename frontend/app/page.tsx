import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col bg-gray-900'>
      <Header />
      <div className='p-5 grow flex flex-col items-center justify-center'>
        Ok
      </div>
      <Footer />
    </div>
  );
}
