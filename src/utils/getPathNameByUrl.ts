/* eslint-disable no-nested-ternary */

export default function getPathNameByUrl(url: string) {
  const splittedUrl = url.split('/');

  // regex
  const hasNumber = /\d/;
  const hasAlphabet = /[a-zA-Z0-9]/;

  return (
    // 4
    splittedUrl.length === 4
      ? // /storages/[path]/[id]
        splittedUrl[1] === 'storages' &&
        hasAlphabet.test(splittedUrl[2]) &&
        hasNumber.test(splittedUrl[3])
        ? '/storages/[path]/[id]'
        : url
      : // 3
      splittedUrl.length === 3
      ? // /storages/[path]
        splittedUrl[1] === 'storages' && hasAlphabet.test(splittedUrl[2])
        ? '/storages/[path]'
        : // /notices/[id]
        splittedUrl[1] === 'notices' && hasNumber.test(splittedUrl[2])
        ? '/notices/[id]'
        : url
      : url
  );
}
