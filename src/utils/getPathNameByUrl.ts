/* eslint-disable no-nested-ternary */

// TODO 추후 로직 개선
export default function getPathNameByUrl(url: string) {
  const splittedUrl = url.split('/');

  // regex
  const hasNumber = /\d/;
  const hasAlphabet = /[a-zA-Z0-9]/;

  if (splittedUrl.length === 5 && splittedUrl[4] === 'edit') {
    return '/storages/[path]/[id]/edit';
  }

  if (splittedUrl.length === 4 && splittedUrl[3] === 'post') {
    return '/storages/[path]/post';
  }

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
