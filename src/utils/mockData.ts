export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  author: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'system';
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: '2023-01-15T09:24:35Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    createdAt: '2023-02-22T14:18:42Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    createdAt: '2023-03-10T16:45:12Z',
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice@example.com',
    avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    createdAt: '2023-04-05T08:32:19Z',
  },
  {
    id: '5',
    name: 'Tom Brown',
    email: 'tom@example.com',
    avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    createdAt: '2023-05-18T11:52:08Z',
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React Native',
    body: 'Learn how to build mobile applications using React Native. This comprehensive guide covers everything from setup to deployment.',
    imageUrl: 'https://picsum.photos/id/1/600/400',
    author: {
      id: '1',
      name: 'John Doe',
      avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    createdAt: '2023-06-12T10:24:35Z',
    likes: 124,
    comments: 18,
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    body: 'Explore advanced TypeScript patterns to improve your code quality and developer experience. Topics include generics, utility types, and more.',
    imageUrl: 'https://picsum.photos/id/2/600/400',
    author: {
      id: '2',
      name: 'Jane Smith',
      avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    createdAt: '2023-06-15T14:35:22Z',
    likes: 89,
    comments: 12,
  },
  {
    id: '3',
    title: 'Optimizing React Native Performance',
    body: 'Performance is crucial for mobile apps. Learn techniques to optimize your React Native application for better user experience.',
    imageUrl: 'https://picsum.photos/id/3/600/400',
    author: {
      id: '3',
      name: 'Bob Johnson',
      avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    createdAt: '2023-06-18T09:15:47Z',
    likes: 213,
    comments: 31,
  },
  {
    id: '4',
    title: 'Building Custom UI Components',
    body: 'Create reusable, accessible, and beautiful UI components for your React Native application. This tutorial covers best practices and implementation details.',
    imageUrl: 'https://picsum.photos/id/4/600/400',
    author: {
      id: '4',
      name: 'Alice Williams',
      avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    createdAt: '2023-06-21T16:48:12Z',
    likes: 156,
    comments: 24,
  },
  {
    id: '5',
    title: 'State Management in React Native',
    body: 'Compare different state management solutions for React Native: Context API, Redux, MobX, and more. Learn when to use each approach.',
    imageUrl: 'https://picsum.photos/id/5/600/400',
    author: {
      id: '5',
      name: 'Tom Brown',
      avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    createdAt: '2023-06-25T11:32:09Z',
    likes: 178,
    comments: 27,
  },
  {
    id: '6',
    title: 'Implementing Dark Mode in React Native',
    body: 'Learn how to implement a dark mode theme in your React Native application. This tutorial covers theme switching, persisting user preferences, and styling considerations.',
    imageUrl: 'https://picsum.photos/id/6/600/400',
    author: {
      id: '1',
      name: 'John Doe',
      avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    createdAt: '2023-06-28T13:19:45Z',
    likes: 95,
    comments: 14,
  },
  {
    id: '7',
    title: 'React Native Navigation Patterns',
    body: 'Explore different navigation patterns for React Native apps. Stack, tab, drawer navigation and more with React Navigation library.',
    imageUrl: 'https://picsum.photos/id/7/600/400',
    author: {
      id: '2',
      name: 'Jane Smith',
      avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    createdAt: '2023-07-01T08:42:16Z',
    likes: 112,
    comments: 19,
  },
  {
    id: '8',
    title: 'Integrating APIs in React Native',
    body: 'Learn how to fetch data from REST and GraphQL APIs in React Native. This tutorial covers networking, data fetching libraries, and error handling.',
    imageUrl: 'https://picsum.photos/id/8/600/400',
    author: {
      id: '3',
      name: 'Bob Johnson',
      avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    createdAt: '2023-07-05T15:28:31Z',
    likes: 143,
    comments: 22,
  },
  {
    id: '9',
    title: 'React Native Testing Strategies',
    body: 'Implement effective testing strategies for your React Native app. Unit, integration, and end-to-end testing with Jest, React Native Testing Library, and Detox.',
    imageUrl: 'https://picsum.photos/id/9/600/400',
    author: {
      id: '4',
      name: 'Alice Williams',
      avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    createdAt: '2023-07-09T10:15:52Z',
    likes: 87,
    comments: 13,
  },
  {
    id: '10',
    title: 'Animations in React Native',
    body: 'Create beautiful animations in React Native using the Animated API, React Native Reanimated, and other libraries. Learn principles of fluid animation for mobile.',
    imageUrl: 'https://picsum.photos/id/10/600/400',
    author: {
      id: '5',
      name: 'Tom Brown',
      avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    createdAt: '2023-07-12T09:52:14Z',
    likes: 201,
    comments: 29,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    message: 'John Doe liked your post "Getting Started with React Native"',
    read: false,
    createdAt: '2023-07-12T14:25:12Z',
    actionUrl: '/posts/1',
  },
  {
    id: '2',
    type: 'comment',
    message: 'Jane Smith commented on your post "Advanced TypeScript Patterns"',
    read: true,
    createdAt: '2023-07-11T18:42:35Z',
    actionUrl: '/posts/2',
  },
  {
    id: '3',
    type: 'follow',
    message: 'Bob Johnson started following you',
    read: false,
    createdAt: '2023-07-10T09:18:27Z',
    actionUrl: '/users/3',
  },
  {
    id: '4',
    type: 'mention',
    message: 'Alice Williams mentioned you in a comment',
    read: false,
    createdAt: '2023-07-09T16:55:41Z',
    actionUrl: '/posts/5',
  },
  {
    id: '5',
    type: 'system',
    message: 'Your account was successfully verified',
    read: true,
    createdAt: '2023-07-08T11:32:19Z',
  },
  {
    id: '6',
    type: 'like',
    message: 'Tom Brown and 5 others liked your post "React Native Testing Strategies"',
    read: false,
    createdAt: '2023-07-07T14:18:56Z',
    actionUrl: '/posts/9',
  },
  {
    id: '7',
    type: 'comment',
    message: 'John Doe replied to your comment on "Animations in React Native"',
    read: true,
    createdAt: '2023-07-06T08:45:22Z',
    actionUrl: '/posts/10',
  },
  {
    id: '8',
    type: 'system',
    message: 'A new version of the app is available. Update now!',
    read: false,
    createdAt: '2023-07-05T16:28:13Z',
  },
  {
    id: '9',
    type: 'follow',
    message: 'Jane Smith and 3 others started following you',
    read: false,
    createdAt: '2023-07-04T13:52:47Z',
    actionUrl: '/users/2',
  },
  {
    id: '10',
    type: 'mention',
    message: 'Bob Johnson mentioned you in his post "State Management in React Native"',
    read: true,
    createdAt: '2023-07-03T10:15:31Z',
    actionUrl: '/posts/5',
  },
];
