'use client'
import React, { useState } from 'react'
import ProfileTab from '../_component01/ProfileTab'
import InterestTab from '../_component01/InterestTab'
import SettingsTab from '../_component01/SettingsTab'

const tab=[
  {
    name:"Profile",
    component:<ProfileTab/>,
  },
  {
    name:"Interest",
    component:<InterestTab/>,
  },
  {
    name:"Settings",
    component:<SettingsTab/>,
  }
]
//show the button

const Tabs = () => {
const [currentTab, setCurrentTab]=useState<number>(0)

function handleTabSwitch(id:number){
    setCurrentTab(id)

}
  return (
    <div>
       <div className='flex mt-10 '>
        {tab.map((t, index)=>(
        <div key={index} className='m-2 p-6'>
          <button onClick={()=>handleTabSwitch(index)}>{t.name}</button>
        </div>
       ))}
       </div>
       <div>
        {tab[currentTab].component}
       </div>
    </div>
  )
}

export default Tabs