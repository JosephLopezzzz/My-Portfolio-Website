import { useTheme } from 'next-themes';
import { Spin } from '@/components/ui/spin';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;

    const nextTheme = isDark ? 'light' : 'dark';

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.style.setProperty('--x', `${x}px`);
    document.documentElement.style.setProperty('--y', `${y}px`);
    document.documentElement.style.setProperty('--r', `${maxRadius}px`);

    document.startViewTransition(() => {
      setTheme(nextTheme);
    });
  };

  return (
    <Spin
      id="theme-toggle-button"
      className="relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-secondary/50 transition-colors text-[24px] text-foreground"
      onClick={toggleTheme}
      duration={500}
    />
  );
};

export default ThemeToggle;
