import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Blog, blogs as initialBlogs } from '@/lib/mock-data';

interface BlogState {
  blogs: Blog[];
  isLoading: boolean;
  error: string | null;
  
  // CRUD Actions
  fetchBlogs: () => Promise<void>;
  addBlog: (blog: Omit<Blog, 'id' | 'views' | 'publishedAt'>) => void;
  updateBlog: (id: string, updates: Partial<Blog>) => void;
  deleteBlog: (id: string) => void;
  getBlogById: (id: string) => Blog | undefined;
  getBlogBySlug: (slug: string) => Blog | undefined;
}

export const useBlogStore = create<BlogState>()(
  persist(
    (set, get) => ({
      blogs: initialBlogs,
      isLoading: false,
      error: null,

      fetchBlogs: async () => {
        set({ isLoading: true });
        try {
          // In a real app, this would be an API call
          // For now, we use the persisted state or initial mock data
          set({ isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch blogs', isLoading: false });
        }
      },

      addBlog: (blogData) => {
        const newBlog: Blog = {
          ...blogData,
          id: Math.random().toString(36).substr(2, 9),
          views: 0,
          publishedAt: new Date().toISOString().split('T')[0],
        };
        set((state) => ({ blogs: [newBlog, ...state.blogs] }));
      },

      updateBlog: (id, updates) => {
        set((state) => ({
          blogs: state.blogs.map((blog) =>
            blog.id === id ? { ...blog, ...updates } : blog
          ),
        }));
      },

      deleteBlog: (id) => {
        set((state) => ({
          blogs: state.blogs.filter((blog) => blog.id !== id),
        }));
      },

      getBlogById: (id) => {
        return get().blogs.find((blog) => blog.id === id);
      },

      getBlogBySlug: (slug) => {
        // Assuming title can be used as a simple slug for now
        return get().blogs.find((blog) => 
          blog.title.toLowerCase().replace(/ /g, '-') === slug
        );
      },
    }),
    {
      name: 'blog-storage',
    }
  )
);
