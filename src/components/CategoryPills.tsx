import { useEffect, useRef, useState } from "react";
import Button from "./Button"
import { ChevronLeft, ChevronRight } from "lucide-react";

type CategoryPillsProps = {
    categories: string[],
    selectedCategory: string
    onSelect: (category: string) => void
}

const TRANSLATE_AMOUNT = 200

const CategoryPills = ({ categories, selectedCategory, onSelect }: CategoryPillsProps) => {
    const [translate, setTranslate] = useState(0);
    const [isLeftVisible, setIsLeftVisible] = useState(false);
    const [isRightVisible, setIsRightVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver(entries => {
            const container = entries[0]?.target;
            setIsLeftVisible(translate > 0);
            console.log(translate, container.scrollWidth, container.clientWidth)
            setIsRightVisible(translate + container.clientWidth < container.scrollWidth)
        })

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect()
        }
    }, [categories, translate])

    return (
        <div ref={containerRef} className={`overflow-x-hidden relative p-2`}>
            <div className={`flex whitespace-nowrap gap-3 transition-transform w-[max-content]`} style={{ transform: `translateX(-${translate}px)` }}>
                {categories.map((category) => <Button className="py-1 px-3 rounded-lg whitespace-nowrap" variant={selectedCategory == category ? 'dark' : 'default'} key={category}
                    onClick={() => onSelect(category)}
                >
                    {category}
                </Button>)}
            </div>
            {isLeftVisible && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-full bg-gradient-to-r from-white from-50% to-transparent">
                <Button variant='ghost' size='icon'
                    className="h-full aspect-square w-auto p-1.5"
                    onClick={() => {
                        setTranslate((translate: number) => {
                            const newtranslate = translate - TRANSLATE_AMOUNT
                            if (newtranslate <= 0) return 0
                            return newtranslate
                        })
                    }}
                >
                    <ChevronLeft />
                </Button>
            </div>}
            {isRightVisible && <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
                <Button variant='ghost' size='icon'
                    className="h-full aspect-square w-auto p-1.5"
                    onClick={() => {
                        setTranslate(translate => {
                            if (containerRef.current == null) return translate;
                            const edge = containerRef.current!.scrollWidth;
                            const width = containerRef.current!.clientWidth;
                            const newtranslate = translate + TRANSLATE_AMOUNT
                            if (newtranslate + width >= edge) {
                                return edge - width;
                            }
                            return newtranslate
                        })
                    }}
                >
                    <ChevronRight />
                </Button>
            </div>}
        </div>
    )
}

export default CategoryPills