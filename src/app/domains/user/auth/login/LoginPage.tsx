import Image from 'next/image';
import LoginForm from './ui/LoginForm';

export default function LoginPage() {
  return (
    <div className="mt-25 mb-35 flex">
      <div className="relative hidden h-screen w-full lg:block">
        <Image
          alt=""
          src="/image/login.webp"
          className="object-cover"
          priority
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <LoginForm />
    </div>
  );
}
