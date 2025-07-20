import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="animate-pulse text-[10rem] font-bold flex space-x-4">
        {['4', '0', '4'].map((num, i) => (
          <span key={i} className="relative">
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-full blur-2xl"></span>
            <span className="relative">{num}</span>
          </span>
        ))}
      </div>
      <p className="mt-4 text-lg">
        This page doesn’t exist.{' '}
        <Link href="/" className="text-pink-500 hover:underline">
          Go back home.
        </Link>
      </p>
    </div>
  );
}
