import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'

export function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] animate-in fade-in zoom-in-95 duration-500">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Login Portal BPS</CardTitle>
          <CardDescription>Silakan masuk menggunakan kredensial SSO BPS</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Email / NIP</label>
            <Input id="email" type="text" placeholder="nip@bps.go.id" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-foreground">Password</label>
              <a href="#" className="text-xs text-primary hover:underline">
                Lupa password?
              </a>
            </div>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 mt-4">
          <Button className="w-full" size="lg">
            Masuk ke Sistem
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Akses terbatas hanya untuk pegawai BPS Provinsi Kalimantan Utara.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
