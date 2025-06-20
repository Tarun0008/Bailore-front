import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Story {
    title: string;
    author: string;
    date: string;
    body: string;
    imageUrl: string;
}

const StoryDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [story, setStory] = useState<Story | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);

    useEffect(() => {
        axios.get<{ story: Story }>(`/api/story/${id}`)
            .then(res => {
                setStory(res.data.story);
                setLoading(false);
            })
            .catch(() => {
                setNotFound(true);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center py-16 text-lg text-accent">Loading...</div>;
    if (notFound || !story) return (
        <div className="text-center py-16 text-lg text-accent">
            Story not found.<br />
            <Link to="/stories" className="btn-ghost mt-6 inline-block">Back to Stories</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-ivory section">
            <div className="container mx-auto px-6 max-w-2xl">
                <div className="card">
                    <img src={story.imageUrl} alt={story.title} className="w-full h-64 object-cover rounded-lg mb-6" />
                    <h1 className="font-playfair text-3xl md:text-4xl font-bold text-accent mb-2">{story.title}</h1>
                    <p className="text-sm text-gray-500 mb-4">By {story.author} • {story.date}</p>
                    <p className="font-lora text-lg text-gray-700 mb-8 whitespace-pre-line">{story.body}</p>
                    <Link to="/stories" className="btn-ghost">Back to Stories</Link>
                </div>
            </div>
        </div>
    );
};

export default StoryDetailPage;