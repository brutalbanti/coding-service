import { SectionContent } from "../Section/SectionHome/SectionContent"
import { SectionHeader } from "../Section/SectionHome/SectionHeader"
import { SectionPlanner } from "../Section/SectionHome/SectionPlanner"

export const MainHome = () => {
    return (
        <main className="page">
            <SectionHeader/>
            <SectionContent/>
            <SectionPlanner/>
        </main>
    )
}