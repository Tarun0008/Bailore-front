import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import StoriesPage from './pages/StoriesPage';
import StoryDetailPage from './pages/StoryDetailPage';
import SubmitPage from './pages/SubmitPage';
import Layout from './components/Layout';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

interface Story {
  id: number;
  title: string;
  body: string;
  author: string;
  date: string;
  imageUrl: string;
  email?: string;
  mediaUrl?: string;
  mediaType?: string;
}

const placeholderImages = [
  'https://i.pinimg.com/736x/19/11/30/191130ad610d879962276fadcf9be3db.jpg',
  'https://i.pinimg.com/736x/ef/4a/83/ef4a83466f6ee70ee7ff6f7d1b3432fa.jpg',
  'https://i.pinimg.com/736x/0a/f5/fc/0af5fc07a04512c018d5e4e1cb7d1cbb.jpg',
  'https://i.pinimg.com/736x/0b/40/7f/0b407f324f3948b4b5878e834d4839a2.jpg'
];

function getRandomPlaceholderImage(): string {
  return placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
}

function getStories(): Story[] {
  const storedStories = localStorage.getItem('stories');
  let stories: Story[] = storedStories ? JSON.parse(storedStories) : [];

  if (stories.length === 0) {
    stories = [
      {
        id: 1,
        title: 'The Night of the Fire Dance',
        body: 'One evening in Uluwatu...',
        author: 'Aarav Mehta',
        date: '30/05/2023',
        imageUrl: placeholderImages[0],
      },
      {
        id: 2,
        title: 'Cooking with Grandma Made',
        body: 'One of my favorite memories...',
        author: 'Pooja Sharma',
        date: '30/05/2023',
        imageUrl: placeholderImages[1],
      },
      {
        id: 3,
        title: 'The Sound of Gamelan at Sunset',
        body: 'On my second day in Bali...',
        author: 'Ishaan Verma',
        date: '30/05/2023',
        imageUrl: placeholderImages[2],
      }
    ];
    saveStories(stories);
  } else {
    stories = stories.map(story => ({
      ...story,
      imageUrl: story.imageUrl || getRandomPlaceholderImage(),
      mediaUrl: undefined,
      mediaType: undefined,
    }));
  }

  return stories.map(story => ({
    ...story,
    mediaUrl: undefined,
    mediaType: undefined,
  }));
}

function saveStories(stories: Story[]): void {
  localStorage.setItem('stories', JSON.stringify(stories));
}

// ✅ DEV ONLY: Mock some endpoints but allow /api/create-checkout-session to hit your backend
// if (import.meta.env.MODE === 'development') {
const mock = new MockAdapter(axios, { delayResponse: 300 });

mock.onPost('/api/submit-lore').reply(config => {
    const formData = new URLSearchParams(config.data);
    const stories = getStories();
    const imageUrl = getRandomPlaceholderImage();

    const newStory: Story = {
      id: Date.now(),
      title: formData.get('title') || '',
      body: formData.get('body') || '',
      author: formData.get('name') || '',
      email: formData.get('email') || undefined,
      date: new Date().toLocaleDateString(),
      imageUrl: imageUrl,
    };

    stories.unshift(newStory);
    saveStories(stories);

    return [200, { success: true, story: newStory }];
  });

  mock.onGet('/api/stories').reply(() => {
    return [200, { stories: getStories() }];
  });

  mock.onGet(/\/api\/story\/(\d+)/).reply(config => {
    const id = config.url?.split('/').pop();
    const stories = getStories();
    const story = stories.find(s => String(s.id) === id);
    if (story) return [200, { story }];
    return [404, { error: 'Story not found' }];
  });

  mock.onGet(/\/api\/raffle-status/).reply(200, {
    tickets: 3
  });

  mock.onPost('/api/raffle-entry').reply(200, {
    success: true,
    tickets: 4,
    message: 'Successfully entered raffle!'
  });

  // ✅ ✅ ✅ Pass-through for your real backend Stripe endpoint!
  mock.onAny('/api/create-checkout-session').passThrough();


function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={5000} />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="stories" element={<StoriesPage />} />
          <Route path="story/:id" element={<StoryDetailPage />} />
          <Route path="submit" element={<SubmitPage />} />
          <Route
            path="*"
            element={
              <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
                <p className="mb-8">The page you're looking for doesn't exist.</p>
                <a
                  href="/"
                  className="bg-[#E91E63] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-all duration-300"
                >
                  Go Home
                </a>
              </div>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
