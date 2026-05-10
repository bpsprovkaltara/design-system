'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

const Accordion = AccordionPrimitive.Root

function AccordionItem({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn('border-b border-border-subtle', className)}
      {...props}
    />
  )
}
AccordionItem.displayName = 'AccordionItem'

function AccordionTrigger({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'flex flex-1 items-center justify-between py-4 text-body-sm font-semibold text-content-primary',
          'transition-all duration-fast hover:text-content-brand',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
          '[&[data-state=open]>svg]:rotate-180',
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className="h-4 w-4 shrink-0 text-content-secondary transition-transform duration-base ease-out"
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

function AccordionContent({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-body-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('pb-4 pt-0 text-content-secondary', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
