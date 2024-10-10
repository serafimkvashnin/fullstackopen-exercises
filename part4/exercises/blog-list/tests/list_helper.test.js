const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });

  test('when list has only one blog equals the likes of that', () => {
    blogs = [
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ];
    assert.strictEqual(listHelper.totalLikes(blogs), 5);
  });

  test('of a bigger list is calculated right', () => {
    blogs = [
      {
        _id: '67081798748ac5d5f3611fee',
        title: 'Google',
        author: 'Some famous guy',
        url: 'https://google.com',
        likes: 11,
        __v: 0
      },
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ];
    assert.strictEqual(listHelper.totalLikes(blogs), 16);
  });
});

describe('favorite blog', () => {
  test('of empty list is undefined', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([]), undefined);
  });

  test('when list has only one blog is the blog itself', () => {
    blogs = [
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ];
    correctAnswer = blogs[0];
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), correctAnswer);
  });

  test('with many blogs in a list', () => {
    blogs = [
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      },
      {
        _id: '67081798748ac5d5f3611fee',
        title: 'Google',
        author: 'Some famous guy',
        url: 'https://google.com',
        likes: 11,
        __v: 0
      }
    ];
    correctAnswer = blogs[1];
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), correctAnswer);
  });
});

describe('most likes', () => {
  test('of empty list is undefined', () => {
    assert.deepStrictEqual(listHelper.mostLikes([]), undefined);
  });

  test('when list has only one blog', () => {
    blogs = [
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ];
    correctAnswer = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    };
    assert.deepStrictEqual(listHelper.mostLikes(blogs), correctAnswer);
  });

  test('with many blogs in a list of one author is sum of likes', () => {
    blogs = [
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      },
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 15,
        __v: 0
      }
    ];
    correctAnswer = {
      author: 'Edsger W. Dijkstra',
      likes: 20
    };
    assert.deepStrictEqual(listHelper.mostLikes(blogs), correctAnswer);
  });

  test('with many blogs of different authors', () => {
    blogs = [
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      },
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 15,
        __v: 0
      },
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger H. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 6,
        __v: 0
      },
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger H. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 19,
        __v: 0
      }
    ];
    correctAnswer = {
      author: 'Edsger H. Dijkstra',
      likes: 25
    };
    assert.deepStrictEqual(listHelper.mostLikes(blogs), correctAnswer);
  });
});

describe('most blogs', () => {
  test('of empty list is undefined', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]), undefined);
  });

  test('when list has only one blog', () => {
    blogs = [
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ];
    correctAnswer = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    };
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), correctAnswer);
  });

  test('with many blogs of one author', () => {
    blogs = [
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      },
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 15,
        __v: 0
      }
    ];
    correctAnswer = {
      author: 'Edsger W. Dijkstra',
      blogs: 2
    };
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), correctAnswer);
  });

  test('with same amount of blogs of different authors', () => {
    blogs = [
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      },
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 15,
        __v: 0
      },
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger H. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 6,
        __v: 0
      },
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger H. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 19,
        __v: 0
      }
    ];
    correctAnswer = {
      author: 'Edsger W. Dijkstra',
      blogs: 2
    };
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), correctAnswer);
  });

  test('with many blogs of different authors', () => {
    blogs = [
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      },
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 15,
        __v: 0
      },
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger H. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 6,
        __v: 0
      },
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger H. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 19,
        __v: 0
      },
      {
        _id: '6708205a5564a21044550fc9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 7,
        __v: 0
      }
    ];
    correctAnswer = {
      author: 'Edsger W. Dijkstra',
      blogs: 3
    };
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), correctAnswer);
  });
});
