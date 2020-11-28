export async function getAllPosts() {
  const context = require.context("../../_cities", false, /\.yml$/);
  const posts = [];
  for (const key of context.keys()) {
    const post = key.slice(2);
    const content = await import(`../../_cities/${post}`);
    posts.push({
      slug: post.replace(".yml", ""),
      content: content,
    });
  }
  return posts;
}

export async function getCityBySlug(slug) {
  const city = await import(`../../_cities/${slug}.yml`);
  return {
    slug: slug,
    title: city.title,
    authors: city.authors,
    it: city.it,
    en: city.en,
  };
}
