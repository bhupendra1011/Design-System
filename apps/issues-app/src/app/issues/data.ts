export interface Card {
  id: string;
  title: string;
  content: string;
  bottomIcon?: string;
  rightIcon?: string;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
  icon?: React.ReactNode;
}

export interface BoardData {
  columns: Column[];
}

export const boardData: BoardData = {
  columns: [
    {
      id: 'backlog',
      title: 'Backlog',
      cards: [
        {
          id: 'card-1',
          title: 'User authentication system',
          content: 'Implement JWT-based authentication',
        },
        {
          id: 'card-2',
          title: 'Database migration',
          content: 'Migrate legacy database to new schema',
        },
        {
          id: 'card-3',
          title: 'Fig 4',
          content: 'Update tokens and components in Figma 2.0',
        }
      ]
    },
    {
      id: 'todo',
      title: 'Todo',
      cards: [
        {
          id: 'card-4',
          title: 'Fig 5',
          content: 'Write comprehensive API documentation for new endpoints',
        },
        {
          id: 'card-5',
          title: 'Unit test coverage',
          content: 'Increase test coverage to 90%',
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      cards: [
        {
          id: 'card-6',
          title: 'Performance optimization',
          content: 'Optimize React component rendering and reduce bundle size',
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      cards: [
        {
          id: 'card-7',
          title: 'Mobile responsive design',
          content: 'Ensure all components work properly on mobile devices',
        },
        {
          id: 'card-8',
          title: 'Fig 7',
          content: 'Add automated testing to CI/CD pipeline',
        },
        {
          id: 'card-9',
          title: 'Design system updates',
          content: 'Update component library with new design tokens',
        }
      ]
    },
    {
      id: 'canceled',
      title: 'Canceled',
      cards: [
        {
          id: 'card-10',
          title: 'Legacy feature migration',
          content: 'Migrate old features - decided to rebuild instead',
        }
      ]
    }
  ]
};