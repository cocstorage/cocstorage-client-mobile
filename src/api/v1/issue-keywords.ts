import { IssueKeywordRank } from '@dto/issue-keywords';
import Axios from '@library/axios';

const BASE_PATH = '/issue-keywords';

export async function fetchIssueKeywordRank() {
  const { data } = await Axios.get<IssueKeywordRank>(`${BASE_PATH}/rank`);

  return data;
}
