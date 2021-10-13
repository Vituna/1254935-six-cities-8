type Reviews = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string,
  }
}[];

export const mockReviews: Reviews = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2019-05-08T14:13:56.569Z',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 5,
      isPro: false,
      name: 'Angelina',
    },
  },

  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Paris.',
    date: '2019-05-08T14:13:56.569Z',
    id: 2,
    rating: 10,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 6,
      isPro: false,
      name: 'Max',
    },
  },

  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Homburg.',
    date: '2019-05-08T14:13:56.569Z',
    id: 3,
    rating: 1,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 7,
      isPro: false,
      name: 'Angelina',
    },
  },
];

