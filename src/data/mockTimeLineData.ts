export interface TimelineItem {
  id: number;
  start: number;
  end: number;
  title: string;
  description: { name: string; year: number }[];
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    start: 1940,
    end: 1950,
    title: 'Фильмы',
    description: [
      { name: 'Данный текст придуман мной для генерации контента и проверки верстки', year: 1941 },
      { name: 'Фильм 2', year: 1942 },
      { name: 'Данный текст придуман мной для генерации контента и проверки верстки', year: 1943 },
      { name: 'Фильм 4', year: 1944 },
    ],
  },
  {
    id: 2,
    start: 1950,
    end: 1960,
    title: 'Литература',
    description: [
      { name: 'Книга 1', year: 1951 },
      {
        name: 'Данный текст придуман мной для генерации контента и проверки верстки',
        year: 1952,
      },
      { name: 'Книга 3', year: 1953 },
      { name: 'Книга 4', year: 1954 },
      { name: 'данный текст придуман мной для генерации контента и проверки верстки', year: 1955 },
    ],
  },
  {
    id: 3,
    start: 1960,
    end: 1970,
    title: 'Игры',
    description: [
      { name: 'Игра 1', year: 1961 },
      { name: 'Игра 2', year: 1962 },
    ],
  },
  {
    id: 4,
    start: 1970,
    end: 1980,
    title: 'Музыка',
    description: [
      { name: 'Альбом 1', year: 1971 },
      { name: 'Альбом 2', year: 1972 },
      { name: 'Альбом 3', year: 1973 },
    ],
  },
  {
    id: 5,
    start: 1980,
    end: 1990,
    title: 'Архитектура',
    description: [
      { name: 'Здание 1', year: 1981 },
      { name: 'Здание 2', year: 1982 },
      { name: 'Здание 3', year: 1983 },
      { name: 'Здание 4', year: 1984 },
    ],
  },
  {
    id: 6,
    start: 1990,
    end: 2000,
    title: 'Технологии',
    description: [
      { name: 'Технология 1', year: 1991 },
      { name: 'Технология 2', year: 1992 },
      { name: 'Технология 3', year: 1993 },
      { name: 'Технология 4', year: 1994 },
      { name: 'Технология 5', year: 1995 },
      { name: 'Технология 6', year: 1996 },
    ],
  },
];
