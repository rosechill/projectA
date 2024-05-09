import { User } from '@/assets/images'
import Image from 'next/image'

export default function Profile() {
  return (
    <div className="flex gap-4 justify-center items-center">
      <div>
        <h1 className="font-semibold text-white text-base">Username</h1>
        <h1 className="font-semibold text-white text-xs">User</h1>
      </div>
      <div className="rounded-full bg-[#F5F5F5] p-3">
        <Image src={User} alt="avatar" width={30} height={30} />
      </div>
    </div>
  )
}
