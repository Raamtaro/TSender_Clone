// components/Header.tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FaGithub } from 'react-icons/fa'
import Image from 'next/image' // included per your request

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
      
      {/* GitHub Link */}
      <a
        href="https://github.com/raamtaro/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center hover:text-gray-600"
      >
        <FaGithub className="mr-2" size={24} />
        <span className="font-medium">GitHub</span>
      </a>

      {/* Title */}
      <h1 className="text-2xl font-semibold">TSender</h1>

      {/* Connect Wallet */}
      <ConnectButton />
    </header>
  )
}
