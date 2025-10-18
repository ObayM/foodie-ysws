import React from 'react'
import { TimerIcon, Verified, Hammer } from 'lucide-react';
const items = [
    {
        title:"Honest Hackatime",
        description:"Track your coding using hackatime, but no fabricated heartbeats or any type of hour inflation, don't worry we will know :))",
        icon: <TimerIcon/>
    },
    {
        title:"A finished project",
        description:"Your project must have a readme, demo link and open source",
        icon: <Verified/>
    },
    {
        title:"No AI Slop",
        description:"AI use is forbidden and we won't accept any vibecoded projects, you can still use it as an assistant but just less than 30% of your project",
        icon: <Hammer/>
    }
]

export default function RulesSection(){
    return (
        <div className='min-h-screen'>

        </div>
    );
}