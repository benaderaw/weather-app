export const AJAX = async function (url) {
  try {
    const res = await fetch(url);

    if (!res.ok) return res;

    return res;
  } catch (err) {
    throw err;
  }
};
