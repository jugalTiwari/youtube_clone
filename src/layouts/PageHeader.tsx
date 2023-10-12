import Logo from '../assets/Logo.png'
import { Menu, Upload, User, Mic, Bell, Search, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import { useState } from 'react';
import { useSidebarContext } from '../context/SidebarContext';

const PageHeader = () => {
    const [showSearch, setShowSearch] = useState(false);
    return (
        <div className='flex gap-10 lg:gap-20 justify-between pt-2 b-6 mx-4'>
            <PageLogo showSearch={showSearch} />
            <form className={`md:flex gap-4 flex-grow justify-center items-center ${showSearch ? 'flex' : 'hidden'}`}>
                <Button variant='ghost' size='icon' className={showSearch ? 'flex' : 'hidden'} onClick={() => setShowSearch(false)}>
                    <ArrowLeft />
                </Button>
                <div className='flex flex-grow max-w-[600px]'>
                    <input type='search' placeholder='Search' className='rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none' />
                    <Button className='py-2 px-4 rounded-r-full border border-secondary-border border-l-0'>
                        <Search />
                    </Button>
                </div>
                <Button size='icon' type='button' className='flex-shrink-0'>
                    <Mic />
                </Button>
            </form>
            <div className={`flex flex-shrink-0 md:gap-2 ${showSearch ? 'hidden' : 'flex'}`}>
                <Button onClick={() => setShowSearch(true)} size='icon' variant='ghost' type='button' className='md:hidden flex-shrink-0'>
                    <Search />
                </Button>
                <Button size='icon' variant='ghost' type='button' className='md:hidden  flex-shrink-0'>
                    <Mic />
                </Button>
                <Button variant='ghost' size='icon'>
                    <Upload />
                </Button>
                <Button variant='ghost' size='icon'>
                    <Bell />
                </Button>
                <Button variant='ghost' size='icon'>
                    <User />
                </Button>
            </div>
        </div>
    )
}

export function PageLogo({ showSearch = false }: { showSearch?: boolean }) {
    const { toggle } = useSidebarContext()
    return <div className={`gap-4 items-center flex-shrink-0 ${showSearch ? 'hidden' : 'flex'}`}>
        <Button onClick={toggle} variant='ghost' size='icon' className=''>
            <Menu />
        </Button>
        <a href='/'>
            <img src={Logo} className='h-6' />
        </a>
    </div>
}

export default PageHeader