import { ChevronDown, ChevronUp, Clapperboard, Clock, Flame, Gamepad2, Home, Library, Lightbulb, ListVideo, History, Newspaper, PlaySquare, Podcast, Repeat, Shirt, ShoppingBag, Trophy, Music2, Film, Radio } from 'lucide-react'
import React, { Children, ElementType, ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button, { buttonStyles } from '../components/Button'
import { playlists, subscriptions } from '../data/sidebar'
import { useSidebarContext } from '../context/SidebarContext'
import { PageLogo } from './PageHeader'

type SmallSidebarItemProps = {
    url: string
    icon: React.ElementType
    title: string
}

function SmallSidebarItem({ url, title, icon: Icon }: SmallSidebarItemProps) {
    return <a href={url} className={twMerge(buttonStyles({ variant: "ghost" }), 'py-4 px-1 flex flex-col items-center rounded-lg')}>
        <Icon className="w-6 h-6" />
        <div className='text-sm'>{title}</div>
    </a>
}

const SideBar = () => {
    const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
    return (
        <>
            <aside className={`sticky lg:hidden top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${isLargeOpen ? 'lg:hidden' : 'lg:flex'}`}>
                <SmallSidebarItem icon={Home} title='Home' url='/' />
                <SmallSidebarItem icon={Repeat} title='Repeat' url='/repeat' />
                <SmallSidebarItem icon={Clapperboard} title='Subscriptions' url='/subscriptions' />
                <SmallSidebarItem icon={Library} title='Library' url='/library' />
            </aside>
            {isSmallOpen && <div onClick={close} className='lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50' />}
            <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 lg:flex ${isLargeOpen ? 'lg:flex' : "lg:hidden"} ${isSmallOpen ? 'flex z-[999] bg-white max-h-screen' : 'hidden'}`}>
                <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
                    <PageLogo />
                </div>
                <LargeSidebarSection>
                    <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
                    <LargeSidebarItem
                        IconOrImgUrl={Clapperboard}
                        title="Subscriptions"
                        url="/subscriptions"
                    />
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection visibleItemCount={5}>
                    <LargeSidebarItem
                        IconOrImgUrl={Library}
                        title="Library"
                        url="/library"
                    />
                    <LargeSidebarItem
                        IconOrImgUrl={History}
                        title="History"
                        url="/history"
                    />
                    <LargeSidebarItem
                        IconOrImgUrl={PlaySquare}
                        title="Your Videos"
                        url="/your-videos"
                    />
                    <LargeSidebarItem
                        IconOrImgUrl={Clock}
                        title="Watch Later"
                        url="/playlist?list=WL"
                    />
                    {playlists.map(playlist => (
                        <LargeSidebarItem
                            key={playlist.id}
                            IconOrImgUrl={ListVideo}
                            title={playlist.name}
                            url={`/playlist?list=${playlist.id}`}
                        />
                    ))}
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection title="Subscriptions">
                    {subscriptions.map(subscription => (
                        <LargeSidebarItem
                            key={subscription.id}
                            IconOrImgUrl={subscription.imgUrl}
                            title={subscription.channelName}
                            url={`/@${subscription.id}`}
                        />
                    ))}
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection title="Explore">
                    <LargeSidebarItem
                        IconOrImgUrl={Flame}
                        title="Trending"
                        url="/trending"
                    />
                    <LargeSidebarItem
                        IconOrImgUrl={ShoppingBag}
                        title="Shopping"
                        url="/shopping"
                    />
                    <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" />
                    <LargeSidebarItem
                        IconOrImgUrl={Film}
                        title="Movies & TV"
                        url="/movies-tv"
                    />
                    <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" />
                    <LargeSidebarItem
                        IconOrImgUrl={Gamepad2}
                        title="Gaming"
                        url="/gaming"
                    />
                    <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
                    <LargeSidebarItem
                        IconOrImgUrl={Trophy}
                        title="Sports"
                        url="/sports"
                    />
                    <LargeSidebarItem
                        IconOrImgUrl={Lightbulb}
                        title="Learning"
                        url="/learning"
                    />
                    <LargeSidebarItem
                        IconOrImgUrl={Shirt}
                        title="Fashion & Beauty"
                        url="/fashion-beauty"
                    />
                    <LargeSidebarItem
                        IconOrImgUrl={Podcast}
                        title="Podcasts"
                        url="/podcasts"
                    />
                </LargeSidebarSection>
            </aside>
        </>
    )
}

export default SideBar

type LargeSidebarSectionProps = {
    children: ReactNode
    title?: string
    visibleItemCount?: number
}

function LargeSidebarSection({
    children,
    title,
    visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const childrenArray = Children.toArray(children).flat()
    const showExpandButton = childrenArray.length > visibleItemCount
    const visibleChildren = isExpanded
        ? childrenArray
        : childrenArray.slice(0, visibleItemCount)
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown

    return (
        <div>
            {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
            {visibleChildren}
            {showExpandButton && (
                <Button
                    onClick={() => setIsExpanded(e => !e)}
                    variant="ghost"
                    className="w-full flex items-center rounded-lg gap-4 p-3"
                >
                    <ButtonIcon className="w-6 h-6" />
                    <div>{isExpanded ? "Show Less" : "Show More"}</div>
                </Button>
            )}
        </div>
    )
}

type LargeSidebarItemProps = {
    IconOrImgUrl: ElementType | string
    title: string
    url: string
    isActive?: boolean
}

function LargeSidebarItem({
    IconOrImgUrl,
    title,
    url,
    isActive = false,
}: LargeSidebarItemProps) {
    return (
        <a
            href={url}
            className={twMerge(
                buttonStyles({ variant: "ghost" }),
                `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
                }`
            )}
        >
            {typeof IconOrImgUrl === "string" ? (
                <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
            ) : (
                <IconOrImgUrl className="w-6 h-6" />
            )}
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                {title}
            </div>
        </a>
    )
}