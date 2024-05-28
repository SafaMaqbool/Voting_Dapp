import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

import React from 'react'

interface CustomTooltipProps{
    tooltiptext: string
    children: React.ReactNode
}

export default function CustomTooltip({tooltiptext, children}:CustomTooltipProps) {
  return (
    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>{children}</TooltipTrigger>
    <TooltipContent>
      <p>{tooltiptext}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
  
  )
}

