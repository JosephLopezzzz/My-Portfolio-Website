import { useTheme } from 'next-themes';
import { flushSync } from 'react-dom';
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
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
      flushSync(() => {
        setTheme(nextTheme);
      });
    });
  };

  return (
    <Spin
      id="theme-toggle-button"
      className="relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-secondary/50 transition-colors [&>svg]:w-6 [&>svg]:h-6 text-foreground"
      onClick={toggleTheme}
      duration={500}
    />
  );
};

export default ThemeToggle;
