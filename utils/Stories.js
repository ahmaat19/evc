export const stories = [
  {
    _id: 1,
    title: 'My first JavaScript project',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga veniam debitis aspernatur temporibus iste expedita, totam, omnis enim autem consequatur deleniti nemo qui laborum eum magni quo doloremque, ipsam eveniet.',
    type: 'public',
    tag: ['javascript'],
    author: 'Ahmed',
    publishedDate: '2021-11-21 23:00',
  },
  {
    _id: 2,
    title: 'Learning Django and Flask',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga veniam debitis aspernatur temporibus iste expedita, totam, omnis enim autem consequatur deleniti nemo qui laborum eum magni quo doloremque, ipsam eveniet.',
    type: 'public',
    tag: ['django', 'python', 'flask'],
    author: 'Abdi',
    publishedDate: '2021-11-22 10:23',
  },
  {
    _id: 3,
    title: 'My best code editor',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga veniam debitis aspernatur temporibus iste expedita, totam, omnis enim autem consequatur deleniti nemo qui laborum eum magni quo doloremque, ipsam eveniet.',
    type: 'public',
    tag: ['vscode', 'code editor', 'text editor', 'notepad'],
    author: 'Ahmed',
    publishedDate: '2021-11-25 5:12',
  },
]

export const storyDetail = (id) =>
  stories.find((story) => story._id === Number(id))
