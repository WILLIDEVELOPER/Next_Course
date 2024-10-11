import { Metadata } from "next"

export const metadata: Metadata = {
    title: "About",
    description: "About page",
}

export default function About() {
    return (
        <>
            <span className="text-7xl">About page</span>
        </>
    )
}