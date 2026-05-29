import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

export function NavigationMenuPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Navigation Menu"
        description="Menu navigasi situs web yang responsif dan dapat diakses."
      />

      <ShowcaseSection title="Default Menu">
        <div className="flex flex-wrap gap-4 border rounded-lg p-8 bg-card items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Profil</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-hidden focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">BPS Kaltara</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Badan Pusat Statistik Provinsi Kalimantan Utara.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li className="text-sm p-3">Sejarah</li>
                    <li className="text-sm p-3">Visi Misi</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Layanan</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <li className="p-3 text-sm border rounded hover:bg-muted cursor-pointer">
                      Data Sensus
                    </li>
                    <li className="p-3 text-sm border rounded hover:bg-muted cursor-pointer">
                      Publikasi
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </ShowcaseSection>
    </div>
  )
}
