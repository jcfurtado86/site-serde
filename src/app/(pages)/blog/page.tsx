import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb";
import Posts from './components/Post/Post'

export default function Blog() {
    return (
        <main className="pt-20 bg-gray-50">
                <Breadcrumb 
                items={[
            { label: 'Blog', href: '/blog' },
            ]} 
                />
                <Posts />
        </main>
    )
}