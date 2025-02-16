import React, { useState, useEffect } from 'react';
import { Gamepad2, Monitor, Smartphone, Moon, Sun, X } from 'lucide-react';
import SnakeGame from './games/SnakeGame.tsx';
import PuzzleGame from './games/PuzzleGame.tsx';

interface Game {
  id: number;
  title: string;
  description: string;
  image: string;
  component?: React.ComponentType;
  comingSoon?: boolean;
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [isMobile, setIsMobile] = useState(false);
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const games: Game[] = [
    {
      id: 1,
      title: "Snake Classic",
      description: "The classic snake game reimagined for modern devices",
      image: "https://images.unsplash.com/photo-1628277613967-6abca504d0ac?w=800&auto=format&fit=crop&q=60",
      component: SnakeGame
    },
    {
      id: 2,
      title: "Puzzle Master",
      description: "Challenge your mind with intricate puzzles",
      image: "https://images.unsplash.com/photo-1618923850107-d1a234d7a73a?w=800&auto=format&fit=crop&q=60",
      component: PuzzleGame
    },
    {
      id: 3,
      title: "Space Shooter",
      description: "Navigate through space and defeat alien ships",
      image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop&q=60",
      comingSoon: true
    },
    {
      id: 4,
      title: "Memory Match",
      description: "Test your memory with this classic card matching game",
      image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&auto=format&fit=crop&q=60",
      comingSoon: true
    },
    {
      id: 5,
      title: "Word Quest",
      description: "Expand your vocabulary in this word-finding adventure",
      image: "https://images.unsplash.com/photo-1632501641690-e43d4e3e7cdd?w=800&auto=format&fit=crop&q=60",
      comingSoon: true
    },
    {
      id: 6,
      title: "Math Challenge",
      description: "Sharpen your math skills with fun arithmetic puzzles",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60",
      comingSoon: true
    }
  ];

  const footerImages = [
    {
      url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
      alt: "Gaming Setup 1"
    },
    {
      url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60",
      alt: "Gaming Setup 2"
    },
    {
      url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=60",
      alt: "Gaming Setup 3"
    },
    {
      url: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&auto=format&fit=crop&q=60",
      alt: "Gaming Setup 4"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-800/90 shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Gamepad2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                <h1 className="text-xl md:text-2xl font-bold">GameHub</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {isMobile ? <Smartphone className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                  <span className="hidden md:inline">
                    {isMobile ? 'Mobile View' : 'Desktop View'}
                  </span>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=2000&auto=format&fit=crop&q=80"
              alt="Gaming Setup"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Welcome to GameHub
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-lg">
              Your destination for fun and engaging mini-games. Play instantly, no downloads required!
            </p>
          </div>
        </section>

        {/* Games Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <div
                key={game.id}
                className="relative group overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 bg-white dark:bg-gray-800"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="object-cover w-full h-48 group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {game.description}
                  </p>
                  <button
                    onClick={() => game.component && setActiveGame(game)}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors
                      ${game.comingSoon 
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                    disabled={game.comingSoon}
                  >
                    {game.comingSoon ? 'Coming Soon' : 'Play Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Game Modal */}
        {activeGame && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
            <div className="relative w-full max-w-4xl h-[80vh] bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setActiveGame(null)}
                  className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-800/75 text-white transition-colors"
                  aria-label="Close game"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="w-full h-full p-4">
                {activeGame.component && <activeGame.component />}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 py-8 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {footerImages.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg aspect-w-16 aspect-h-9 hover:opacity-75 transition-opacity">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                © 2024 GameHub. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;