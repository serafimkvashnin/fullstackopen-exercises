const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length ? blogs.reduce((sum, item) => sum + item.likes, 0) : 0;
};

const favoriteBlog = (blogs) => {
  const findMostLiked = (prev, current) =>
    prev && prev > current.likes ? prev : current;

  return blogs.reduce(findMostLiked, blogs[0]);
};

const mostBlogs = (blogs) => {
  result = new Map();
  blogs.forEach((blog) => {
    result.set(blog.author, (result.get(blog.author) || 0) + 1);
  });

  let most = { author: undefined, blogs: 0 };
  result.forEach((blogs, author) => {
    if (blogs > most.blogs) {
      most = { author, blogs };
    }
  });

  return most.author ? most : undefined;
};

const mostLikes = (blogs) => {
  result = new Map();
  blogs.forEach((blog) => {
    result.set(blog.author, (result.get(blog.author) || 0) + blog.likes);
  });

  let most = { author: undefined, likes: 0 };
  result.forEach((likes, author) => {
    if (likes > most.likes) {
      most = { author, likes };
    }
  });

  return most.author ? most : undefined;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
